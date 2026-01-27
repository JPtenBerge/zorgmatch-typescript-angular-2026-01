# Lab 8: Integration tests

Let's start with integration testing our `dp-contact-list` component.

Before we start:

Make sure `ng test` is running in the background using your terminal. It should not have any failing tests to start with.

## Exercise 1

1. Create a `src/app/contact-list/contact-list.component.spec.ts` file. Fill it with this boiler plate:

   ```ts
   describe('ContactList', () => {
     let component: ContactList;
     let element: HTMLElement;
     let fixture: ComponentFixture<ContactList>;

     beforeEach(() => {
       TestBed.configureTestingModule({
         imports: [ContactList],
       });

       fixture = TestBed.createComponent(ContactList);
       component = fixture.componentInstance;
       element = fixture.nativeElement;

       fixture.componentRef.setInput('contacts', []);
       fixture.detectChanges();
     });

     it('should show 2 contacts when 2 contacts are bound', () => {
       // TODO
     });
   });
   ```

1. Create a test. It should create 2 contacts, bind add it to the `component.contacts` and test that there are 2 actual list items shown on the screen.

## ... If time permits

Add more tests. Start with a test that validates that the name is shown correctly.

When you think you're done, run StrykerJS again. See what your mutation score is for this file. Try to get 💯%

```bash
npx stryker run --concurrency 2 --mutate src/app/contact-list/contact-list.component.ts
```
