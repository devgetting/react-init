import { Home } from "components";
import { View } from "decorators";
import routing from "decorators/routing";
import { Routing } from "reactApplication/Routing";

@View({
  component: Home,
  baseUrl: "/home",
})
export class HomeView {
  @routing
  history: Routing;
}
