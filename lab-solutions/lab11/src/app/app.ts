import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './menu/menu';

@Component({
	selector: 'dp-root',
	imports: [RouterOutlet, Menu],
	templateUrl: './app.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
