import { Locator } from '@playwright/test';

export abstract class PageObject {
	constructor(protected host: Locator) {}
}
