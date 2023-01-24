import axios from 'axios';
import { config } from '../config';
import { IGenericResponse } from '../types/IGenericResponse';
import { IFetchedPost } from '../types/IPost';
import { IGenericHeaders } from '../types/IGenericHeaders';
import { getCurrentUserToken } from './currentUserService';
import { createFormDataFromObject } from '../utils/formData';

class PostService {
  enpointURL: string;

  constructor() {
    this.enpointURL = config.backendURL + '/posts';
  }

  async get() {
    const response = await axios.get<IGenericResponse<IFetchedPost[]>>(this.enpointURL);

    if (!response.data.success) {
      console.error(response.data.message);
      throw new Error('An error has occured when triyng to get the posts');
    }
    return response.data.data;
  }

  async create(message: string, file: File) {
    const headers: IGenericHeaders = {};
    const userToken = getCurrentUserToken();
    if (userToken) {
      headers['Token-Auth'] = userToken;
    }

    const newPost = createFormDataFromObject({message, file});
    const response = await axios.post<IGenericResponse<IFetchedPost>>(this.enpointURL, newPost, {
      headers,
    });

    if (!response.data.success) {
      console.error(response.data.message);
      throw new Error('An error has occured when triyng to create a post');
    }
    return response.data.data;
  }
}

const postService = new PostService();
export {postService};
