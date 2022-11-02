import { ReactView } from "../../types";

export interface RenderObserver {
  update(
    baseUrl: string,
    params: string[],
    component?: new () => ReactView
  ): void;
}
