type TSendResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

export default TSendResponse;
