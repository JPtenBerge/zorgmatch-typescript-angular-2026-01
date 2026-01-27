# Lab 13: Advanced TypeScript

## Exercise 1: the `createContact()` factory

We currently create a contact inline:

```ts
export class ContactForm {
  add = output<Contact>();

  newContact: Contact = {
    id: 0,
    firstName: '',
    surname: '',
    email: '',
  };
}
```

Let's create a factory method to reduce this duplicate code.

1. Open `contact.ts`.
1. Create a `createContact` function that returns a new contact (using empty strings).
1. Use this new function in `ContactForm`.
1. Update the factory method pattern using the "Mapped type use case: Factories" slide. This should be possible
   ```ts
   createContact({ firstName: 'foo' });
   createContact({ surname: 'foo' });
   createContact({ email: 'foo' });
   ```
   However, these should result in compile errors:
   ```ts
   createContact({ firstName: 42 }); // 💥
   createContact({ surnamez: 'foo' }); // 💥
   ```
1. Once you've done that, you might want to do the same for the `PlannedEvent` entity.

## Exercise 2: a type-safe HTTP client (if time permits)

You might have noticed that the Angular `HttpClient` isn't exactly type-safe. Calling `httpClient.get<Contact>('...')` returns an `Observable<Contact>`, but no validation is done to see if the result really has the shape of a `Contact`. This is not a problem normally, because you trust the server, but in some use cases you might want to validate server responses.

1. Let's open up `contact.service.ts` file. Change all `http.get<Contact[]>(...)` calls to `http.get<unknown>(...)` (or `http.get(...)`, since `unknown` is the default for the generic type).
1. Now create a validate method. You can either use an assertion function or a type guard.
   ```ts
   function validateIsContact(maybeContact: unknown): maybeContact is Contact {
     // TODO
   }
   // OR
   function assertIsCustomer(betterBeContact: unknown): asserts betterBeContact is Contact {
     // TODO
   }
   ```
1. Use these to validate the results. If you do that correctly, all compile errors should disappear.
