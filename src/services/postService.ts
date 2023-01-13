import axios from 'axios';
import React from 'react';
import { config } from '../config';

class PostService {
  enpointURL: string;

  constructor() {
    this.enpointURL = config.backendURL + '/posts';
  }

  async create(message: string) {
    const response = await axios.post(this.enpointURL, {
      message,
    });
    return response.data;
  }
}

const postService = new PostService();
export {postService};
