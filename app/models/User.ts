import { Sequelize, DataTypes } from 'sequelize';

const defineUser = (sequelize: Sequelize) => {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export { defineUser };
