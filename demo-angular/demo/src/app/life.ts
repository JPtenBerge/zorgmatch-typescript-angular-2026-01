import { Component, input } from '@angular/core';

@Component({
	selector: 'app-life',
	template: `
		lifehacks
	`,
})
export class Life {
	intervalId!: number;

	message = input<string>();

	constructor() {
		// dependency injection / template-wijzigingen wil maken
		console.log('[life] constructor', this.message());
	}

	ngOnInit() {
		// meeste initializatiewerk
		console.log('[life] OnInit', this.message());

		this.intervalId = setInterval(() => {
			console.log('hoi vanuit interval');
		}, 1000);
	}

	ngOnDestroy() {
		console.log('[life] OnDestroy');

		clearInterval(this.intervalId);

		// formulierdata van gebruiker wegschrijven

		// opruimen
		// - caches
		// - camera API
		// - bluetooth API
		// - addEventListener()  removeEventListener()
		// - indexeddb
		// - timers
		// - unsubscriben als je dat nog niet doet op een andere manier
	}

	// ngOnChanges ngAfterViewChecked ngAfterViewInit ngDoCheck ngAfterContentCheck ngAfterContentInit
}
