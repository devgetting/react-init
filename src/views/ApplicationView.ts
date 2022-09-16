import { View } from "decorators";
import { Application } from "components";
import { action } from "decorators";
import { Routing } from "reactApplication/Routing";
import routing from "decorators/routing";

@View({
  component: Application,
  baseUrl: "/",
})
export class ApplicationView {
  titulo: string = "React Application";
  username: string;
  password: string = "";

  @routing
  history: Routing;

  @action
  setUsername(username: string) {
    this.username = username;
  }

  setPassword(password: string) {
    console.log("called");
    this.password = password;
  }
}
