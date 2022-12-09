interface SuccessResponseData {
  code?: number;
  message?: string;
  data?: any;
}

interface SuccesResponse {
  success: boolean;
  code: number;
  message: string;
  data: any;
}

const successResponseData = (resData: SuccessResponseData): SuccesResponse => {
  return {
    success: true,
    code: resData.code ?? 200,
    message: resData.message ?? 'All OK!',
    data: resData.data ?? {},
  }
}

interface ErrorResponseData {
  code?: number;
  error?: any;
  message?: string;
}

interface ErrorResponse {
  success: boolean;
  code: number;
  error: any;
  message: string;
}

const errorResponseData = (resData: ErrorResponseData): ErrorResponse => {
  return {
    success: false,
    code: resData.code ?? 500,
    error: resData.error ?? 'An error has occured',
    message: resData.message ?? 'Pls contact the developer',
  }
}

export { successResponseData, errorResponseData };
