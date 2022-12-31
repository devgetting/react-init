import { ClassInstance } from "../types";

export default function (context: ClassInstance) {
  return function (target: any, key: string) {
    Object.defineProperty(target, key, {
      get: function (this: any) {
        const globalContext = context as any;
        return globalContext.getInstance();
      },
      enumerable: true,
    });
  };
}
