const Multer = require("multer");

const uploadQuestios = Multer({
    storage: Multer.diskStorage({
        destination:"uploads/",
        filename: (req, file, callback) => {
            const filename = Date.now() + "." + file.originalname.split(".").pop();

            return callback(null, filename);
        }
    }),
    fileFilter: (req, file, callback) => {
        let alowedTypes = ["image/png", "image/jpeg"];

        if(alowedTypes.includes(file.mimetype)){
            callback(null, true);
        }else{
            callback(new Error("Tipo do arquivo inválido."));
        }
    },
    limits:{
        fileSize: (1024 * 1024) * 2 //Máximo de 2Mb
    }, 
});

module.exports = uploadQuestios.single("image");