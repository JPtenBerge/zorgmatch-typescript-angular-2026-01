import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	imports: [],
	templateUrl: './reactivity.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactivityPage {}
