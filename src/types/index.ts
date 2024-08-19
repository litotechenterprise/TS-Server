import { Request } from "express";

export interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}
export enum HTTP_METHOD {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DEL = "delete",
}

export enum Metadata {
  METHOD = "method",
  PATH = "path",
  MIDDLEWARE = "middleware",
  VALIDATOR = "validator",
}
