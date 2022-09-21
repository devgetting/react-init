import { ReactView } from "./ReactView";

export interface ReactComponent {
  component: ReactView;
  baseUrl: string;
  params?: string[];
}
