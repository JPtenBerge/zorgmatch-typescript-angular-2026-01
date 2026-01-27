# Lab 2 - Getting started

Prerequisites: - NodeJS installed - NPM installed

1. Create an empty working directory. Open that directory in the command line of your choice.
1. Initialize a new TypeScript project.
   - Create a `package.json`.
     - `npm init --yes`
   - Install TypeScript as a local dev dependency
     - `npm install --save-dev typescript`
   - Create a `tsconfig.json`
     - `npx tsc --init`
   - Open the `tsconfig.json` file and change it
     - Compile your code to `es2022`
     - Set `sourceMap` to `true`
     - Set `outDir` to `dist`
1. Setup your favorite IDE.
   - If using VSCode look in the slides on how to do this.
1. Create `src` directory, with a `main.ts`. This will be the home of our TypeScript application for now.
1. Make sure you are able to compile your code and debug the JavaScript output. Follow the instructions on the slides.
1. Compile the file in `--watch` mode.
1. Play around with a hello world type application. Make sure errors are displayed in your IDE.
1. Try out some constructs you know from JavaScript, like `function`s, `if`-`else`, `for`, `while`
