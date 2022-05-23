const { users } = require('../db');
const uuid = require('uuid');
const {User} = require('./user.model')
var  bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

exports.getUsers = async () => {
    const users = await User.findAll()

    return users
}

exports.getUserByPseudo = async (pseudo) => {

    const user = await User.findOne({
        where: {
            pseudo: pseudo
        }
      })
    return user
};

exports.getUserByEmail = async (mail) => {

    const user = await User.findOne({
        where: {
            mail: mail
        }
      })
    return user
};

exports.createUser = async (body) => {

    const hashpassword = await bcrypt.hash(body.password,salt)

    await User.create({pseudo:body.username,
                        firstName:body.firstName,
                        lastName:body.name,
                        birthdate:body.age,
                        gender:body.gender,
                        mail:body.mail,
                        password:hashpassword})
};

exports.updateUser = (id, data) => {
  const foundUser = users.find((user) => user.id == id);

  if (!foundUser) {
    throw new Error('User not found');
  }

  foundUser.firstName = data.firstName || foundUser.firstName;
  foundUser.lastName = data.lastName || foundUser.lastName;
  foundUser.password = data.password || foundUser.password;
};

exports.deleteUser = async (id) => {
  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    throw new Error('User not foud');
  }
  await User.destroy({
    where: {
      id: id
    }
  });

  users.splice(userIndex, 1);
}
