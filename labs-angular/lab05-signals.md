# Lab 5: Signals

Store your contacts in a signal. Deleting a contact should update this signal.

```ts
contacts = signal<Contact[]>([
  { id: 4, firstName: 'Sam', surname: 'Smith', email: 'sam.smith@music.com', color: '#ffffff' },
  // ...
]);
```

Also print how many contacts there are using a computed signal.

```html
<h3 class="text-2xl font-bold">Your {{ nrOfContacts() }} contacts</h3>
```
