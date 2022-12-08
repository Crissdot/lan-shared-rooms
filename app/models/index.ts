import { Sequelize } from 'sequelize';
import { definePost } from './Post';

const setupModels = async (sequelize: Sequelize) => {
  definePost(sequelize);

  // Don't use force in production
  return sequelize.sync({ force: true });
}

export { setupModels };
