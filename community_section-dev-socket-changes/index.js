const path = require('path')
const http = require('http')
const express = require('express')
const fileUpload = require('express-fileupload')
const socketio = require("socket.io")
const socketioJwt = require("socketio-jwt")
const cors = require("cors");
const erpController = require("./controllers/erp")
const {
    writeFile
} = require("fs")

const {
    generateMessage
} = require('./utils/messages')
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
} = require('./utils/users')
const {
    postMessage, getMessageByIndividual
} = require("./controllers/erp.js")

const app = express()
const server = http.createServer(app)
app.use(cors())



const port = process.env.PORT || 3005
const publicDirectoryPath = path.join(__dirname, '../public')


app.use(express.urlencoded({
    extended: true
}));
app.use(fileUpload({
    createParentPath: true
}))
app.use(express.static(publicDirectoryPath))

const io = socketio(server,

    {
        handlePreflightRequest: (req, res) => {
            const headers = {
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Origin": "http://localhost:3000", //or the specific origin you want to give access to,
                "Access-Control-Allow-Credentials": true,
                
            };
            res.writeHead(200, headers);
            res.end();
        }
    })
// io.use(socketioJwt.authorize({
//     secret: 'cs_ccc',
//     handshake: true
//   }));

io.use((socket, next) => {
    // const username = socket.handshake.auth.username;
    const student_name = socket.handshake.headers["student_name"];
    const student_id = socket.handshake.headers["student_id"];

    if (!student_name && !student_id) {
        return next(new Error("invalid student_name"));
    }

    socket.student_name = student_name;
    socket.student_id = student_id;

    next();
});

var users = [];

io.on('connection', (socket) => {
    const auth = socket.handshake.headers['authorization'];
    socket.auth = auth

    
    for (let [id, socket] of io.of("/").sockets) {
        const userIndex = users.findIndex(el => el.student_id === socket.student_id);
        if (userIndex !== -1 ) {
            users[userIndex]["socket_id"] = id
        } else {
            users.push({
                socket_id: id,
                student_id: socket.student_id,
                student_name: socket.student_name,
            });
        }
    }

    console.log(`New WebSocket connection with ${auth}`)

    socket.on('send_message', (payload) => {
        payload.from = socket.student_id

        const user = users.find(el => el.student_id === payload.to);
        postMessage(socket, auth, {chat: payload.chat}, user)

        // if(user !== undefined) {
        //     socket.to(user.socket_id).emit("recieve_message", payload);
        // }
    })

    socket.on('get_message', (payload) => {
        payload.from = socket.student_id

        const user = users.find(el => el.student_id === payload.uuid);
        getMessageByIndividual(socket, auth, payload.uuid)

        // if(user !== undefined) {
        //     socket.to(user.socket_id).emit("recieve_message", payload);
        // }
    })

    socket.on('get_users', () => {
        socket.emit('users', users)
    })

    socket.on("broadcast", (playload) => {
        io.emit("broadcast_recieve", playload)
    })

    socket.on("get_users_by_program", () => {
        var userByProgram = erpController.getStudentByProgram(socket.auth)
        // socket.emit("student_by_program_recieve", "ASD")
        console.log(userByProgram)
        socket.emit("student_by_program_recieve", userByProgram)
    })

    socket.on("get_users_by_module", () => {
        erpController.getStudentByModule(socket, socket.auth, users)

        // socket.emit("student_by_module_recieve", "ASD")
        //  socket.emit("student_by_module_recieve", userByProgram)
    })

    socket.on("file_upload", (file, callback) => {
        var base64Data = file.replace(/^data:image\/jpg;base64,/, "");
        writeFile("uploads/out.jpg", base64Data, 'base64', function (err) {
            console.log(err);
        });

    })

    socket.on('disconnect', () => {
        console.log(socket.id);
        console.log(users);

        const userIndex = users.findIndex(el => el.socket_id === socket.id);
        if (userIndex !== -1) {
            users.splice(userIndex, 1)[0]
        }
    })
})

// io.sockets
//     .on('connection', socketioJwt.authorize({
//         secret: "cs_ccc",
//         timeout: 15000
//     }))
//     .on('authenticated', (socket) => {
//        io.to(user.room).emit({token: socket.decoded_token });

//         console.log('New WebSocket connection')

//         socket.on('join', (options, callback) => {
//             const {
//                 error,
//                 user
//             } = addUser({
//                 id: socket.id,
//                 ...options
//             })

//             if (error) {
//                 return callback(error)
//             }

//             socket.join(user.room)

//             io.to(user.room).emit('roomData', {
//                 room: user.room,
//                 users: getUsersInRoom(user.room)
//             })

//             callback()
//         })

//         socket.on('sendMessage', (req, callback) => {
//             const user = getUser(socket.id)

//             try {
//                 postMessage(req.auth, req.body)

//                 io.to(user.room).emit('message', generateMessage(user.username, req.body.message))
//                 callback()
//             } catch (error) {
//                 console.log(error);
//             }
//         })

//         socket.on('disconnect', () => {
//             const user = removeUser(socket.id)

//             if (user) {
//                 io.to(user.room).emit('roomData', {
//                     room: user.room,
//                     users: getUsersInRoom(user.room)
//                 })
//             }
//         })
//     })

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})