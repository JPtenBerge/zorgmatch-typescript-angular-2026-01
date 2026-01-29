import { Locator } from '@playwright/test';

export class ContactFormPageObject {
	constructor(protected host: Locator) {}

	async enter(value: { firstName: string; surname: string; email: string }) {
		await this.enterFirstName(value.firstName);
		await this.enterSurname(value.surname);
		await this.enterEmail(value.email);
	}

	async enterFirstName(value: string) {
		const firstName = this.host.getByRole('textbox', { name: 'First name' });
		await firstName.fill(value);
	}

	async enterSurname(value: string) {
		const firstName = this.host.getByRole('textbox', { name: 'Surname' });
		await firstName.fill(value);
	}

	async enterEmail(value: string) {
		const firstName = this.host.getByRole('textbox', { name: 'E-mail address' });
		await firstName.fill(value);
	}

	get submitButton() {
		return this.host.getByRole('button', { name: 'Add' });
	}
}
