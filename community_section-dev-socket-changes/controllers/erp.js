const superagent = require("superagent");
const validatior = require("@withvoid/make-validation");

const postMessage = (socket, auth, payload, user) => {
    if(auth === undefined) throw "No Auth";

    // const validation = validatior(types => ({
    //     payload: payload,
    //     checks: {
    //         from_member: {type: types.string},
    //         from_email: {type: types.string},
    //         from_name: {type: types.string},
    //         to_member: {type: types.string},
    //         to_email: {type: types.string},
    //         to_name: {type: types.string},
    //         socket_id: {type: types.string},
    //         message: {type: types.string},
    //         uuid: {type: types.string}
    //     }
    // }))

    // if (!validation.success) throw validation.errors;

    superagent
        .post("https://devcms2.limkokwing.net/api/method/marketing.api.create_chat")
        .send(payload)
        .set('authorization', `Bearer ${auth}`)
        .end((err, res) => {
            if (err !== undefined) {
                console.log(err)
            };
     
            socket.to(user.socket_id).emit("recieve_message", payload);
        })
}

const getMessageByIndividual = (socket, auth, uuid) => {
    if(auth === undefined) throw "No Auth";

    superagent
        .get(`https://devcms2.limkokwing.net/api/method/marketing.api.get_chat?uuid=${uuid}&group_id=`)
        .set('authorization', `Bearer ${auth}`)
        .end((err, res) => {
            if (err !== undefined) {
                console.log(err)
            };
     
            socket.emit("message_by", res.body);
        })
}

const getStudentByProgram = (auth) => {
    superagent
    .get('https://devcms2.limkokwing.net/api/method/marketing.api.students_list_program_wise')
    .set('authorization', `Bearer ${auth}`)
    .end((err, resErp) => {
        if (err !== undefined) {
            // res.json(err)
            // return err;
            console.log(err)
            socket.emit("student_by_program_recieve", err)
        } else {

        const students = encodeErp(req, resErp.body);
        return resErp.body;
        // socket.emit("student_by_program_recieve", resErp.body)
        }
    });
}

const getStudentByModule = (socket, auth, users) => {
    superagent
    .get('https://cms2dev.limkokwing.net/api/method/marketing.api.students_list_module_wise')
    .set('authorization', `Bearer ${auth}`)
    .end((err, resErp) => {
        if (err !== null) 
        {
            return err;
        }

        const studentsByModules = resErp.body["message"]
        socket.emit("student_by_module_recieve", studentsByModules)

        for (const modules of studentsByModules.values()){
            const students = modules["students"]

            for(const student of students.values()) {
                student.socket_id = undefined;
                
                const found = users.some(el => el.student_id === student.student_id);
                if(!found) users.push(student)
            }
        }
    });
}

module.exports = {postMessage, getStudentByProgram, getStudentByModule, getMessageByIndividual}