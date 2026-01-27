# Lab 9: Dependency injection

In our current application, `App` itself creates and keeps track of the list of contacts. In this lab, we will move that list into a service. We will also prepare that service to work `async`.

## Exercise 1: Introducing the service

Services are great at being responsible for managing data. Let's create one.

1. Create a class (just a regular class) in `src/app/services/contact.service.ts`.
1. Decorate the class with `@Injectable()` and use `providedIn` to register it.

   ```ts
   @Injectable({ providedIn: 'root' })
   export class ContactService {
     // TODO
   }
   ```

1. Now to add logic. Move the creation of the contact list to the `ContactService`.
1. Add a method `getAll()` that returns the list of contacts. We'll prepare this service to work asynchronous, since we'll be retrieving the list of contacts from the server in the next lab.

   ```ts
   export class ContactService {
     // ...
     async getAll(): Promise<Contact[]> {
       // TODO Implement
     }
     // OR
     getAll(): Observable<Contact[]> {
       // TODO Implement
     }
     // ...
   }
   ```

1. Inject this service in the `App`. Make it implement the `OnInit` interface and use it to fill the list of `contacts` in `ngOnInit()`.

   ```ts
   export class App implements OnInit {
     // ...
     ngOnInit(): void {
       this.contactService.getAll().then(contacts => {
         this.contacts.set(contacts);
       });

       // OR

       this.contactService.getAll().subscribe(contacts => {
         this.contacts.set(contacts);
       });
     }
     // ...
   }
   ```

   Note that if you're returning a `Promise<T>` from the `ContactService`, you _can_ use `await`:

   ```ts
   async ngOnInit() {
   	 const contacts = await this.contactService.getAll();
   	 this.contacts.set(contacts);
   }
   ```

   But Angular won't `await` the `ngOnInit()` when calling it. This code, however, will work, thanks to how signals are implemented. Should you use this style of coding though? [Answer](https://www.codelessgenie.com/blog/wait-for-asynchronous-functions-to-finish-in-angular/#can-ngoninit-be-async)
