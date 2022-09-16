import { About } from "components";
import { View } from "decorators";
import routing from "decorators/routing";
import { Routing } from "reactApplication/Routing";

@View({
  baseUrl: "/about",
  component: About,
})
export class AboutView {
  @routing
  routing: Routing;
}
