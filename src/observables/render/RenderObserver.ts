import { ReactView } from "reactApplication";

export interface RenderObserver {
  update(baseUrl: string, component?: ReactView): void;
}
