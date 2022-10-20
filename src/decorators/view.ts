import { useCallback, useState } from "react";

interface View {
  component: () => JSX.Element;
  baseUrl: string;
  params?: string[];
}

export default function ({ component, baseUrl = "/", params = [] }: View) {
  return function <T extends { new (...rest: any[]): {} }>(target: T) {
    return class extends target {
      constructor(...args: any[]) {
        super(...args);

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

        Object.defineProperty(this, Symbol("$$path$config"), {
          value: {
            baseUrl,
            params,
          },
          enumerable: true,
        });
      }
    };
  };
}
