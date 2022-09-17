import { RenderElement } from "../observables/render/RenderElement";
import { RenderObservable } from "../observables/render/RenderObservable";
import { RenderObserver } from "../observables/render/RenderObserver";
import React from "react";
import { createRoot, Root } from "react-dom/client";

export type ReactView = { component: () => JSX.Element };
export interface ReactApplicationComponent {
  [key: string]: {
    component: ReactView;
  };
}

export class ReactApplication implements RenderObserver, RenderElement {
  private id: string;
  private reactApplicationComponents: ReactApplicationComponent = {};
  private root: Root;
  private exist: boolean = false;
  private static instance: ReactApplication;
  private renderObservable: RenderObservable;

  private constructor(id: string) {
    this.id = id;

    this.root = createRoot(document.getElementById(this.id));

    this.renderObservable = RenderObservable.getInstance();
    this.renderObservable.registerObserver(this);
  }

  update(baseUrl: string, component?: ReactView): void {
    if (component) {
      this.reactApplicationComponents[baseUrl] = {
        component,
      };
    }

    if (baseUrl === window.location.pathname) {
      this.render();
    }
  }

  render(): void {
    const { component } =
      this.reactApplicationComponents[window.location.pathname];

    const availableRoutes = Object.keys(this.reactApplicationComponents);

    if (!availableRoutes.includes(window.location.pathname)) {
      this.exist = false;
      return;
    }

    this.exist = true;
    const element = React.createElement(component.component);
    this.root.render(element);
  }

  notFound() {}

  static run(id: string) {
    if (!this.instance) {
      this.instance = new ReactApplication(id);
    }

    return this.instance;
  }

  view(view: new (...args: any[]) => any) {
    new view();
    return ReactApplication.instance;
  }
}
