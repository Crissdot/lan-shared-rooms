import { IBaseModel } from "./IBaseModel";

export interface IFetchedUser extends IBaseModel {
  username: string;
  password: string;
  token: string;
};
