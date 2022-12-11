import { Sequelize, DataTypes, ModelStatic, Model } from 'sequelize';
import { PostModelAttributes, PostModelInput } from '../types/models/IPostModel';
import { MODELS, FOREIGN_KEYS } from '../constants/DBNames';

const definePost = (sequelize: Sequelize) => {
  const Post: ModelStatic<Model<PostModelAttributes, PostModelInput>> = sequelize.define(MODELS.Post.modelName, {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    [FOREIGN_KEYS.postBelongsToUser]: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        model: {
          tableName: MODELS.User.tableName.plural,
        },
        key: 'id',
      },
    },
  }, {
    tableName: MODELS.Post.tableName.plural,
  });

  return Post;
};

const getPostModel = (sequelize: Sequelize) => {
  return (sequelize.models.Post as ModelStatic<Model<PostModelAttributes, PostModelInput>>);
}

export { definePost, getPostModel };
