import { test, expect } from '@playwright/test';
import { ContactsPage } from './po/contacts-page.po';

test.describe('contacts page', () => {
	let page: ContactsPage;

	test.beforeEach(async ({ page: p }) => {
		page = new ContactsPage(p);
		await page.navigateTo();
	});

	test.describe('add contact form', () => {
		test('should not allow submit at the start', async () => {
			await expect(page.contactForm.submitButton).toBeDisabled();
		});

		test('should allow submit when the contact is valid', async () => {
			const form = page.contactForm;
			await form.enterFirstName('James');
			await form.enterSurname('Bond');
			await form.enterEmail('james.bond@mi6.co.uk');
			await expect(page.contactForm.submitButton).not.toBeDisabled();
		});

		test('should not allow submit when the first name is missing', async () => {
			const form = page.contactForm;
			await form.enterFirstName('');
			await form.enterSurname('Bond');
			await form.enterEmail('james.bond@mi6.co.uk');
			await expect(page.contactForm.submitButton).toBeDisabled();
		});

		test('should not allow submit when the surname is missing', async () => {
			const form = page.contactForm;
			await form.enterFirstName('James');
			await form.enterSurname('');
			await form.enterEmail('james.bond@mi6.co.uk');
			await expect(page.contactForm.submitButton).toBeDisabled();
		});

		test('should not allow submit when the email is missing', async () => {
			const form = page.contactForm;
			await form.enterFirstName('James');
			await form.enterSurname('Bond');
			await form.enterEmail('');
			await expect(page.contactForm.submitButton).toBeDisabled();
		});

		test('should add the contact to the contact list when submitted', async () => {
			// Act
			await page.contactForm.enter({
				firstName: 'James',
				surname: 'Bond',
				email: 'james.bond@mi6.co.uk',
			});
			await page.contactForm.submitButton.click();

			// Assert
			await expect(page.contactList.contacts).toContainText('James Bond');
		});
	});
});
