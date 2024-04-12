# tsc --build issue w/ references

## Description
This is a reproduction of issue https://github.com/microsoft/TypeScript/issues/44845.  When using references within a monorepo to build an app that depends on a shared library reference, certain files get omitted from the output for no evident reason.

## This repo

Under `projects/`, there are two TS 'references', one a shared lib -- 'shared', and an app called 'server'.  Server contains a reference to the shared lib, and also a path alias called `:shared`, pointing to the same place.

`projects/server/tsconfig.json`:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "rootDir": "..",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "paths": {
      ":shared/*": [
        "../../shared/src/*"
      ]
    },
    "types": [
      "node"
    ]
  },
  "include": [
    "src/**/*.ts",
    "../shared/src/**/*.ts"
  ],
  "references": [
    {
      "path": "../shared"
    }
  ]
}
```

### Steps to reproduce:

* From repo root, run `npm install`.
* `cd projects/server`
* `npm run build` (is just `rm -rf dist/ && tsc --build -v`)
* Check `projects/server/dist/shared/src` output.  Notice that only the shared logging module was built.  'errors.ts' and 'global-type-overrides.ts' should be there based on the include pattern, but they aren't.

## It Gets Even Weirder

In `projects/server/src/server.ts`, if you uncomment the line `// import { log } from ':shared/logging.js';`, the entire shared subdir gets omitted from `projects/server/dist`!!

Just. Shouldn't. Happen.