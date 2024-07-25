export interface IGenericResponse<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}