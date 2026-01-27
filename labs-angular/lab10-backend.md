# Lab 10: Backend communication

## Pre-exercise: Set up a REST service

1. In the `resources/` folder, there's a `date-picker.json` file to boot up a REST service. Copy and paste it into the root of your application.
1. Open a prompt in this folder and install `json-server@0.17.4` and `concurrently`:

   ```bash
   npm i -D json-server@0.17.4 concurrently
   ```

1. Now open the `package.json` and change the `scripts` to start both `ng serve` and the json server on `npm start`:

   ```json
   {
     "scripts": {
       "start": "ng serve",
       "start": "concurrently \"npm run start:ng\" \"npm run start:server\"",
       "start:ng": "ng serve",
       "start:server": "json-server --watch ./date-picker.json"
     }
   }
   ```

1. Now run `npm start`. This will start both the REST service and your angular app.

## Exercise 1: Retrieve contacts from a REST service

1. First, we have to get the `HttpClient` ready for dependency injection. In `app.config.ts`, register it:
   ```ts
   export const appConfig: ApplicationConfig = {
     providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes), provideHttpClient()],
   };
   ```
   `provideHttpClient()` is in `@angular/common/http`.
1. Let's configure a `backendUrl`. For this, run `ng generate environments` and open the `src/environments/environment.development.ts` file and add the backend URL:
   ```ts
   export const environment = {
     backendUrl: 'http://localhost:3000',
   };
   ```
   In the `environment.ts` you can use the production url, for example:
   ```ts
   export const environment = {
     backendUrl: 'http://example.com/api',
   };
   ```
   Using an environment configuration like this will allow us to override the URL for production using `environment.ts`. More environments are supported as well, see https://angular.dev/tools/cli/environments for more information
1. In your `ContactService`, inject `HttpClient` with `inject()`. You can find `HttpClient` in `@angular/common/http` as well. Also import the `environment` object so you can use your `backendUrl`.

   ```ts
   import { environment } from '../../environments/environment';

   // [...]
   export class ContactService {
     private http = inject(HttpClient);
     // [...]
   }
   ```

1. Use the `http` service to retrieve contacts. You can choose to work with an `Observable` or a `Promise` here
   ```ts
   // [...]
   export class ContactService {
     // [...]
     getAll(): Observable<Contact[]> {
       return this.http.get<Contact[]>(`${environment.backendUrl}/contacts`);
     }
   }
   ```
1. Make sure `App` still works. If you chose to work with observables be sure to change the `then` method with the `subscribe` method:
   ```ts
   // [...]
   export class App {
     // [...]
     ngOnInit() {
       this.contactService.getAll().subscribe(contacts => {
         this.contacts = contacts;
       });
     }
   }
   ```

## Exercise 2: More interaction with the REST service

Change the implementations of creating, updating and deleting contacts to work with the REST service. The `ContactService` should be responsible for all API calls:

- Create new contact: `HTTP POST /contacts`\
  The body needs to contain the contact data without the `id` field. There are multiple ways to do this, but the simplest is probably to use destructuring in the parameters: `create({ id, ...contactData }: Contact)`
- Delete contact `HTTP DELETE /contacts/:id`
- Update contact `HTTP PUT /contacts/:id`\
  The body needs to contain the contact data (with or without the `id` field).

You will run into the problem that you have to update the list of contacts once a contact has been created/deleted or updated. Multiple solutions are possible here. Some examples:

1. Update the `contacts` list in the component after a contact gets created/deleted or updated.
2. If you're already familiar with reactive programming, you can use a `BehaviorSubject` to represent the `Contact` array and emit a new array value each time a contact gets created/deleted or updated (centralized store for contacts).

## If time permits... Error Handling

In this exercise, we'll be adding an interceptor to globally catch error responses. This includes status code 500 (internal server error) responses as well as when the server is simply not available.

1. Start by adding a new function, `errorInterceptor()`, in a new file `error.interceptor.ts` in a new folder called `interceptors`.
   ```ts
   export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
     return next(req).pipe(
       catchError(err => {
         if (err instanceof HttpErrorResponse) {
           console.error('Server returned', err.status);
         }
         throw err; // rethrow
       }),
     );
   }
   ```
1. Interceptors need to be registered when providing the `HttpClient`:

   ```ts
   import { provideHttpClient, withInterceptors } from '@angular/common/http';

   export const appConfig: ApplicationConfig = {
     providers: [
       // ...
       provideHttpClient(withInterceptors([errorInterceptor])),
     ],
   };
   ```

   You can test it by stopping the `npm start` command, and starting `npm run start:ng` in one command line, while starting `npm run start:server` in another.

   You can disable the REST service at will by killing the `npm run start:server` process. This should trigger our interceptor.

If there's time, feel free to add a library to your project for showing a user-friendly message that something went wrong. Something like [ngx-toastr](https://ngx-toastr.vercel.app/) or the snackbar from [Angular MDC](https://trimox.github.io/angular-mdc-web/#/snackbar-demo)/[Angular Material](https://material.angular.io/components/snack-bar/overview). Depending on your library choice, these are some steps you'll most likely have to do:

1. Install the library in your project: `npm install ...`
1. Import it with your module `@NgModule({ imports: [...] })`
1. Possibly add style to `style.scss`
1. Dependency inject a service into your interceptor that can show toasts for you:

   ```ts
   private toastr = inject(ToastrService);
   ```

   ```ts
   this.toastr.error(`HTTP request to ${request.url} resulted in ${err.status}`, 'Server error');
   ```

## If time permits... Testing

Once you've created the service, it is time to test it. You can choose to use integration tests or unit tests for it. Here is some boilerplate to get you started:

- Unit test:

  ```ts
  import { environment } from '../../environments/environment';
  // [...]

  describe('contact service', () => {
    let sut: ContactService;
    let httpMock: jasmine.SpyObj<HttpClient>;
    const { backendUrl } = environment;
    const endpoint = `${backendUrl}/contacts`;

    beforeEach(() => {
      httpMock = jasmine.createSpyObj<HttpClient>(['get', 'post', 'put', 'delete']);
      sut = new ContactService(httpMock);
    });

    // TODO
  });
  ```

- Integration test:

  ```ts
  import { environment } from '../../environments/environment';
  // [...]

  describe('Integration test: Contact service', () => {
    let sut: ContactService;
    let httpMock: HttpTestingController;
    const contactsEndpoint = `${environment.backendUrl}/contacts`;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideHttpClient(), provideHttpClientTesting()],
      });
      sut = TestBed.inject(ContactService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    // TODO
  });
  ```
