import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PlannedEvent } from '../planned-event';

@Injectable({ providedIn: 'root' })
export class EventService {
	private http = inject(HttpClient);

	getAll(): Observable<PlannedEvent[]> {
		return this.http.get<PlannedEvent[]>(`${environment.backendUrl}/events`);
	}

	search(query: { nameLike: string }): Observable<PlannedEvent[]> {
		const url = new URL(`${environment.backendUrl}/events`);
		url.searchParams.set('name_like', query.nameLike);
		return this.http.get<PlannedEvent[]>(url.href);
	}

	get(id: PlannedEvent['id']): Observable<PlannedEvent> {
		return this.http.get<PlannedEvent>(`${environment.backendUrl}/events/${id}`);
	}

	update({ id, ...eventData }: PlannedEvent): Observable<PlannedEvent> {
		return this.http.put<PlannedEvent>(`${environment.backendUrl}/events/${id}`, eventData);
	}
}
