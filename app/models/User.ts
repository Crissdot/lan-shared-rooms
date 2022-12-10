import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const defineUser = (sequelize: Sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    passwordHashed: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
  });

  User.beforeCreate((user, options) => {
    return new Promise((res, rej) => {
      if(user.password) {
        bcrypt.hash(user.password, 10, (error, hash) => {
          user.passwordHashed = hash;
          res();
        });
      }
    });
  });

  return User;
};

export { defineUser };
