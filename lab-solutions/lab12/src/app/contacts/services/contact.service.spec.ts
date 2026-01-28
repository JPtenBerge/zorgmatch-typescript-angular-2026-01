import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Mocked } from 'vitest';

import { environment } from '../../../environments/environment';
import { ContactService } from './contact.service';
import { of } from 'rxjs';
import { Contact } from '../models/contact';

describe('Service: ContactService', () => {
	let sut: ContactService;
	let httpMock: Mocked<HttpClient>;
	const { backendUrl } = environment;
	const endpoint = `${backendUrl}/contacts`;

	beforeEach(() => {
		httpMock = {
			get: vi.fn().mockReturnValue(of([])),
			post: vi.fn(),
			put: vi.fn().mockReturnValue(of({})),
			delete: vi.fn(),
		} as unknown as Mocked<HttpClient>;
		TestBed.configureTestingModule({
			providers: [{ provide: HttpClient, useValue: httpMock }],
		});
		sut = TestBed.inject(ContactService);
	});

	it('gets all contacts', async () => {
		await sut.getAll();
		expect(httpMock.get).toHaveBeenCalledWith(endpoint);
	});

	it('updates a contact', async () => {
		const contact: Contact = { id: 4, firstName: 'John', surname: 'Doe', email: 'john@doe.com' };
		await sut.update(contact);
		expect(httpMock.put).toHaveBeenCalledWith(`${endpoint}/4`, expect.any(Object));
	});
});
