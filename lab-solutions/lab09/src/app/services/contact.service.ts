import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({ providedIn: 'root' })
export class ContactService {
	async getAll(): Promise<Contact[]> {
		return [
			{ id: 4, firstName: 'Sam', surname: 'Smith', email: 'sam.smith@music.com', color: '#ffffff' },
			{ id: 8, firstName: 'Frank', surname: 'Muscles', email: 'frank@muscles.com', color: '#ffffff' },
			{ id: 15, firstName: 'Eddy', surname: 'Valentino', email: 'eddy@valfam.co.uk', color: '#ffffff' },
		];
	}
}
