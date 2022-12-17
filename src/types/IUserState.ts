import { IFethcedUser } from "./IFetchedUser";

export interface IUserState {
  user: IFethcedUser | null;
  status: string;
}
