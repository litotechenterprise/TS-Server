import { Metadata } from "../../types";

import "reflect-metadata";

export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(Metadata.VALIDATOR, keys, target, key);
  };
}
