import { RawAxiosRequestHeaders } from "axios";

export interface IGenericHeaders extends RawAxiosRequestHeaders {
  ['Token-Auth']?: string;
}