import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Field, form, required } from '@angular/forms/signals';

import { PlannedEvent } from '../planned-event';
import { EventStore } from '../stores/event-store';

@Component({
	imports: [Field],
	templateUrl: './edit-event-page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEventPage {
	private router = inject(Router);
	private eventStore = inject(EventStore);

	id = input.required<string>();
	idValue = computed(() => +this.id());
	plannedEvent = this.eventStore.get(this.idValue);

	editEvent = linkedSignal<PlannedEvent>(() => {
		let plannedEvent = this.plannedEvent();
		return plannedEvent ? plannedEvent : { id: 0, name: '', invitees: [] };
	});
	editEventForm = form(this.editEvent, p => {
		required(p.name);
	});

	async update(event: Event) {
		event.preventDefault();
		this.eventStore.update(this.editEvent()).subscribe(() => {
			this.router.navigate(['/events']);
		});
	}
}
