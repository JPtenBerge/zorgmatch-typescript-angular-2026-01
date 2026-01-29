import { Contact } from '../contacts/models/contact';

export interface PlannedEvent {
	id: number;
	name: string;
	start: Date;
	end: Date;
	invitees: Contact[];
}

export function createPlannedEvent(overrides?: Partial<PlannedEvent>): PlannedEvent {
	const now = new Date();
	const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
	const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
	end.setDate(now.getDate() + 1);
	return {
		id: -1,
		start,
		end,
		invitees: [],
		name: '',
		...overrides,
	};
}
