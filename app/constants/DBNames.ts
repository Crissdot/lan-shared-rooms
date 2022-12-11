interface ModelNames {
  modelName: string;
  tableName: {
    singular: string;
    plural: string;
  };
};

const MODELS: {Post: ModelNames, User: ModelNames} = {
  Post: {
    modelName: 'Post',
    tableName: {
      singular: 'post',
      plural: 'posts',
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
}

export { MODELS, FOREIGN_KEYS };
