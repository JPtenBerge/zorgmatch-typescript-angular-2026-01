import { Directive, ElementRef, HostListener, inject, input, output } from '@angular/core';

export interface SelectionChange<T> {
	selected: boolean;
	subject: T;
}

@Directive({ selector: '[dpSelectable]' })
export class SelectableDirective<T> {
	public subject = input.required<T>({ alias: 'dpSelectable' });
	public selectionChange = output<SelectionChange<T>>();
	private el = inject(ElementRef);
	private classList = (this.el.nativeElement as HTMLElement).classList;
	public selected = false;

	constructor() {
		this.updateSelected();
	}

	@HostListener('mousedown')
	mouseDown() {
		this.toggle();
	}

	@HostListener('mouseenter', ['$event'])
	mouseEnter(ev: MouseEvent) {
		if (ev.buttons === 1) {
			this.toggle();
		}
	}

	private toggle() {
		this.selected = !this.selected;
		this.updateSelected();
		this.emitSelectionChange();
	}

	private updateSelected() {
		if (this.selected) {
			this.classList.remove('dp-unselected');
			this.classList.add('dp-selected');
		} else {
			this.classList.remove('dp-selected');
			this.classList.add('dp-unselected');
		}
	}

	private emitSelectionChange() {
		this.selectionChange.emit({
			selected: this.selected,
			subject: this.subject(),
		});
	}
}
