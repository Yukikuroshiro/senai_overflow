const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const student = await Student.findOne({
        where: {
          email,
        },
      });
      //Métodos para comparar
      //compare(stringParaComparar, strigQueEstaNoBanco) -> retorna uma promesa
      //compareSync(stringParaComparar, strigQueEstaNoBanco) -> retorna a comparação
      if (!student || !bcrypt.compareSync(password, student.password))
        return res.status(403).send({ error: "Usuário ou senha inválidos." });

      const token = generateToken({
        studentId: student.id,
        studentName: student.name,
      });

      res.status(201).send({
        student: {
          studentId: student.id,
          Name: student.name,
          ra: student.ra,
          email: student.email,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
