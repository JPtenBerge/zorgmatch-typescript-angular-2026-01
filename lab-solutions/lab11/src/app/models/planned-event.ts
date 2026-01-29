import { Contact } from './contact';

export interface PlannedEvent {
	id: number;
	name: string;
	invitees: Contact[];
}
