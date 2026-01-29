import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'dp-menu',
	imports: [RouterLink, RouterLinkActive],
	templateUrl: './menu.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {}
