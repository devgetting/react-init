import { RenderElement } from "./RenderElement";

export interface RenderSubject {
  registerDisplay(display: RenderElement): void;
  notifyDisplays(): void;
}
