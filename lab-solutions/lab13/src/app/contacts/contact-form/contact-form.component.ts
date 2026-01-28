import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Field, form, minLength, pattern, required } from '@angular/forms/signals';
import { Contact, createContact } from '../models/contact';

@Component({
	selector: 'dp-contact-form',
	templateUrl: './contact-form.component.html',
	imports: [Field],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
	add = output<Contact>();

	newContact = signal<Contact>(createContact());
	addContactForm = form(this.newContact, p => {
		required(p.firstName, { message: 'First name is required' });
		minLength(p.firstName, 2, { message: 'First name must be at least 2 characters long' });
		required(p.surname, { message: 'Surname is required' });
		minLength(p.surname, 2, { message: 'Surname must be at least 2 characters long' });
		required(p.email, { message: 'E-mail address is required' });
		pattern(p.email, /.+@.+\..+/, { message: 'E-mail address is not valid' });
	});

	addContact(event: Event) {
		event.preventDefault();
		this.add.emit({ ...this.newContact() });
		this.newContact.set(createContact());
		this.addContactForm().reset();
	}
}
