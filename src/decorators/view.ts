import { useCallback, useState } from "react";
import { ListenerClass } from "../models/ListenerClass";
import { ClassInstance } from "../types";

interface View {
  component: () => JSX.Element;
  baseUrl: string;
  params?: string[];
  listener?: ClassInstance;
}

export default function ({
  component,
  baseUrl = "/",
  params = [],
  listener,
}: View) {
  return function <T extends { new (...rest: any[]): {} }>(target: T) {
    const viewObject = {};

    Object.defineProperty(viewObject, Symbol("$$path$config"), {
      value: {
        baseUrl,
        params,
      },
      enumerable: true,
    });

    const targetClass = class extends target {
      constructor(...args: any[]) {
        super(...args);

        Object.defineProperty(this, Symbol("$$path$config"), {
          value: {
            baseUrl,
            params,
          },
          enumerable: true,
        });

        const functionalComponent = function () {
          const [, updateState] = useState<{}>();
          const forceUpdate = useCallback(() => updateState({}), []);
          if (!this.rerender) {
            Object.defineProperty(this, "rerender", {
              value: forceUpdate,
              enumerable: true,
            });

            if (listener) {
              const registerListener = listener as unknown as ListenerClass;

              registerListener.getInstance().registerReceiver({
                rerender: forceUpdate,
              });
            }
          }

          return component.apply(this);
        };

        Object.defineProperty(this, "component", {
          value: () => functionalComponent.apply(this),
        });
      }
    };

    Object.assign(viewObject, {
      view: targetClass,
    });

    return viewObject as T;
  };
}
