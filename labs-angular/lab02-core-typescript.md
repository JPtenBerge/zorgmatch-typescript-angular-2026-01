# Lab 2: Core TypeScript

## Exercise 1: the `Contact` interface

In `app/`, create a folder `models` with a new TypeScript file called `contact.ts` inside it. Add 3 properties of type string to the interface.

```ts
export interface Contact {
  id: number;
  firstName: string;
  surname: string;
  email: string;
}
```

Use this `Contact` interface inside your app.

```ts
export class App {
  contacts = [
    // 👈 Here
    { id: 4, firstName: 'Sam', surname: 'Smith', email: 'sam.smith@music.com' },
    { id: 8, firstName: 'Frank', surname: 'Muscles', email: 'frank@muscles.com' },
    { id: 15, firstName: 'Eddy', surname: 'Valentino', email: 'eddy@valfam.co.uk' },
  ];
}
```

If you've implemented a `deleteContact` method, be sure to use this new `Contact` interface there as well.

Make sure your application still works as expected, without compile errors.

## Exercise 2: contact favorite color - If time permits

Add an **optional** field `color` of type `string` to the contact. Use this together with the color picker in lab 1, exercise 5.
