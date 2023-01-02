import { ClassInstance } from "../types";

export default function <T extends ClassInstance>(target: T) {
  const targetClass = class extends target {
    private static instance: T;

    private constructor(...args: any[]) {
      super(...args);

      if (!args[0]) {
        throw "This class has been defined as a context and cannot being initialized by new () declaration";
      }
    }

    public static getInstance() {
      if (!this.instance) {
        this.instance = new targetClass(true);
      }

      return this.instance;
    }
  };

  return targetClass as T;
}
