import { PageObject } from './page-object';

export class ContactListPageObject extends PageObject {
	contacts = this.host.getByRole('table');
}
