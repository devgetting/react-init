import { ReactApplication } from "reactApplication";
import { AboutView } from "views/AboutView";
import { ApplicationView } from "views/ApplicationView";
import { HomeView } from "views/HomeView";

ReactApplication.run("root")
  .view(ApplicationView)
  .view(HomeView)
  .view(AboutView)
  .notFound();
