export interface IFilePost {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  path: string;
  mimeType: string;
  size: number;
  postId: number;
}

export interface IFetchedPost {
  id: number;
  message: string | null;
  filePost: IFilePost | null;
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
