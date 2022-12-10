import { Sequelize } from 'sequelize';
import { definePost } from './Post';
import { defineUser } from './User';

const setupModels = async (sequelize: Sequelize) => {
  definePost(sequelize);
  defineUser(sequelize);

  // Don't use force in production
  return sequelize.sync({ force: true });
}

export { setupModels };
