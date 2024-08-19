import { RequestHandler } from "express";
import { Metadata } from "../../types";

import "reflect-metadata";

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(Metadata.MIDDLEWARE, target, key) || [];

    Reflect.defineMetadata(
      Metadata.MIDDLEWARE,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
