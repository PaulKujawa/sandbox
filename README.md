## Usage

- deployed to https://kujawa.netlify.app/, running the stand-alone version.

- executable via
  - stand-alone: `npm start` & `npm run build`
  - micro frontend: `npm run start:mfe` & `npm run build:mfe`

## TODOS

- readd image somwhere (`import ImageDogeUrl from "../assets/doge.jpg";`)

## Features

- bundling, linting, formatting (webpack, ESLint, Prettier)
- transpiling incl. sourcemaps, TS definition files, and browser support (webpack, TSC, Babel)
- themed UI components (mui)
- client-side routing (react-router, webpack)
  - code-split & prefetched pages (react-router, webpack)
  - prefetched pages' data (react-query)
- client network cache (react-query)
- React Concurrent Rendering (useDefferedValue, but no useTransition)
- Experimental Features
  - suspense-enabled data fetching (react-query, React18 RC3)

## Notes

### NodeJs and Typescript

- in order to receive type interference for imported modules, ESM is needed.
  So in TS I set `"esModuleInterop": true` and import CJS like ESM, e.g. `import express from "express"`.
- but when transpiling to NodeJs, what expects CommonJS by default, one faces two options
  - transpile to CommonJS via TSC, by effectively just staying with all defaults
  - transpile to ESM via TSC and inform NodeJs, by
    - in `package.json`, set `type: module` and use `.cjs` for overrides
    - add `.js` to all ES imports (use it even for TS files)
    - in tsconfig set `"module": "NodeNext"`
    - transpile not via `ts-node` (https://github.com/TypeStrong/ts-node/issues/1007),
      but either `tsc-watch` or both plain `tsc` and `node`
      and since TSC can only accept a tsconfig OR entry file, set `outDir` in tsconfig
