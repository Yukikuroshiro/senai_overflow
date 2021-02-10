const Multer = require("multer");

const uploadSingleImage = Multer({
  storage: Multer.memoryStorage(/*{
    destination: "uploads/",
  }*/),
  fileFilter: (req, file, callback) => {
    let alowedTypes = ["image/png", "image/jpeg"];

    if (alowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Tipo do arquivo inválido."));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2, //Máximo de 2Mb
  },
});

module.exports = uploadSingleImage.single("image");
