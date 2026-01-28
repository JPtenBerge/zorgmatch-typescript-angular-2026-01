export interface Contact {
	id: number;
	firstName: string;
	surname: string;
	email: string;
	color?: string;
}

export function createContact(overrides?: Partial<Contact>): Contact {
	return {
		id: -1,
		email: '',
		firstName: '',
		surname: '',
		...overrides,
	};
}

function validateIsContact(maybeContact: unknown): maybeContact is Contact {
	return Boolean(
		maybeContact &&
		typeof maybeContact === 'object' &&
		'id' in maybeContact &&
		typeof maybeContact.id === 'number' &&
		'firstName' in maybeContact &&
		typeof maybeContact.firstName === 'string' &&
		'surname' in maybeContact &&
		typeof maybeContact.surname === 'string' &&
		'email' in maybeContact &&
		typeof maybeContact.email === 'string' &&
		(!('color' in maybeContact) || typeof maybeContact.color === 'string'),
	);
}

export function assertIsContact(betterBeContact: unknown): asserts betterBeContact is Contact {
	if (!validateIsContact(betterBeContact)) {
		throw new Error(`Not a valid contact: ${JSON.stringify(betterBeContact)}`);
	}
}

export function assertArray(betterBeArray: unknown): asserts betterBeArray is unknown[] {
	if (!Array.isArray(betterBeArray)) {
		throw new Error(`Not an array ${betterBeArray}`);
	}
}
