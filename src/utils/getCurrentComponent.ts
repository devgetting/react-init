import { ReactComponent } from "../types";

const getCurrentComponent = (components: ReactComponent[]) => {
  const foundedComponent = components.find((component) => {
    if (!window.location.pathname.includes(component.baseUrl)) return false;
    const params = window.location.pathname.split(component.baseUrl)[1];
    const paramlength = !params.length
      ? params.length
      : params.split("/").splice(0, 1).length;

    return paramlength === component.params.length;
  });

  return foundedComponent;
};

export default getCurrentComponent;
