import { Component, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

@Component({
	selector: 'app-validation-message',
	template: `
		@if (
			this.field()().errors().length > 0 &&
			((this.showOnDirty() && this.field()().dirty()) || (this.showOnTouched() && this.field()().touched()))
		) {
			<span>{{ this.field()().errors()[0].message }}</span>
		}
	`,
})
export class ValidationMessages<T, V extends string | number> {
	field = input.required<FieldTree<T, V>>();
	showOnDirty = input(false);
	showOnTouched = input(true);
}
