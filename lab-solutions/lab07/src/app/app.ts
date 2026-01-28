import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Contact } from './models/contact';
import { ContactForm } from './contact-form/contact-form.component';
import { ContactList } from './contact-list/contact-list.component';

@Component({
	selector: 'dp-root',
	imports: [ContactList, ContactForm],
	templateUrl: './app.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	contacts = signal<Contact[]>([
		{ id: 4, firstName: 'Sam', surname: 'Smith', email: 'sam.smith@music.com', color: '#ffffff' },
		{ id: 8, firstName: 'Frank', surname: 'Muscles', email: 'frank@muscles.com', color: '#ffffff' },
		{ id: 15, firstName: 'Eddy', surname: 'Valentino', email: 'eddy@valfam.co.uk', color: '#ffffff' },
	]);
	nrOfContacts = computed(() => this.contacts().length);

	addContact(contact: Contact) {
		contact.id = Math.max(0, ...this.contacts().map(c => c.id)) + 1;
		this.contacts.update(contacts => [...contacts, contact]);
	}

	editContact(contact: Contact) {
		this.contacts.update(contacts => contacts.map(c => (c.id === contact.id ? contact : c)));
	}

	deleteContact(contactToDelete: Contact) {
		this.contacts.update(contacts => contacts.filter(contact => contact !== contactToDelete));
	}
}
