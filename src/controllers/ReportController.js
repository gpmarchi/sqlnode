const { Op } = require("sequelize");
const User = require("../models/User");

module.exports = {
  async show(req, res) {
    // Encontrar todos os usuários que tem email terminando com @gmail.com
    // Desses usuários buscar todos que moram na rua "Rua General Chagas Santos"
    // Desses usuários buscar as tecnologias que começam com React

    const users = await User.findAll({
      attributes: ["name", "email"],
      where: {
        email: {
          [Op.iLike]: "%@gmail.com"
        }
      },
      include: [
        {
          association: "addresses",
          where: {
            street: "Rua General Chagas Santos"
          }
        },
        {
          association: "techs",
          required: false,
          where: {
            name: {
              [Op.iLike]: "React%"
            }
          }
        }
      ]
    });

    return res.json(users);
  }
};
