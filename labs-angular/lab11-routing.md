# Lab 11: Routing

In this lab, we'll be creating a second page where we can invite people to some sort of fun event. First we will need to set up routing, then we can fill in the page with the invitation form.

![Getting started](img/lab10-routing.gif)

## Exercise 1: Set up routing

In this exercise, we'll make the `App` responsible for being the container where all the views are loaded into. All of its content (the contact form and list) will be moved to a new `ContactsPage`.

1. Generate a new `<dp-contacts-page>` component with `ng generate component contacts-page --skip-tests`.
1. Move the `App` content to the new `ContactsPage`.
   - Move the content of `app.html` to `contacts-page.html`, but keep the `container`, the `h1` and the `<p class="lead">`. They should be visible on each screen.
   - Move the content of `app.ts` to `contacts-page.ts`
   - Update the `templateUrl` and other references to the old `App` in `contacts-page.ts`.
1. In `app.html`, define a `<router-outlet />` element inside the `container` where views will be dynamically inserted.
1. Time to define routes. Open `app.routes.ts` and define the first route.

   ```ts
   import { Routes } from '@angular/router';
   import { ContactsPage } from './contacts-page/contacts-page';

   export const routes: Routes = [{ path: 'contacts', component: ContactsPage }];
   ```

1. Routing should already have been activated when you generated your project. Check `app.config.ts` and double-check whether routing is provided:

   ```ts
   import { provideRouter } from '@angular/router';
   import { routes } from './app.routes';

   export const appConfig: ApplicationConfig = {
     providers: [
       // ...
       provideRouter(routes), // <== this is where routing functionality is activated
     ],
   };
   ```

   If you add `/contacts` to your browser's address bar, our application should now work as it did before! With the added benefit that we can now start adding more pages.

## Exercise 2: The events page

In this exercise, we will be creating an events page. Here we can:

- List the events that we are picking a date for
- Edit the event title
- Display who is invited to the event.

1. Create `models/planned-event.ts`
   ```ts
   export interface PlannedEvent {
     id: number;
     name: string;
     invitees: Contact[];
   }
   ```
1. Create a new component called `EventsPage`
   ```bash
   ng generate component events-page --skip-tests
   ```
1. Follow the steps from the previous exercise to configure the routing for `/events` to open the new events component.
1. When navigating to `/events` in your browser's address bar, the new events page should be displayed.
1. Update or create the `EventService`:

   ```ts
   const CONTACT_API = `${environment.backendUrl}/contacts`;

   @Injectable({ providedIn: 'root' })
   export class ContactService {
     private http = inject(HttpClient);

     async getAll(): Promise<Contact[]> {
       return firstValueFrom(this.http.get<Contact[]>(CONTACT_API));
     }

     async create(contactData: Omit<Contact, 'id'>): Promise<Contact> {
       return firstValueFrom(this.http.post<Contact>(CONTACT_API, contactData));
     }

     async update({ id, ...contactData }: Contact): Promise<Contact> {
       return firstValueFrom(this.http.put<Contact>(`${CONTACT_API}/${id}`, contactData));
     }

     async delete(id: number): Promise<void> {
       return firstValueFrom(this.http.delete<void>(`${CONTACT_API}/${id}`));
     }
   }
   ```

   If you chose an `Observable` approach, simply remove all the `firstValueFrom()` calls and change the return values.

1. Show the list of events when `/events` is opened.

## Exercise 3: a menu component

In this exercise we'll be creating a menu so we can actually navigate by clicking a menu item.

1. Generate a new `Menu`: `ng generate component menu --skip-tests `
1. Open the `menu.component.html` file and replace it with this HTML
   ```html
   <div role="tablist" class="tabs tabs-border mb-10">
     <a role="tab" class="tab" routerLink="/contacts" routerLinkActive="tab-active">Contacts</a>
     <a role="tab" class="tab" routerLink="/events" routerLinkActive="tab-active">Events</a>
   </div>
   ```
1. Add the menu to the `app.html` file: `<dp-menu />`
1. Add router directives in order to make the menu work (hint: something with `routerLink` and `routerLinkActive`)

## Exercise 4: edit events

In this exercise, we will add a new page for editing event names.

1. Generate a new `EditEventPage`: `ng generate component edit-event-page --skip-tests`.
1. Add a new route for this page. It should contain a route parameter that contains the `id` if the event we're editing.
   ```ts
   { path: 'events/edit/:id', component: EditEventPage },
   ```
1. Open the `edit-event-page.html` file and add this content:

   ```html
   @if (plannedEvent.isLoading()) {
   <p>Loading event...</p>
   } @else if (!plannedEvent.hasValue()) {
   <p>Could not load event.</p>
   } @else {
   <div>
     <form (submit)="update($event)" class="flex items-center gap-2" autocomplete="off" novalidate>
       <input [field]="editEventForm.name" class="input" placeholder="Birthday party" aria-label="Event name" />

       <button [disabled]="!editEventForm().valid()" id="button-addon2" class="btn btn-primary">Update</button>
     </form>
   </div>
   }
   ```

1. Open the `edit-event-page.ts` file and add this boilerplate:

   ```ts
   export class EditEventPage {
     private router = inject(Router);
     private eventService = inject(EventService);

     id = input.required<string>();
     plannedEvent = /* TODO: some sort of signal */;

     editEvent = /* TODO: some sort of signal */;
     editEventForm = form(this.editEvent, p => {
       required(p.name);
     });

     async update(event: Event) {
       /* TODO */
     }
   }
   ```

1. The `id` input will only work if we update our route config a bit:
   ```ts
   export const appConfig: ApplicationConfig = {
     providers: [
       // ...
       provideRouter(routes, withComponentInputBinding()),
     ],
   };
   ```
1. Implement the `plannedEvent` field. It should retrieve the planned event based on the `id` from the currently active route parameter.
1. Implement the `editEvent` field. Its value should be the value of `plannedEvent`, but that could still be loading. Plus, the signal should be settable through the form interactions.
1. Implement the `update` method. It should update the title of the event we're editing and navigate back to the events page after that. You can use `router.navigate()` for this purpose.
