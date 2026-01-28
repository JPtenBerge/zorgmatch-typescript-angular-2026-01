import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	contacts = [
		{ id: 4, firstName: 'Sam', surname: 'Smith', email: 'sam.smith@music.com', color: '#ffffff' },
		{ id: 8, firstName: 'Frank', surname: 'Muscles', email: 'frank@muscles.com', color: '#ffffff' },
		{ id: 15, firstName: 'Eddy', surname: 'Valentino', email: 'eddy@valfam.co.uk', color: '#ffffff' },
	];

	deleteContact(contactToDelete: any) {
		this.contacts.splice(this.contacts.indexOf(contactToDelete), 1);
	}

	setColor($event: any, contact: any) {
		contact.color = $event.target.value;
	}
}
