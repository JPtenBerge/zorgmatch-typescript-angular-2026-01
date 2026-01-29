import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contact } from './models/contact';
import { ContactNamePipe } from './pipes/contact-name.pipe';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, ContactNamePipe],
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

	deleteContact(contactToDelete: Contact) {
		this.contacts.update(contacts => contacts.filter(contact => contact !== contactToDelete));
	}

	setColor($event: Event, contact: Contact) {
		contact.color = ($event.target as HTMLInputElement).value;
	}
}
