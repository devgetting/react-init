import { DisplayObservable } from "../observables/render/DisplayObservable";

export default function (target: any, key: string) {
  Object.defineProperty(target, key, {
    value: {
      redirect(path: string) {
        const urlRoute = path.startsWith("/") ? path.slice(1) : path;
        const route = new URL(
          urlRoute,
          `${location.protocol}//${location.host}`
        );
        window.history.pushState({}, null, route);
        DisplayObservable.getInstance().notifyDisplays();
      },
    },
  });
}
