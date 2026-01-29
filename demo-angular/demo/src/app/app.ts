import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { ValidationMessages } from './validation-message';
import { Life } from './life';
import { Autocompleter } from './components/autocompleter/autocompleter';
import { Framework } from './entities/framework';
import { HttpClient, httpResource } from '@angular/common/http';

@Component({
	selector: 'app-root',
	imports: [JsonPipe, FormField, ValidationMessages, Life, Autocompleter],
	templateUrl: './app.html',
	styleUrl: './app.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	autocompleter = viewChild(Autocompleter);

	showLife = false;

	name = 'Indie';

	properName = signal('Indie');

	counter = signal(42);
	doubled = computed(() => (this.counter() > 50 ? 15 : this.counter() * 2));

	addFrameworkValue = signal({
		name: '',
		logoUrl: '',
		grade: 2,
	});
	addFrameworkForm = form(this.addFrameworkValue, p => {
		required(p.name, { message: 'Vul in aub' });
		required(p.logoUrl, { message: 'Vul in aub' });
		required(p.grade, { message: 'Vul in aub' });
		pattern(p.name, /^[A-Z][a-zA-Z]*$/, { message: 'Alleen letters graag. En een hoofdletter aant begin.' });
	});

	fancyFrameworks = httpResource<Framework[]>(() => `http://localhost:3000/frameworks`);

	aantalFramework = computed(() => this.fancyFrameworks.value()!.length);

	addFramework() {
		this.addFrameworkForm().reset();
		// this.addFrameworkValue.set({ })

		console.log('werkt!', this.addFrameworkValue());
		// this.frameworks.push({ id: 0, ...this.addFrameworkValue() });
	}

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
