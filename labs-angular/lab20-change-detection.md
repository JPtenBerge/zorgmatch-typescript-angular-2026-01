# Lab 20: Change detection

In this lab, we'll be playing around with `OnPush` change detection strategy.

In practice, you'd often want to do for performance reasons. There are also applications that go so far as to make all components use `OnPush` by default.

## Exercise 1: `OnPush` events

1. Change the `EventsListComponent` to now use `OnPush` change detection strategy.
1. Try it out, the application should still look similar.
1. Now try to add a new event via the 'Add Event' form. Do you see that your new event appears in the list?
1. Depending on your state management, this either works or it doesn't. Change your application so it works.\
   Note: you shouldn't need to inject the `ChangeDetectorRef` for this, instead you should be able to create a new `events` array each time a planned event is added.
