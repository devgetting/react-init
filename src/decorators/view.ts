import { useCallback, useState } from "react";

interface View {
  component: () => JSX.Element;
  baseUrl: string;
  params?: string[];
}

export default function ({ component, baseUrl = "/", params = [] }: View) {
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
            });
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
