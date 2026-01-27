# Lab 14: UI Test

In this lab, we'll use Playwright (or choose your own) to implement UI tests to test our form validation.

## Exercise 1: getting started

In this exercise, we'll configure Playwright. We will also allow our tests to be written in TypeScript.

1. Install and initialize the playwright testing library:

   ```bash
   pnpm create playwright # using pnpm
   npm init playwright # using npm
   ```

   Choose **TypeScript** as language (if asked) and **e2e** when asked where to put the tests.

1. Open the newly generated `playwright.config.ts`, and alter the config by adding the `baseURL` and `webServer`.

   ```js
   export default defineConfig({
     use: {
       baseURL: 'http://localhost:4200',
     },
     webServer: [
        {
          command: 'npm run start:ng',
          port: 4200,
          reuseExistingServer: !process.env['CI'],
        },
        {
          command: 'npm run start:server',
          port: 3000,
          reuseExistingServer: !process.env['CI'],
        },
     ],
   };
   ```

1. Add a script to help with ui testing in your package.json:

   ```diff
   "scripts": {
     "test": "ng test",
   + "test:ui": "playwright test"
   }
   ```

1. Test your setup by running `npm run test:ui`. It should run the example test without issues:

   ```bash
   > playwright test
   [WebServer] - Building...

   Running 6 tests using 6 workers
     6 passed (18.1s)
   ```

1. You probably want to be able to debug your UI tests. The [Playwright Test for VSCode extension](https://playwright.dev/docs/getting-started-vscode) will help with that.

Congratulations, you can run playwright tests with a `npm` script and with VSCode debugging 🎉.

## Exercise 2: a valid contact

In this exercise, we want to test that our form is valid (allow submit) when valid entries have been given.

Let's start by making a page object that reflects our page.

1. Create a file `e2e/po/contacts-page.po.ts`, it contains our contacts page object.

   ```ts
   import { Page } from '@playwright/test';

   export class ContactsPage {
     constructor(private page: Page) {}
   }
   ```

1. Add a method `navigateTo()` to navigate to the contacts page.

   ```ts
   async navigateTo() {
     return await this.page.goto('/')
   }
   ```

1. Add a `ContactFormPageObject` class (in file `e2e/po/contact-form.po.ts`), which will be responsible for all interactions with the contact form itself.

   ```ts
   import { Locator } from '@playwright/test';

   export class ContactFormPageObject {
     constructor(protected host: Locator) {}
   }
   ```

1. Also add this form to the `ContactsPage`:

   ```ts
   get contactForm() {
     return new ContactFormPageObject(this.page.locator('.add-contact-form'));
   }
   ```

   _Note_: you will have to add the `add-contact-form` class to the add-contact `<form>` HTML element for this selector to work.

1. Add methods to interact with the form to the `ContactFormPageObject` class:

   ```ts
   async enterFirstName(value: string) {
     const firstName = this.host.getByRole('textbox', { name: 'First name' });
     await firstName.fill(value);
   }
   ```

   Do the same for the other form fields.

1. Also, add the submit button, we can use this to validate that the form is submittable later.

   ```ts
   get submitButton() {
     return this.host.getByRole('button', { name: 'Add' });
   }
   ```

1. Now we're ready to write the first actual test. Remove the `example.spec.ts` and create a empty `contacts-page.spec.ts` file with the following content:

   ```ts
   import { test, expect } from '@playwright/test';
   import { ContactsPage } from './po/contacts-page.po';

   test.describe('contacts page', () => {
     let page: ContactsPage;

     test.beforeEach(async ({ page: p }) => {
       page = new ContactsPage(p);
       await page.navigateTo();
     });

     test.describe('add contact form', () => {
       test('should not allow submit at the start', async () => {
         // TODO
       });

       test('should allow submit when the contact is valid', async () => {
         // TODO
       });
     });
   });
   ```

1. Go ahead and implement the two tests using the page objects we've just created. You can do this using the `await expect(...).toBeDisabled()` assertion.

## Exercise 2: Test invalid submissions

1. Add a test that validates that the form is invalid when some required fields are missing

   ```ts
   test('should not allow submit when the first name is missing ', () => {
     // TODO: Implement
   });
   ```

1. You can do the same for a missing surname and missing email.

## Exercise 3: Adding a contact

Add another test to test whether the form submits when the form has only valid entries. Here's a hint:

```ts
// Act
// TODO: fill for James Bond and submit form
// ...

// Assert
await expect(page.contactList.contacts).toContainText('James Bond');
```

## ... if time permits

Playwright is great for running your UI tests, but it doesn't validate type errors in your TypeScript code. However, it is trivial to add this ourselves.

1. Create a new `tsconfig.json` file in the `e2e` directory.
1. Add this content:

   ```json
   {
     "extends": "../tsconfig.json",
     "compilerOptions": {
       "noEmit": true,
       "types": ["node"]
     }
   }
   ```

   - Using `"extends": "../tsconfig.json"` imports all `compilerOptions` from the root `tsconfig.json` and allows you to override specific values yourself.
   - Using `"noEmit": true` will allow us to run the TypeScript compiler as a linter, only validating type safety without producing JS output files.
   - Using `"types": ["node"]` will make sure TypeScript doesn't allow global variables from jasmine to be used (like `describe` and `it`), only globals from `node` are imported.

1. Add a script to help with linting the typescript:

   ```diff
   "scripts": {
     "lint": "ng lint",
   + "lint:ui": "tsc -p e2e"
   },
   ```

1. Let's try it out:

   ```bash
   npm run lint:ui
   ```

   It should compile without errors.

## ... if time permits more

Did you know that Playwright:

- Can automatically store a video file for every failing test?
- Comes with a trace viewer that can replay tests step by step?
- Can record tests right from the browser?

Look around on the https://playwright.dev/ website and find out how.
