import "reflect-metadata";
import { HTTP_METHOD, Metadata } from "../../types";
import { RequestHandler } from "express";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routerBinder(method: HTTP_METHOD) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(Metadata.PATH, path, target, key);
      Reflect.defineMetadata(Metadata.METHOD, method, target, key);
    };
  };
}

export const get = routerBinder(HTTP_METHOD.GET);
export const post = routerBinder(HTTP_METHOD.POST);
export const patch = routerBinder(HTTP_METHOD.PATCH);
export const put = routerBinder(HTTP_METHOD.PUT);
export const del = routerBinder(HTTP_METHOD.DEL);
