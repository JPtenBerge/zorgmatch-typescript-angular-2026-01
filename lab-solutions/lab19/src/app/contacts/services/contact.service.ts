import { inject, Injectable } from '@angular/core';
import { assertArray, assertIsContact, Contact } from '../models/contact';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom, map, Observable, pipe, UnaryFunction } from 'rxjs';

const CONTACT_API = `${environment.backendUrl}/contacts`;

@Injectable({ providedIn: 'root' })
export class ContactService {
	private http = inject(HttpClient);

	async getAll(): Promise<Contact[]> {
		return firstValueFrom(this.http.get<unknown>(CONTACT_API).pipe(assertMany(assertIsContact)));
	}

	async create(contactData: Omit<Contact, 'id'>): Promise<Contact> {
		return firstValueFrom(this.http.post<unknown>(CONTACT_API, contactData).pipe(assert(assertIsContact)));
	}

	async update({ id, ...contactData }: Contact): Promise<Contact> {
		return firstValueFrom(this.http.put<unknown>(`${CONTACT_API}/${id}`, contactData).pipe(assert(assertIsContact)));
	}

	async delete(id: number): Promise<void> {
		return firstValueFrom(this.http.delete<void>(`${CONTACT_API}/${id}`));
	}
}

function assert<T>(assertionFn: (input: unknown) => asserts input is T): UnaryFunction<Observable<unknown>, Observable<T>> {
	return pipe(
		map(item => {
			assertionFn(item);
			return item;
		}),
	);
}

function assertMany<T>(assertionFn: (input: unknown) => asserts input is T): UnaryFunction<Observable<unknown>, Observable<T[]>> {
	return pipe(
		map(items => {
			assertArray(items);
			return items.map(item => {
				assertionFn(item);
				return item;
			});
		}),
	);
}
