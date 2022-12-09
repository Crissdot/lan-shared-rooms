interface ResponseData {
  code?: number;
  message?: string;
  data?: any;
}

interface SuccesResponse {
  code: number;
  message: string;
  data: any;
}

const successResponseData = (resData: ResponseData): SuccesResponse => {
  return {
    code: resData.code ?? 200,
    message: resData.message ?? 'All OK!',
    data: resData.data ?? {},
  }
}

export { successResponseData };
