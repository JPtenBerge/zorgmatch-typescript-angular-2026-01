# Lab 3 - TypeQuiz

_Either do this lab in vscode, or use the kahoot quiz. For kahoot, go to https://create.kahoot.it/share/typescript-quiz-what-is-the-result/0be1052a-13da-4ca0-bb44-c2cc4fccff97 _

## Preparations

Use the setup you made last lab.

## `Type`quiz

For each of these expressions: try to guess what the outcome will be: `true`, `false`, compile error or something else.
Next, write the expression in `main.ts` using a `console.log`. Run the file to see if you were correct.
Keep your score so we can compare later :).

Note: disable `"strictNullChecks"` (set to `false`) for this lab only. You can do this by changing the `tsconfig.json` file.

1. `null === null;`
1. `true || false;`
1. `2 === "2";`
1. `false === true;`
1. `null === undefined;`
1. `2 + "2";`
1. `2 * "2";`
1. `var a: string; console.log(typeof a);`
1. `var b: string; console.log(typeof b);`
1. `var c: any = 'test'; console.log(typeof c);`
1. `var d = true; console.log(d.charAt(1));`
1. `var e: any = true; console.log(e.charAt(1));`

Don't forget! Re-enable `"strictNullChecks"` (remove from tsconfig and use `"strict": true`) in your `tsconfig.json` file.
