import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, Subscription, takeUntil } from 'rxjs';

@Component({
	selector: 'app-obs-autocompleter',
	templateUrl: './obs-autocompleter.html',
	imports: [ReactiveFormsModule],
})
export class ObsAutocompleter implements OnInit {
  destroyRef = inject(DestroyRef);

	query = new FormControl<string>('');
	subscription!: Subscription;

	ngOnInit() {
		this.subscription = this.query.valueChanges
			.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
			.subscribe(x => this.autocomplete());

		// toSignal()
	}

	// ngOnDestroy() {
	// 	this.subscription.unsubscribe();
	// }

	autocomplete() {
		console.log('Autocompleting!', this.query.value);
	}
}

/* learning curve:

1. Observables/Subject/... leren kennen
2. meestgebruikte operators leren kennen
3. geavanceerde operators leren kennen (switchMap, mergeMap)
4. principes   nooit .subscribe() in een component   nooit .subscribe() in een .subscribe()

*/
