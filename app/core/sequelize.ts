import { Sequelize } from 'sequelize';
import { setupModels } from '../models';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../db/sqlite3DB.sqlite3',
  logging: console.log,
});

const getSequelize = async () => {
  return setupModels(sequelize);
}

export { getSequelize };
