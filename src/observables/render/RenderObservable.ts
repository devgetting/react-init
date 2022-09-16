import { ReactView } from "reactApplication";
import { RenderObserver } from "./RenderObserver";
import { RenderSubject } from "./RenderSubject";

export class RenderObservable implements RenderSubject {
  private observers: RenderObserver[];
  private baseUrl: string;
  private component: ReactView;
  private static instance: RenderObservable;

  private constructor() {
    this.observers = [];

    window.addEventListener("popstate", function () {
      RenderObservable.getInstance().switchRoute(this.window.location.pathname);
    });
  }

  registerObserver(observer: RenderObserver): void {
    this.observers.push(observer);
  }

  notifyObservers(): void {
    for (let observer of this.observers) {
      observer.update(this.baseUrl, this.component);
    }
  }

  private changeComponentRegistered() {
    this.notifyObservers();
  }

  registerComponent(baseUrl: string, component?: ReactView) {
    this.baseUrl = baseUrl;
    this.component = component;
    this.changeComponentRegistered();
  }

  switchRoute(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.component = undefined;
    this.changeComponentRegistered();
  }

  public static getInstance(): RenderObservable {
    if (!this.instance) {
      this.instance = new RenderObservable();
    }

    return this.instance;
  }
}
