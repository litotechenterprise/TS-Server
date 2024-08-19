import "reflect-metadata";

import { AppRouter } from "../../AppRouter";
import { HTTP_METHOD, Metadata } from "../../types";
import { NextFunction, RequestHandler, Response, Request } from "express";

function bodyValidator(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("invalid request");
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(404).send("invalid request");
        return;
      }
    }

    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(Metadata.PATH, target.prototype, key);
      const method: HTTP_METHOD = Reflect.getMetadata(
        Metadata.METHOD,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(Metadata.MIDDLEWARE, target.prototype, key) || [];

      const requiredBodyProps =
        Reflect.getMetadata(Metadata.VALIDATOR, target.prototype, key) || [];

      const validator = bodyValidator(requiredBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    });
  };
}
