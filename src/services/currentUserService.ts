import { store } from "../store";

export function getCurrentUserToken(): (string | undefined) {
  const state = store.getState();
  return state.user.user?.token;
}