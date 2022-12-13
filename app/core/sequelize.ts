import { Sequelize } from 'sequelize';
import { setupModels } from '../models';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './app/db/sqlite3DB.sqlite3',
  logging: console.log,
});

const setupSequelize = () => {
  return setupModels(sequelize);
}

export { setupSequelize, sequelize };
