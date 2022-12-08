import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../db/sqlite3DB.sqlite3',
  logging: console.log,
});

export { sequelize };
