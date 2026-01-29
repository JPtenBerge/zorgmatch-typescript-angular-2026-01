import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NavigateService } from '../../services/navigate.service';

@Component({
	selector: 'app-autocompleter',
	templateUrl: './autocompleter.html',
	imports: [JsonPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Autocompleter<T extends {}> {
	navigateService = inject(NavigateService);

	query = signal('hallo');
	data = input.required<T[]>();
	selectItem = output<T>();
	activeSuggestionIndex: number | null = null;

	suggestions = computed<T[]>(() => {
		let suggestions: T[] = [];

		for (let item of this.data()) {
			let props = Object.keys(item) as (keyof T)[];

			for (let prop of props.filter(x => typeof item[x] === 'string')) {
				let value = item[prop] as string;
				if (value.includes(this.query())) {
					suggestions.push({ isHighlighted: false, ...item });
					break;
				}
			}
		}

		return suggestions;
	});

	next() {
		this.activeSuggestionIndex = this.navigateService.next(this.suggestions(), this.activeSuggestionIndex);
	}

	handleSelect() {
		if (this.activeSuggestionIndex === null) return;
		this.selectItem.emit(this.suggestions()[this.activeSuggestionIndex]);
	}
}
