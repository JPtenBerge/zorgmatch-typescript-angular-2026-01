import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Contact } from './models/contact';
import { ContactForm } from './contact-form/contact-form.component';
import { ContactList } from './contact-list/contact-list.component';
import { ContactService } from './services/contact.service';

@Component({
	selector: 'dp-root',
	imports: [ContactList, ContactForm],
	templateUrl: './app.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
	private contactService = inject(ContactService);

	contacts = signal<Contact[]>([]);
	nrOfContacts = computed(() => this.contacts().length);

	ngOnInit() {
		this.contactService.getAll().then(contacts => {
			this.contacts.set(contacts);
		});
	}

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
