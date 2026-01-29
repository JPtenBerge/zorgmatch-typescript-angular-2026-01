import { Contact } from '../models/contact';
import { ContactNamePipe } from './contact-name.pipe';

describe('Pipe: ContactName', () => {
	let sut: ContactNamePipe;
	beforeEach(() => {
		sut = new ContactNamePipe();
	});

	it('should concatenate a contact name', () => {
		const input: Contact = {
			id: 65,
			email: 'john@doe.com',
			firstName: 'John',
			surname: 'Doe',
		};
		expect(sut.transform(input)).toBe('John Doe');
	});

	it('should provide an empty string for an undefined contact', () => {
		expect(sut.transform(undefined)).toBe('');
	});

	it('should not add a space of the first name is empty', () => {
		const input: Contact = {
			id: 65,
			email: 'john@doe.com',
			firstName: '',
			surname: 'Doe',
		};
		expect(sut.transform(input)).toBe('Doe');
	});

	it('should not add a space if the surname is empty', () => {
		const input: Contact = {
			id: 65,
			email: 'john@doe.com',
			firstName: 'John',
			surname: '',
		};
		expect(sut.transform(input)).toBe('John');
	});
});
