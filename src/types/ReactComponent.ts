import { ReactView } from "./ReactView";

export interface ReactComponent {
  component: new () => ReactView;
  baseUrl: string;
  params?: string[];
}
