import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, input, signal, viewChild } from '@angular/core';

import { Autocompleter } from '../../components/autocompleter/autocompleter';
import { Framework } from '../../entities/framework';
import { Life } from '../../life';

@Component({
	imports: [Autocompleter, Life],
	templateUrl: './zooi.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZooiPage {
	id = input.required<string>();

	autocompleter = viewChild(Autocompleter);
	showLife = false;
	name = 'Indie';
	properName = signal('Indie');

	counter = signal(42);
	doubled = computed(() => (this.counter() > 50 ? 15 : this.counter() * 2));

	fancyFrameworks = httpResource<Framework[]>(() => `http://localhost:3000/frameworks`);

	changeName() {
		console.log(setTimeout);
		setTimeout(() => {
			this.name += ' verlate JP';
			// this.properName.set('verlate JP');
			// this.counter.update(prev => prev + 10);
		}, 2000);
	}

	handleItemSelect(framework: Framework) {
		console.log('hey wow er is een item geselecteerd!', framework);
	}
}
