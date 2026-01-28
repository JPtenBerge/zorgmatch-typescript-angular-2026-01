import { computed, inject, Injectable, Signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { PlannedEvent } from '../planned-event';
import { EventService } from '../services/event.service';

@Injectable({ providedIn: 'root' })
export class EventStore {
	private eventService = inject(EventService);

	#allEvents = rxResource({
		defaultValue: undefined,
		stream: () => this.eventService.getAll(),
	});
	allEvents = this.#allEvents.asReadonly();

	get(id: Signal<number>) {
		return computed(() => {
			if (this.allEvents.isLoading() || !this.allEvents.hasValue()) {
				return undefined;
			}
			return this.allEvents.value().find(x => x.id === id());
		});
	}

	update(updatedEvent: PlannedEvent): Observable<PlannedEvent> {
		return this.eventService.update(updatedEvent).pipe(
			tap(updated => {
				this.#allEvents.update(events => events?.map(e => (e.id === updated.id ? updated : e)));
			}),
		);
	}
}
