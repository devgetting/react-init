import { RenderObservable } from "observables/render/RenderObservable";

export default function (target: any, key: string) {
  Object.defineProperty(target, key, {
    value: {
      redirect(path: string) {
        const urlRoute = path.startsWith("/") ? path.slice(1) : path;
        const route = new URL(
          urlRoute,
          `${location.protocol}//${location.host}`
        );
        window.history.pushState(null, null, route);
        RenderObservable.getInstance().switchRoute(path);
      },
    },
  });
}
