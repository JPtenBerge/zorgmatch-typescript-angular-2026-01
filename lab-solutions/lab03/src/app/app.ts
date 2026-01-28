import { Component, ChangeDetectionStrategy } from '@angular/core';
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
	contacts: Contact[] = [
		{ id: 4, firstName: 'Sam', surname: 'Smith', email: 'sam.smith@music.com', color: '#ffffff' },
		{ id: 8, firstName: 'Frank', surname: 'Muscles', email: 'frank@muscles.com', color: '#ffffff' },
		{ id: 15, firstName: 'Eddy', surname: 'Valentino', email: 'eddy@valfam.co.uk', color: '#ffffff' },
	];

	deleteContact(contactToDelete: Contact) {
		this.contacts.splice(this.contacts.indexOf(contactToDelete), 1);
	}

	setColor($event: Event, contact: Contact) {
		contact.color = ($event.target as HTMLInputElement).value;
	}
}
