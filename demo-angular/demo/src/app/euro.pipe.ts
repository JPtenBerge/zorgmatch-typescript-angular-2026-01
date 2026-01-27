import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'euro' })
export class EuroPipe implements PipeTransform {
	transform(value: number) {
		let [wholes, decimals] = value.toString().split('.');

		return `€ ${wholes},${decimals.padEnd(2, '0')}`;
	}
}
