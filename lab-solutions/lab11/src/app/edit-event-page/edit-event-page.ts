import { ChangeDetectionStrategy, Component, inject, input, linkedSignal, resource } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { Field, form, required } from '@angular/forms/signals';
import { PlannedEvent } from '../models/planned-event';

@Component({
	imports: [Field],
	templateUrl: './edit-event-page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEventPage {
	private router = inject(Router);
	private eventService = inject(EventService);

	id = input.required<string>();
	plannedEvent = resource({
		params: () => ({ id: +this.id() }),
		loader: ({ params }) => this.eventService.get(params.id),
	});

	editEvent = linkedSignal<PlannedEvent>(() => {
		if (this.plannedEvent.isLoading() || !this.plannedEvent.hasValue()) {
			return { id: 0, name: '', invitees: [] };
		}
		return this.plannedEvent.value();
	});
	editEventForm = form(this.editEvent, p => {
		required(p.name);
	});

	async update(event: Event) {
		event.preventDefault();
		await this.eventService.update(this.editEvent());
		this.router.navigate(['/events']);
	}
}
