import { Sequelize, DataTypes, ModelStatic, Model } from 'sequelize';
import { PostModelAttributes, PostModelInput } from '../types/models/IPostModel';
import { MODELS, FOREIGN_KEYS } from '../constants/DBNames';
import { createSocketClient } from '../core/socketClient';
import { SOCKET_NAMES } from '../constants/sockets';

const definePost = (sequelize: Sequelize) => {
  const Post: ModelStatic<Model<PostModelAttributes, PostModelInput>> = sequelize.define(MODELS.Post.modelName, {
    message: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
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

  const socket = createSocketClient();
  Post.afterCreate((post, options) => {
    socket.emit(SOCKET_NAMES.newPost, post);
  });

  return Post;
};

const getPostModel = (sequelize: Sequelize) => {
  return (sequelize.models.Post as ModelStatic<Model<PostModelAttributes, PostModelInput>>);
}

export { definePost, getPostModel };
