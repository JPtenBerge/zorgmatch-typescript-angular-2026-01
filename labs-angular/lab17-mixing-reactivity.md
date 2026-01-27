# Lab 17: A store pattern with signals

In this exercise, we'll be playing around signals to implement a store pattern. Switching back and forth between the contacts and events tabs, you can now see that each time you switch to events, they are reloaded from the server. Let's cache them using a store pattern.

1. Create a new store for events: `ng g s events/stores/event-store --skip-tests`.
1. Rename the class to `EventStore`.
1. Let the `EventService` be injected.
1. Give it a public property `allEvents`, which should be a read-only signal that emits `PlannedEvent[]`.
1. Fetch all events in the constructor of the store and emit the result through your new signal.

Now that you've got the basics down, it is time to start replacing interactions with the `EventService` to your new `EventStore`. Start with the `EventsPage`, then `EditEventPage`. In the end, it should have methods like `get`, `update`, [...]. Leave `EventSelectorComponent` as is, that component was specifically for learning to use RxJS.
