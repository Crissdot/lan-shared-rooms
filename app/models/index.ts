import { Sequelize } from 'sequelize';
import { definePost } from './Post';
import { defineUser } from './User';
import { MODELS, FOREIGN_KEYS } from '../constants/DBNames';

const setupModels = async (sequelize: Sequelize) => {
  const UserModel = defineUser(sequelize);
  const PostModel = definePost(sequelize);

  // Relations
  UserModel.hasMany(PostModel, {as: MODELS.Post.tableName.plural, foreignKey: FOREIGN_KEYS.postBelongsToUser});
  PostModel.belongsTo(UserModel, {as: MODELS.User.tableName.singular});

  // Don't use force in production
  return sequelize.sync({ force: false });
}

export { setupModels };
