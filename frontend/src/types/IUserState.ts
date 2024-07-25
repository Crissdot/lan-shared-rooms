import { IFetchedUser } from "./IFetchedUser";

export interface IUserState {
  user: IFetchedUser | null;
  status: string;
}
