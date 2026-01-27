# Lab 19: Advanced routing

Our application has 2 feature pages:

- contacts
- events

We'll configure routing so that they are both lazy-loaded. You can use the exercises below, or do it yourself without the help.

## Exercise 1: Lazy-loaded contacts

1. Open the `app.routes.ts` and change it to use lazy loading:

   ```ts
   export const routes: Routes = [
     {
       path: 'contacts',
       loadComponent: () => import('./contacts/contacts-page/contacts-page').then(m => m.ContactsPage),
     },
     // ...
   ];
   ```

Check the network tab in F12 tools. There should be a separate bundle for the `ContactsPage` and its descendants. You can also run a build:

```sh
ng build --configuration development
```

In `dist/`, the `main.js` should not have any notion of the `ContactsPage`, `ContactForm` or `ContactList`. All those components should be in a separate chunk.

## Exercise 2: Lazy-loaded events

Repeat the same steps, this time for the `EventsPage`.

If it worked, there should now be 2 lazy chunk files next to the `main.js` bundle.

## Exercise 3: Eager loading

When you look at the network tab in the browser devtools, you will notice that both modules are loaded just in time. I.e. if you navigate to the events tab for the first time, you can see that the `events` bundle is only loaded during navigation. Let's improve that by configuring eager loading.

Open the `app.config.ts` and configure eager loading: `provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules))`.

Verify that it worked by opening up the network tab and reloading the page.
