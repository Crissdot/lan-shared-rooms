interface ModelNames {
  modelName: string;
  tableName: {
    singular: string;
    plural: string;
  };
};

const MODELS: {Post: ModelNames, FilePost: ModelNames, User: ModelNames} = {
  Post: {
    modelName: 'Post',
    tableName: {
      singular: 'post',
      plural: 'posts',
    },
  },
  FilePost: {
    modelName: 'FilePost',
    tableName: {
      singular: 'filePost',
      plural: 'filePosts',
    },
  },
  User: {
    modelName: 'User',
    tableName: {
      singular: 'user',
      plural: 'users',
    },
  },
}

const FOREIGN_KEYS = {
  postBelongsToUser: 'userId',
  filePostBelongsToPost: 'postId',
}

export { MODELS, FOREIGN_KEYS };
