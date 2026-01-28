import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { Contact } from './models/contact';
import { ContactNamePipe } from './pipes/contact-name.pipe';
import { form, Field, required, minLength, pattern } from '@angular/forms/signals';

@Component({
	selector: 'app-root',
	imports: [ContactNamePipe, Field],
	templateUrl: './app.html',
	styleUrl: './app.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	contacts = signal<Contact[]>([
		{ id: 4, firstName: 'Sam', surname: 'Smith', email: 'sam.smith@music.com', color: '#ffffff' },
		{ id: 8, firstName: 'Frank', surname: 'Muscles', email: 'frank@muscles.com', color: '#ffffff' },
		{ id: 15, firstName: 'Eddy', surname: 'Valentino', email: 'eddy@valfam.co.uk', color: '#ffffff' },
	]);
	nrOfContacts = computed(() => this.contacts().length);

	newContact = signal<Contact>({ id: 0, firstName: '', surname: '', email: '', color: '#ffffff' });
	addContactForm = form(this.newContact, p => {
		required(p.firstName, { message: 'First name is required' });
		minLength(p.firstName, 2, { message: 'First name must be at least 2 characters long' });
		required(p.surname, { message: 'Surname is required' });
		minLength(p.surname, 2, { message: 'Surname must be at least 2 characters long' });
		required(p.email, { message: 'E-mail address is required' });
		pattern(p.email, /.+@.+\..+/, { message: 'E-mail address is not valid' });
	});
	editingContact = signal<Contact>({ id: 0, firstName: '', surname: '', email: '', color: '#ffffff' });
	editContactForm = form(this.editingContact);

	addContact(event: Event) {
		event.preventDefault();
		this.contacts.update(contacts => [...contacts, this.newContact()]);
		this.newContact.set({ id: 0, firstName: '', surname: '', email: '', color: '#ffffff' });
		this.addContactForm().reset();
	}

	editContact(contact: Contact) {
		this.editingContact.set(structuredClone(contact));
	}

	saveEdits(contact: Contact) {
		this.contacts.update(contacts => contacts.map(c => (c.id === contact.id ? this.editingContact() : c)));
		this.editingContact.set({ id: 0, firstName: '', surname: '', email: '', color: '#ffffff' });
	}

	deleteContact(contactToDelete: Contact) {
		this.contacts.update(contacts => contacts.filter(contact => contact !== contactToDelete));
	}

	setColor($event: Event, contact: Contact) {
		contact.color = ($event.target as HTMLInputElement).value;
	}
}
