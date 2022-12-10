import { Sequelize, DataTypes, ModelStatic, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import { UserModelAttributes, UserModelInput } from '../types/models/IUserModel';

const defineUser = (sequelize: Sequelize) => {
  const User: ModelStatic<Model<UserModelAttributes, UserModelInput>> = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    rawPassword: DataTypes.VIRTUAL,
  });

  User.beforeCreate((user, options) => {
    return new Promise((res, rej) => {
      const rawPassword = user.getDataValue('rawPassword');
      if(rawPassword) {
        bcrypt.hash(rawPassword, 10, (error, hash) => {
          user.setDataValue('password', hash);
          res();
        });
      }
    });
  });

  return User;
};

const getUserModel = (sequelize: Sequelize) => {
  if (!sequelize.models.User) {
    return defineUser(sequelize);
  }
  return (sequelize.models.User as ModelStatic<Model<UserModelAttributes, UserModelInput>>);
}

export { defineUser, getUserModel };
