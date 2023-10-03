export type ServiceMessage = { message: string };

export type ServiceResponseError = {
  status: number,
  data: ServiceMessage,
};

export type ServiceResponseSucess<T> = {
  status: number,
  data: T,
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSucess<T>;
