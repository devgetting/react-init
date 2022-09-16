import React from "react";
import { ApplicationView } from "views/ApplicationView";

export default function (this: ApplicationView) {
  return (
    <>
      <h1>{this.titulo}</h1>
      <label htmlFor="username">Username</label>
      <br />
      <input
        id="username"
        value={this.username || ""}
        onChange={(e) => this.setUsername(e.target.value)}
      />
      <p>{this.username}</p>
      <label htmlFor="password">Password</label>
      <br />
      <input
        id="password"
        type="password"
        value={this.password}
        onChange={(e) => this.setPassword(e.target.value)}
      />
      <p>{this.password}</p>
      <button onClick={() => this.history.redirect("/home")}>Go to home</button>
    </>
  );
}
