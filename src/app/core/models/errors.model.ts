export enum HttpErrorCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export interface ErrorContent {
  title?: string;
  subtitle?: string;
  imgUrl?: string;
}
