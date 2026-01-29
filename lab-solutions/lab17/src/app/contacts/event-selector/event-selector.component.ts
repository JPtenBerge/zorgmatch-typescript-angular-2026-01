import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { auditTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

import { PlannedEvent } from '../../events/planned-event';
import { EventService } from '../../events/services/event.service';

@Component({
	selector: 'dp-event-selector',
	templateUrl: './event-selector.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSelectorComponent implements OnInit {
	private destroyRef = inject(DestroyRef);
	private cdr = inject(ChangeDetectorRef);
	private eventService = inject(EventService);

	query = signal<string>('');
	query$ = toObservable(this.query);

	selected = output<PlannedEvent>();

	events?: PlannedEvent[];
	isLoading = false;

	ngOnInit() {
		this.query$
			.pipe(
				distinctUntilChanged(),
				tap(() => (this.events = undefined)),
				filter(search => search.length > 1),
				tap(() => (this.isLoading = true)),
				auditTime(500),
				switchMap(val => this.eventService.search({ nameLike: val })),
				tap(() => (this.isLoading = false)),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(events => {
				this.events = events;
				this.cdr.markForCheck();
			});
	}
}
