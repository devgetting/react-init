import React from "react";
import { createRoot, Root } from "react-dom/client";
import { PageNotFoundException } from "../exceptions";
import { RenderElement, RenderObserver } from "../observables";
import { DisplayObservable } from "../observables/render/DisplayObservable";
import { ReactComponent, ReactView } from "../types";
import { getCurrentComponent } from "../utils";

export class ViewModel implements RenderObserver, RenderElement {
  private id: string;
  private reactComponents: ReactComponent[] = [];
  private root: Root;
  private renderObservable: DisplayObservable;
  private notFoundView: () => JSX.Element;

  constructor(id: string) {
    this.id = id;
    this.root = createRoot(document.getElementById(this.id));
    this.renderObservable = DisplayObservable.getInstance();
    this.renderObservable.registerDisplay(this);
    window.addEventListener("popstate", () => {
      DisplayObservable.getInstance().notifyDisplays();
    });
  }

  registerNotFound(component: () => JSX.Element) {
    this.notFoundView = component;
  }

  update(
    baseUrl: string,
    params: string[] = [],
    component?: new () => ReactView
  ): void {
    if (component) {
      const index = this.reactComponents.findIndex(
        (component) => component.baseUrl === baseUrl
      );

      if (index < 0) {
        this.reactComponents.push({
          component,
          params,
          baseUrl,
        });
      }
    }
  }

  private notFoundException() {
    const element = this.notFoundView
      ? React.createElement(this.notFoundView)
      : React.createElement("h1", {
          children: "Page not found",
        });
    this.root.render(element);
  }

  start() {
    try {
      this.render();
    } catch (e: unknown) {
      this.notFoundException();
    }
  }

  render(): void {
    const compTemp = getCurrentComponent(this.reactComponents);

    const { component } = { ...compTemp };

    if (!component) {
      throw new PageNotFoundException(
        `${window.location.pathname} does not exist as a registered view`
      );
    }

    const comp = new component();

    const element = React.createElement(comp.component);
    this.root.render(element);
  }
}
