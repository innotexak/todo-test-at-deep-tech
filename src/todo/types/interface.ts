export interface ITodoCreate {
  id?: string;
  title: string;
  description: string;
  createdAt?: Date;
  updateAt?: Date;
}

export interface ResponseStatus {
  statusCode: number;
  message: string;
  data?: any;
}

export interface ITodoUpdate {
  id: string;
  payload: Partial<ITodoCreate>;
}
