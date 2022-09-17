import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

import {
  INPUT_FILE,
  INPUT_TS_FILE,
  MODULE_FILE,
  OUTPUT_TS_FILE,
  PACKAGE_MAIN,
  TS_CONFIG,
} from "./routing";

const rollupConfig = {
  input: INPUT_FILE,
  output: [
    {
      file: PACKAGE_MAIN,
      format: "cjs",
      name: "@devgetting/react-init",
    },
    {
      file: MODULE_FILE,
      format: "esm",
    },
  ],
  external: ["react"],
  plugins: [
    commonjs(),
    typescript({
      tsconfig: TS_CONFIG,
    }),
    terser(),
  ],
};

const rollupTypescriptConfig = {
  input: INPUT_TS_FILE,
  output: [
    {
      file: OUTPUT_TS_FILE,
      format: "esm",
    },
  ],
  plugins: [dts()],
};

export default [
  {
    ...rollupConfig,
  },
  {
    ...rollupTypescriptConfig,
  },
];
