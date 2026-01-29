import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactService } from '../services/contact.service';

@Component({
	imports: [ContactListComponent, ContactFormComponent],
	templateUrl: './contacts-page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsPage implements OnInit {
	private contactService = inject(ContactService);

	contacts = signal<Contact[]>([]);
	nrOfContacts = computed(() => this.contacts().length);

	ngOnInit() {
		this.contactService.getAll().then(contacts => {
			this.contacts.set(contacts);
		});
	}

	addContact(contact: Contact) {
		this.contactService.create(contact).then(updatedContact => {
			this.contacts.update(contacts => [...contacts, updatedContact]);
		});
	}

	editContact(contact: Contact) {
		this.contactService.update(contact).then(updatedContact => {
			this.contacts.update(contacts => contacts.map(c => (c.id === contact.id ? updatedContact : c)));
		});
	}

	deleteContact(contactToDelete: Contact) {
		this.contactService.delete(contactToDelete.id).then(() => {
			this.contacts.update(contacts => contacts.filter(contact => contact !== contactToDelete));
		});
	}
}
