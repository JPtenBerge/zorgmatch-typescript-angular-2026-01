# Lab 3: Pipes

## Exercise 1: A contact name pipe

Let's create a simple pipe that neatly displays the name of a contact.

1. In `app/`, create a new folder `pipes` with a new file called `contact-name.pipe.ts`.
1. Within `app/pipes/contact-name.pipe.ts`, create and export a new class called `ContactNamePipe`.
1. Implement the interface `PipeTransform`. You can import this interface from `@angular/core`. Remove the second `args` parameter as we won't be using it.
1. Let's make use of TypeScript types and import `Contact` from `../models/contact` as well. Change the type of the input to `Contact` and change the name of the parameter to `contact`.
1. Implement the transform function. Return a `string` that concatenates the `firstName` and the `surname`:
   ```ts
   transform(contact: Contact): string {
       // TODO;
   }
   ```
1. Add the `@Pipe({})` annotation and give your pipe a name (I suggest `contactName`).
1. Import the pipe with your `App`:
   ```ts
   @Component({
     // ...
     imports: [..., ContactNamePipe],
     // ...
   })
   export class App {
   ```
1. Now go to `app.html` and use the pipe instead of directly binding the contact's first name/surname.

Verify that the table contains the names as before. One big difference is that we can now use our pipe throughout our entire web application to ensure that contacts are displayed consistently.
