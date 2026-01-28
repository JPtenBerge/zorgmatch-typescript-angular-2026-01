import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PlannedEvent } from '../planned-event';

@Injectable({ providedIn: 'root' })
export class EventService {
	private http = inject(HttpClient);

	getAll(): Promise<PlannedEvent[]> {
		return firstValueFrom(this.http.get<PlannedEvent[]>(`${environment.backendUrl}/events`));
	}

	search(query: { nameLike: string }): Observable<PlannedEvent[]> {
		const url = new URL(`${environment.backendUrl}/events`);
		url.searchParams.set('name_like', query.nameLike);
		return this.http.get<PlannedEvent[]>(url.href);
	}

	get(id: PlannedEvent['id']): Promise<PlannedEvent> {
		return firstValueFrom(this.http.get<PlannedEvent>(`${environment.backendUrl}/events/${id}`));
	}

	create(event: PlannedEvent): Promise<PlannedEvent> {
		return firstValueFrom(this.http.post<PlannedEvent>(`${environment.backendUrl}/events`, event));
	}

	update({ id, ...eventData }: PlannedEvent): Promise<PlannedEvent> {
		return firstValueFrom(this.http.put<PlannedEvent>(`${environment.backendUrl}/events/${id}`, eventData));
	}
}
