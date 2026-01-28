import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Field, form } from '@angular/forms/signals';
import { Contact } from '../models/contact';
import { ContactNamePipe } from '../pipes/contact-name.pipe';

@Component({
	selector: 'dp-contact-list',
	templateUrl: './contact-list.component.html',
	imports: [Field, ContactNamePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactList {
	contacts = input.required<Contact[]>();
	edit = output<Contact>();
	delete = output<Contact>();

	editingContact = signal<Contact>({ id: 0, firstName: '', surname: '', email: '', color: '#ffffff' });
	editContactForm = form(this.editingContact);

	editContact(contact: Contact) {
		this.editingContact.set(structuredClone(contact));
	}

	saveEdits() {
		this.edit.emit(this.editingContact());
		this.editingContact.set({ id: 0, firstName: '', surname: '', email: '', color: '#ffffff' });
	}

	deleteContact(contactToDelete: Contact) {
		this.delete.emit(contactToDelete);
	}

	setColor($event: Event, contact: Contact) {
		contact.color = ($event.target as HTMLInputElement).value;
	}
}
