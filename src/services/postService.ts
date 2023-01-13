import axios from 'axios';
import { config } from '../config';
import { ICreateNewPost } from '../types/IPost';
import { IGenericResponse } from '../types/IGenericResponse';
import { IFetchedPost } from '../types/IPost';

class PostService {
  enpointURL: string;

  constructor() {
    this.enpointURL = config.backendURL + '/posts';
  }

  async create(message: string) {
    const response = await axios.post<IGenericResponse<IFetchedPost>>(this.enpointURL, {
      message,
    } as ICreateNewPost);

    if (!response.data.success) {
      console.error(response.data.message);
      throw new Error('An error has occured when triyng to create a post');
    }
    return response.data;
  }
}

const postService = new PostService();
export {postService};
