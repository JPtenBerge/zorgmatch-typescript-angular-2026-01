import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject, input } from '@angular/core';

@Component({
	selector: 'app-car-viewer',
	imports: [],
	template: `
		<ul>
			@for (car of cars(); track $index) {
				<li>CV: {{ getDisplayValue(car) }}</li>
			}
		</ul>
		<button class="btn btn-secondary" (click)="addCar()">CV add car</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarViewer implements DoCheck {
	cdr = inject(ChangeDetectorRef);

	readonly cars = input.required<{ make: string; model: string }[]>();

	ngDoCheck() {
		if (this.cars().length % 5 === 0) {
			this.cdr.markForCheck();
		}
	}

    ngOnInit() {
        this.cars()[0].make += 'q';
    }

	addCar() {
		this.cars().push({ make: 'Tesla', model: 'Model S' });
		// this.cars = [...this.cars, { make: 'Tesla', model: 'Model S' }];
	}

    getDisplayValue(car: { make: string; model: string }) {
        car.make += 'o';
        return `gewoon: ${car.make} ${car.model}`;
    }
}
