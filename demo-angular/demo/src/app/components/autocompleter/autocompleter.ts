import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormField } from '@angular/forms/signals';

@Component({
	selector: 'app-autocompleter',
	templateUrl: './autocompleter.html',
	imports: [JsonPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Autocompleter<T extends {}> {
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
		if (this.activeSuggestionIndex !== null) {
			this.activeSuggestionIndex = (this.activeSuggestionIndex + 1) % this.suggestions().length;
			return;
		}

		this.activeSuggestionIndex = 0;
	}

	handleSelect() {
		if (this.activeSuggestionIndex === null) return;
		this.selectItem.emit(this.suggestions()[this.activeSuggestionIndex]);
	}
}
