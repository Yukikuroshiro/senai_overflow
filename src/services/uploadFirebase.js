const admin = require("firebase-admin");

const serviceAccount = require("../config/firebase-key.js");

const BUCKET = "senai-overflow-2021-98b06.appspot.com"; //Constante do endereço do BUCKET

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket(); //Instância do objeto storage

//Middleware para fazer o upload no firebase
const uploadImage = (req, res, next) => {
  if (!req.file) return next(); //Verificando se há uma imagem, se não houver passa o middleware pra frente

  const image = req.file; //Variável para armazenar os dados da imagem
  const fileName = Date.now() + "." + image.originalname.split(".").pop(); //Mudando o nome do arquivo para não haver arquivos com o mesmo nome

  const file = bucket.file(fileName);

  //Função para escrever um arquivo no BUCKET
  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  stream.on("error", (error) => {
    console.error(error);

    return res.status(500).send({ error: "Erro ao subir para o Firebase" });
  });
  stream.on("finish", async () => {
    await file.makePublic();

    req.file.fileName = fileName;

    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${fileName}`;

    next();
  });

  stream.end(image.buffer);
};

module.exports = uploadImage;
