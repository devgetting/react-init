import { RenderElement } from "./RenderElement";
import { RenderSubject } from "./RenderSubject";

export class DisplayObservable implements RenderSubject {
  private displays: RenderElement[];
  private static instance: DisplayObservable;

  private constructor() {
    this.displays = [];
  }

  registerDisplay(observer: RenderElement): void {
    this.displays.push(observer);
  }

  notifyDisplays(): void {
    for (let display of this.displays) {
      display.start();
    }
  }

  public static getInstance(): DisplayObservable {
    if (!this.instance) {
      this.instance = new DisplayObservable();
    }

    return this.instance;
  }
}
