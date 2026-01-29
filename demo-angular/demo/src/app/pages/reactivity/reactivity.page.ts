import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, map, ReplaySubject, Subject } from 'rxjs';
import { ObsAutocompleter } from "../../components/obs-autocompleter/obs-autocompleter";

@Component({
	imports: [ObsAutocompleter],
	templateUrl: './reactivity.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactivityPage {
	ngOnInit() {
		// observable:
		// - stroom om vanaf te tappen met vertakkingen
		// - je kan .subscribe() om updates binnen te krijgen
		// - implementatie van observer/observable
		// - soorten observables:
		//   - Observable - read-only
		//   - Subject - writable
		//     - Subject<T> - lege init is prima
		//       - onthoudt niks
		//     - BehaviorSubject<T> - moet een waarde hebben
		//       - lijkt het meest op een signal
		//       - verschil: dezelfde waarde nog een keer
		//     - ReplaySubject<T> - geschiedenis

		console.log('subjecting!');

		let sub = new BehaviorSubject<number>(2);
		// sub.next(4);
		// sub.next(8);
		// sub.next(15);
		sub.pipe(map(x => x * 10)).subscribe(getal => console.log('getal:', getal));

		sub.next(16);

		setTimeout(() => {
			sub.next(23);
			sub.next(42);
		}, 3000);
	}
}
