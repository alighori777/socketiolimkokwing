const fs = require("fs");

const uploadFile = async (req, res) => {
    try {
        if (req.files) {
          let file = req.files.file;

          if (!fs.existsSync(`./uploads/${roomId}`)) 
            fs.mkdirSync(`./uploads/${roomId}`)

          file.mv(`./uploads/${roomId}/` + file.name);
        }

        return res.status(200).json({ success: true});
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error })
      }
}