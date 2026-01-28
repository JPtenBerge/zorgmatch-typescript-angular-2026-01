import { Contact } from '../contacts/models/contact';

export interface PlannedEvent {
	id: number;
	name: string;
	invitees: Contact[];
}
