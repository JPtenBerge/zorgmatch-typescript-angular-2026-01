import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EventsList } from '../events-list/events-list';
import { EventStore } from '../stores/event-store';

@Component({
	imports: [EventsList],
	templateUrl: './events-page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPage {
	events = inject(EventStore).allEvents;
}
