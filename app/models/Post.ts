import { Sequelize, DataTypes } from 'sequelize';

const definePost = (sequelize: Sequelize) => {
  return sequelize.define('Post', {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export { definePost };
