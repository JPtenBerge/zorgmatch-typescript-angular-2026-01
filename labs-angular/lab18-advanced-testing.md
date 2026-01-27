# Lab 18: Advanced testing

In this lab, we'll be integration testing the `EventSelectorComponent` and the `EventService`.

## Preparation

Be sure `ng test` is running in the background and all tests pass. If there are failing tests, it's best to comment them out, or, when they are generated test files, to delete them entirely.

## Exercise 1: Set up integration tests

In this exercise, we'll be setting up the integration test plumbing.

1. Create or clear the `event-selector.component.spec.ts` file.
1. Copy & paste this code:

   ```ts
   describe(EventSelectorComponent.name, () => {
     let element: HTMLElement;
     let sut: ComponentFixture<EventSelectorComponent>;
     let http: HttpTestingController;

     beforeEach(async () => {
       await TestBed.configureTestingModule({
         // TODO
       }).compileComponents();

       http = TestBed.inject(HttpTestingController);
       sut = TestBed.createComponent(EventSelectorComponent);
       element = sut.nativeElement;
       sut.detectChanges();
     });

     it('shows events when typing', () => {});
   });
   ```

1. Configure the testing module such that the empty test passes.

## Exercise 2: A happy flow test

1. Create a test to verify that planned events are shown when typing. You can use this code to start with:

   ```ts
   // Arrange
   const expected = [createPlannedEvent({ name: 'DND Finally' })];
   const input = element.querySelector('input')!;

   // Act
   // TODO

   // Assert
   const listItems = element.querySelectorAll('li');
   expect(listItems.length).toBe(1);
   expect(listItems.item(0).innerText).toBe('DND Finally');
   ```

   _Note:_ If you've finished the previous lab, you will probably have to use `vi.advanceTimersByTime()` here.

1. Once you've done this first test and it passes, it's time to test to see if the `selected` event is dispatched whenever the user clicks on an event in the autocomplete box.

   ```ts
   it('should dispatch the selected event when a planned event is clicked', async () => {});
   ```

## Exercise 3: Alternative flows (if time permits)

Look at the implementation of the `EventSelectorComponent`. It should have quite a few RxJS operators. You should now have enough experience and tools in your toolbox to verify each one of them.

Create an integration test for each RxJS pipe. Verify that the test passes. Also, verify that the test fails whenever you remove that operator.
