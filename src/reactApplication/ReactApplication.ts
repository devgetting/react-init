import { ViewModel } from "../models/ViewModel";

export class ReactApplication {
  private static instance: ReactApplication;
  private viewModel: ViewModel;

  private constructor(id: string) {
    this.viewModel = new ViewModel(id);
  }

  notFound(component: () => JSX.Element) {
    this.viewModel.registerNotFound(component);
    return ReactApplication.instance;
  }

  start() {
    this.viewModel.start();
  }

  static run(id: string) {
    if (!this.instance) {
      this.instance = new ReactApplication(id);
    }

    return this.instance;
  }

  view(view: Record<string | symbol, any>) {
    const sym = Object.getOwnPropertySymbols(view).find(
      ({ description }) => description === "$$path$config"
    );

    const path = view[sym];
    this.viewModel.update(path.baseUrl, path.params, view.view);
    return ReactApplication.instance;
  }
}
