# Lab 7: Components

Our `App` is bloated! We'll be dividing the logic into two components: a `<dp-add-contact>` and a `<dp-contacts-list>`.

```html
<h3 class="mb-3 text-2xl font-bold">Your {{ nrOfContacts() }} contacts</h3>
<dp-contact-list [contacts]="contacts()" (delete)="deleteContact($event)" />

<h3 class="mt-8 mb-3 text-2xl font-bold">Add contact</h3>
<dp-contact-form (add)="addContact($event)" />
```

## Exercise 1: Splitting up components

Let's place the form of our page in a new `<dp-contact-form>` component.

1. Start with choosing a nice prefix, short and sweet. No inspiration? Then `dp` is the one for you. Open your `angular.json` and change `"prefix": "app",` to your prefix. If you're using ESLint, you should also update your `eslint.config.js` configuration.\
   The `app-root` component should now be named `dp-root`. Update the prefix in `app.ts` and `index.html`.

1. Create a file `src/app/contact-form/contact-form.component.ts` and add the skeleton of a component.

   ```ts
   import { Component } from '@angular/core';

   @Component({
     selector: 'dp-contact-form',
     imports: [],
     templateUrl: './contact-form.component.html',
     styleUrls: ['./contact-form.component.scss'],
   })
   export class ContactForm {}
   ```

1. Also create the `contact-form.component.html` and `contact-form.component.scss` files. Leave them empty for now.
1. The component will let its surrounding component know when a contact has been added by using `output<...>()`.

   ```ts
   export class ContactForm {
     add = output<Contact>();
     // ...
   }
   ```

   Remember to import `output()`.

   ```ts
   import { Component, output } from '@angular/core';
   ```

1. Move the form HTML to the `contact-form.component.html` file.
1. Move the form validation styling to the `contact-form.component.scss` file.
1. Move the form validation logic and the submission handling to the `ContactForm`. Only, instead of directly adding to the list, use the `output()` variable to emit that a new contact has been added:

   ```ts
   export class ContactForm {
     // ...
     addContact(event: Event) {
       event.preventDefault();
       this.add.emit({ ...this.newContact() });
       this.newContact.set({ id: 0, firstName: '', surname: '', email: '', color: '#ffffff' });
       this.addContactForm().reset();
     }

     // ...
   }
   ```

1. In `src/app/app.html`, include the new component and register for the custom event.
   ```html
   <dp-contact-form (add)="addContact($event)" />
   ```
   Modify this `addContact()` to correctly work with the contact parameter being passed in.

Our new component should now be working!

## Exercise 2: Splitting up more

Do the same thing for the contacts table by creating a `<dp-contact-list>` component.

Feel free to use the Angular CLI to generate the boilerplate for this component: `ng generate component --skip-tests contact-list`.

_Note: use `--skip-tests` so it won't generate a test file. We will create tests in next lab._

Be sure to use data binding and events here. The `App` remains responsible for maintaining the list of contacts.

Hint: The end result should look something like this

```html
<dp-contact-list [contacts]="contacts()" (delete)="deleteContact($event)" />
```
