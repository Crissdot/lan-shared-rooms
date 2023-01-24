export interface IFetchedPost {
  id: number;
  message: string;
  // TODO type this
  userId: unknown;
  user: unknown;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateNewPost {
  message: string;
  files: unknown;
};
