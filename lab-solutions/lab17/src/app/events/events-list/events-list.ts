import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PlannedEvent } from '../planned-event';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'dp-events-list',
	imports: [RouterLink],
	templateUrl: './events-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsList {
	events = input.required<PlannedEvent[]>();
}
