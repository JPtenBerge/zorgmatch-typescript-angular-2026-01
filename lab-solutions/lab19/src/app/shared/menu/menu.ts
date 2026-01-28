import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'dp-menu',
	standalone: false,
	templateUrl: './menu.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {}
