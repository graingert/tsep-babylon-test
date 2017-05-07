# tsep-babylon-test

This project uses the latest WIP from andy-ms on the babylon-typescript-plugin, and the latest master from typescript-eslint-parser, in order to compare the ASTs they generate for the same source code (with roughly the same configuration options specified for each).

## Install and build dependencies

Simply run `yarn` or `npm install`.

Because of the way bablyon is distributed, we have to also build andy-ms's fork after we have installed it.

This will be done automatically in a `postinstall` script, but if you do need to run it manually, you can also do `yarn build-babylon` or `npm run build-babylon`.

## Run all assertions

This repo uses Jest (and its awesome built-in `pretty-format`) to provide easy to read diffs between the two ASTs for each test case.

Simply run `yarn test` or `npm test` to run all of the assertions.

## Create new assertion

In order to create a new assertion, simply add a new source file (both `.js` and `.ts` files are supported) to the `tests/` directory. It will be picked up automatically the next time you run the assertions.

## Note on preprocessing of Babylon AST

In order to get the most relevant comparison, we preprocess the babylon AST before comparing it to the typescript-eslint-parser AST.

Please see `./tests_config/run_spec.js` for full details.

## Example output of assertion

We are off to a good start! For a very basic variable declaration source:

```ts
var foo = true;
```

The difference between the ASTs is only the addition of an `identifierName` property on the Babylon AST:

![screen shot 2017-05-07 at 16 22 16](https://cloud.githubusercontent.com/assets/900523/25782462/69d8340c-3343-11e7-8eda-03268ee4a380.png)
