import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { EventService } from '../services/event.service';
import { EventsList } from '../events-list/events-list';

@Component({
	imports: [EventsList],
	templateUrl: './events-page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPage {
	private eventService = inject(EventService);

	events = resource({
		loader: () => this.eventService.getAll(),
	});
}
