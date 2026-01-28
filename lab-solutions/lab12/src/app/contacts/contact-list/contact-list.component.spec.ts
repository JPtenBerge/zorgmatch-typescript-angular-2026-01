import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from '../models/contact';
import { ContactList } from './contact-list.component';

describe('ContactList', () => {
	let component: ContactList;
	let element: HTMLElement;
	let fixture: ComponentFixture<ContactList>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ContactList],
		});

		fixture = TestBed.createComponent(ContactList);
		component = fixture.componentInstance;
		element = fixture.nativeElement;

		fixture.componentRef.setInput('contacts', []);
		fixture.detectChanges();
	});

	it('should show 2 contacts when 2 contacts are bound', () => {
		// Arrange
		fixture.componentRef.setInput('contacts', [
			{ id: 1, email: '', firstName: '', surname: '' },
			{ id: 3, email: '', firstName: '', surname: '' },
		]);

		// Act
		fixture.detectChanges();

		// Assert
		expect(element.querySelectorAll('tbody tr').length).toBe(2);
	});

	it('should format the name correctly', () => {
		// Arrange
		fixture.componentRef.setInput('contacts', [{ id: 1, firstName: 'James', surname: 'Bond', email: 'j@b.co.uk' }]);

		// Act
		fixture.detectChanges();

		// Assert
		const nameData = element.querySelector<HTMLElement>('tbody tr:first-child td:first-child')!;
		expect(nameData.textContent).toContain('James Bond');
	});

	describe('when editing a contact', () => {
		let firstNameInput: HTMLInputElement;
		let surnameInput: HTMLInputElement;
		let emailInput: HTMLInputElement;
		let row: HTMLTableRowElement;

		beforeEach(async () => {
			// Arrange
			fixture.componentRef.setInput('contacts', [
				{
					id: 1,
					firstName: 'James',
					surname: 'Bond',
					email: 'james.bond@mi6.co.uk',
				},
			]);
			fixture.detectChanges();
			row = element.querySelector<HTMLTableRowElement>('tbody tr:first-child')!;
			const editButton = row.querySelector<HTMLButtonElement>('.editButton')!;
			editButton.click();
			fixture.detectChanges();

			firstNameInput = row.querySelector<HTMLInputElement>('input[data-testid=firstName]')!;
			surnameInput = row.querySelector<HTMLInputElement>('input[data-testid=surname]')!;
			emailInput = row.querySelector<HTMLInputElement>('input[data-testid=email]')!;
		});

		it('should show edit inputs', async () => {
			expect(firstNameInput.value).toBe('James');
			expect(surnameInput.value).toBe('Bond');
			expect(emailInput.value).toBe('james.bond@mi6.co.uk');
		});

		it('should emit an "edit" event', () => {
			// Arrange
			let actualEdited: Contact | undefined;
			component.edit.subscribe(edited => {
				actualEdited = edited;
			});

			// Act
			row.querySelector<HTMLButtonElement>('.saveButton')!.click();
			fixture.detectChanges();

			// Assert
			expect(actualEdited).toEqual(component.contacts()[0]);
		});
	});

	describe('delete', () => {
		let row: HTMLTableRowElement;
		let contacts: Contact[];

		beforeEach(() => {
			// Arrange
			contacts = [
				{
					id: 0,
					firstName: 'James',
					surname: 'Bond',
					email: 'james.bond@mi6.co.uk',
				},
			];
			fixture.componentRef.setInput('contacts', contacts);
			fixture.detectChanges();
			row = element.querySelector<HTMLTableRowElement>('tbody tr:first-child')!;
		});

		it('should dispatch a "delete" event', () => {
			// Arrange
			let actualDeleted: Contact | undefined;
			component.delete.subscribe(deleted => {
				actualDeleted = deleted;
			});

			// Act
			row.querySelector<HTMLButtonElement>('.deleteButton')!.click();
			fixture.detectChanges();

			// Assert
			expect(actualDeleted).toBe(contacts[0]);
		});
	});

	describe('pick color', () => {
		let firstCell: HTMLTableCellElement;
		let colorInput: HTMLInputElement;

		beforeEach(() => {
			fixture.componentRef.setInput('contacts', [
				{
					id: 0,
					firstName: 'James',
					surname: 'Bond',
					email: 'james.bond@mi6.co.uk',
				},
			]);
			fixture.detectChanges();
			firstCell = element.querySelector<HTMLTableCellElement>('tbody tr:first-child td:first-child')!;
			colorInput = firstCell.querySelector<HTMLInputElement>('input[type=color]')!;
		});

		it("should set the background color of the row to the contact's color", () => {
			component.contacts()[0].color = '#ff0000';
			fixture.componentRef.setInput('contacts', [...component.contacts()]);
			fixture.detectChanges();
			expect(firstCell.style.backgroundColor).toEqual('rgb(255, 0, 0)');
		});

		it('should change the background when a color is picked for this contact', () => {
			colorInput.value = '#ff0000';
			colorInput.dispatchEvent(new Event('input'));
			fixture.detectChanges();
			expect(firstCell.style.backgroundColor).toEqual('rgb(255, 0, 0)');
		});
	});
});
