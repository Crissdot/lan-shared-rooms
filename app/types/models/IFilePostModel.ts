import { BaseModelAttributes } from './IBaseModel';

interface FilePostModelInput {
  postId: number;
  name: string;
  path: string;
  mimeType: string;
  size: number;
}

interface FilePostModelAttributes extends FilePostModelInput, BaseModelAttributes {}

export { FilePostModelInput, FilePostModelAttributes };
