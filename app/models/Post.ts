import { Sequelize, DataTypes, ModelStatic, Model } from 'sequelize';
import { PostModelAttributes, PostModelInput } from '../types/models/IPostModel';

const definePost = (sequelize: Sequelize) => {
  const Post: ModelStatic<Model<PostModelAttributes, PostModelInput>> = sequelize.define('Post', {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Post;
};

const getPostModel = (sequelize: Sequelize) => {
  if (!sequelize.models.Post) {
    return definePost(sequelize);
  }
  return (sequelize.models.Post as ModelStatic<Model<PostModelAttributes, PostModelInput>>);
}

export { definePost, getPostModel };
