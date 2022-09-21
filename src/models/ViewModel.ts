import React from "react";
import { createRoot, Root } from "react-dom/client";
import { RenderElement, RenderObserver } from "../observables";
import { DisplayObservable } from "../observables/render/DisplayObservable";
import { ReactComponent, ReactView } from "../types";
import { getCurrentComponent } from "../utils";

export class ViewModel implements RenderObserver, RenderElement {
  private id: string;
  private reactComponents: ReactComponent[] = [];
  private root: Root;
  private renderObservable: DisplayObservable;

  constructor(id: string) {
    this.id = id;
    this.root = createRoot(document.getElementById(this.id));
    this.renderObservable = DisplayObservable.getInstance();
    this.renderObservable.registerDisplay(this);
    window.addEventListener("popstate", () => {
      DisplayObservable.getInstance().notifyDisplays();
    });
  }

  update(baseUrl: string, params: string[] = [], component?: ReactView): void {
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

      try {
        this.render();
      } catch (e) {}
    }
  }

  render(): void {
    const compTemp = getCurrentComponent(this.reactComponents);

    const { component } = compTemp;

    if (!component) {
      console.error(
        `${window.location.pathname} does not exist as a registered view`
      );
      return;
    }

    const element = React.createElement(component.component);
    this.root.render(element);
  }
}
