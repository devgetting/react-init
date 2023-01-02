import { memo, useCallback, useState } from "react";

export default function <T extends unknown, S>(
  controller: T,
  Component: React.FC<S>
) {
  const controllerType = Object.getOwnPropertySymbols(controller).find(
    (e) => e.description === "$$typeof"
  );

  const target = controller as any;

  if (target[controllerType] !== "controller")
    throw "Invalid controller has been received";

  return memo((props: S) => {
    const [, update] = useState([]);

    const forceUpdate = useCallback(() => update([]), []);

    if (!target.rerender) {
      Object.defineProperty(target, "rerender", {
        value: forceUpdate,
      });

      target.listener.getInstance().registerReceiver({ rerender: forceUpdate });
    }

    return Component(props);
  });
}
