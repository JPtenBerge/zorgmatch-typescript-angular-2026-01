import { Page } from '@playwright/test';
import { ContactFormPageObject } from './contact-form.po';
import { ContactListPageObject } from './contact-list.po';

export class ContactsPage {
	constructor(private page: Page) {}

	async navigateTo() {
		return await this.page.goto('/');
	}

	get contactForm() {
		return new ContactFormPageObject(this.page.locator('dp-contact-form'));
	}
	get contactList() {
		return new ContactListPageObject(this.page.locator('dp-contact-list'));
	}
}
