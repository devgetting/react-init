import React from "react";
import { AboutView } from "views/AboutView";

export default function (this: AboutView) {
  return (
    <React.Fragment>
      <h1>About</h1>
      <p>This is about view</p>
      <button onClick={() => this.routing.redirect("/")}>Go Application</button>
      <button onClick={() => this.routing.redirect("/home")}>Go Home</button>
    </React.Fragment>
  );
}
