import { ClassInstance } from "../types";
import { Singleton } from "../types/Singleton";

export default function (listener: ClassInstance) {
  return function <T extends ClassInstance>(target: T) {
    return class extends target {
      constructor(...args: any[]) {
        super(...args);

        const castedListener = listener as unknown as Singleton<ClassInstance>;

        Object.defineProperty(this, "listener", {
          get() {
            return castedListener;
          },
        });

        Object.defineProperty(this, Symbol("$$typeof"), {
          get() {
            return "controller";
          },
        });
      }
    };
  };
}
