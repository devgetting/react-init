import { RenderObserver } from "./RenderObserver";

export interface RenderSubject {
  registerObserver(observer: RenderObserver): void;
  notifyObservers(): void;
}
