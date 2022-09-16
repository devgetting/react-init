import { RenderObservable } from "observables/render/RenderObservable";
import { useCallback, useState } from "react";
import { ReactView } from "reactApplication";

interface View {
  component: () => JSX.Element;
  baseUrl?: string;
}

export default function ({ component, baseUrl }: View) {
  return function <T extends { new (...rest: any[]): {} }>(target: T) {
    return class extends target {
      componentFunction = component;

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

        RenderObservable.getInstance().registerComponent(
          baseUrl,
          this as unknown as ReactView
        );
      }
    };
  };
}
