import { ClassInstance } from "../types";
import { Singleton } from "../types/Singleton";

export default function (Listener: ClassInstance) {
  return function <T extends ClassInstance>(target: T) {
    const targetClass = class extends target {
      private static instance: T;

      private constructor(...args: any[]) {
        super(...args);

        const listener = Listener as unknown as Singleton<ClassInstance>;

        Object.defineProperty(this, "listener", {
          get: function () {
            return listener;
          },
          enumerable: true,
        });
      }

      public static getInstance() {
        if (!this.instance) {
          this.instance = new targetClass();
        }

        return this.instance;
      }
    };

    return targetClass as T;
  };
}
