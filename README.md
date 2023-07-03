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
