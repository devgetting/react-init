const getParams = (route: string) => {
  const cleanedRoute = route.endsWith("/") ? route.slice(0, -1) : route;
  const windowRoute = window.location.pathname;

  const cleanedCurrentRoute = windowRoute.endsWith("/")
    ? windowRoute.slice(0, -1)
    : windowRoute;

  let params: string[] = [];

  try {
    const paramsString = cleanedCurrentRoute.split(cleanedRoute)[1];
    params = paramsString.split("/");
    params.shift();
  } catch (e) {
    params = [];
  }

  return params;
};

export default getParams;
