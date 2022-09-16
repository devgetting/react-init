import path from "path";
export const ROOT_DIR = path.join(__dirname, "..");
export const SRC_DIR = path.join(ROOT_DIR, "src");
export const BUILD_DIR = path.join(ROOT_DIR, "build");

//input file index.ts
export const INPUT_FILE = path.join(SRC_DIR, "index.ts");

//package
export const PACKAGE_MAIN = path.join(BUILD_DIR, "cjs", "index.js");
export const MODULE_FILE = path.join(BUILD_DIR, "esm", "index.js");
export const TYPES_FILE = path.join(BUILD_DIR, "index.d.ts");

//package typescript
export const INPUT_TS_FILE = path.join(BUILD_DIR, "esm", "index.d.ts");
export const OUTPUT_TS_FILE = path.join(BUILD_DIR, "index.d.ts");

//tsconfig
export const TS_CONFIG = path.join(ROOT_DIR, "tsconfig.json");
