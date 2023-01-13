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
    return response.data;
  }
}

const postService = new PostService();
export {postService};
