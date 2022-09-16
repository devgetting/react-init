import React from "react";
import { HomeView } from "views/HomeView";

export default function (this: HomeView) {
  return (
    <React.Fragment>
      <h1>Home View</h1>
      <button onClick={() => this.history.redirect("/")}>go application</button>
      <button onClick={() => this.history.redirect("/about")}>go about</button>
    </React.Fragment>
  );
}
