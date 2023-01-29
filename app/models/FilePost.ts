import { Sequelize, DataTypes, ModelStatic, Model } from 'sequelize';
import { FilePostModelAttributes, FilePostModelInput } from '../types/models/IFilePostModel';
import { FOREIGN_KEYS, MODELS } from '../constants/DBNames';

const defineFilePost = (sequelize: Sequelize) => {
  const FilePost: ModelStatic<Model<FilePostModelAttributes, FilePostModelInput>> = sequelize.define(MODELS.FilePost.modelName, {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    [FOREIGN_KEYS.filePostBelongsToPost]: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: MODELS.Post.tableName.plural,
        },
        key: 'id',
      },
    },
  }, {
    tableName: MODELS.FilePost.tableName.plural,
  });

  return FilePost;
};

const getFilePostModel = (sequelize: Sequelize) => {
  return (sequelize.models.FilePost as ModelStatic<Model<FilePostModelAttributes, FilePostModelInput>>);
}

export { defineFilePost, getFilePostModel };
