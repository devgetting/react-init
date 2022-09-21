import { getParams } from "../utils";

export default function (param: string) {
  return function (target: any, key: string) {
    const descriptor = {
      get(this: any) {
        const sym = Object.getOwnPropertySymbols(this).find(
          ({ description }) => description === "pathConfig"
        );

        const viewConfig = this[sym];

        const cleanedParam = param.startsWith(":") ? param : `:${param}`;

        const parameters = getParams(viewConfig.baseUrl);
        const selectedParam = viewConfig.params.indexOf(cleanedParam);

        if (selectedParam < 0) {
          return undefined;
        }

        const currentParam = parameters[selectedParam];

        return currentParam.endsWith("/")
          ? currentParam.slice(0, -1)
          : currentParam;
      },
      enumerable: true,
    };

    Object.defineProperty(target, key, descriptor);
  };
}
