import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarViewer } from './car-viewer/car-viewer';

@Component({
	selector: 'app-change-detection',
	imports: [CarViewer],
	templateUrl: './change-detection.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetectionPage {
	cars = [
		{ make: 'Tesla', model: 'Model Y' },
		{ make: 'Peugeot', model: '206' },
		{ make: 'Cupra', model: 'Born' },
	];

	addCar() {
		this.cars.push({ make: 'Tesla', model: 'Model S' });
		// this.cars = [...this.cars, { make: 'Tesla', model: 'Model S' }];
	}
}
