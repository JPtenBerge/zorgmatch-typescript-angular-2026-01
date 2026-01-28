import { inject, Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

const CONTACT_API = `${environment.backendUrl}/contacts`;

@Injectable({ providedIn: 'root' })
export class ContactService {
	private http = inject(HttpClient);

	async getAll(): Promise<Contact[]> {
		return firstValueFrom(this.http.get<Contact[]>(CONTACT_API));
	}

	async create(contactData: Omit<Contact, 'id'>): Promise<Contact> {
		return firstValueFrom(this.http.post<Contact>(CONTACT_API, contactData));
	}

	async update({ id, ...contactData }: Contact): Promise<Contact> {
		return firstValueFrom(this.http.put<Contact>(`${CONTACT_API}/${id}`, contactData));
	}

	async delete(id: number): Promise<void> {
		return firstValueFrom(this.http.delete<void>(`${CONTACT_API}/${id}`));
	}
}
