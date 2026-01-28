import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { ValidationMessages } from "./validation-message";
import { Life } from './life';
import { Autocompleter } from './components/autocompleter/autocompleter';

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
	doubled = computed(() => {
		if (this.counter() > 50) {
			return 15;
		}

		return this.counter() * 2;
	});

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

	addFramework() {

		this.addFrameworkForm().reset();
		// this.addFrameworkValue.set({ })

		console.log('werkt!', this.addFrameworkValue());
		this.frameworks.push({ id: 0, ...this.addFrameworkValue() });
	}

	frameworks: Framework[] = [
		{
			id: 4,
			name: 'Angular',
			logoUrl:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd585tldpucybw.cloudfront.net%2Fsfimages%2Fdefault-source%2Fblogs%2F2024%2F2024-04%2Fangular-logo.png%3Fsfvrsn%3D543455a3_1&f=1&nofb=1&ipt=ea966f23409b23d3976ff4b26e816da342f74af517995f6e8351f63e6c3456d4',
			grade: 8.5,
		},
		{
			id: 8,
			name: 'React',
			logoUrl:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F15%2FReact-Logo-PNG.png&f=1&ipt=c9c495c40c55fa88c595c180e4973514c8a305e874f4946c718f3dbdbccce9da',
			grade: 4,
		},
		{
			id: 15,
			name: 'Svelte',
			logoUrl:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fswiftlet.co.th%2Fwp-content%2Fuploads%2F2022%2F11%2F1200px-Svelte_Logo.svg.png&f=1&nofb=1&ipt=1df9f2771e816475a2ead954b8a2a016454ea7e7e23daddd2097264bc6dcfa63',
			grade: 9,
		},
	];

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

interface Framework {
	id: number;
	name: string;
	logoUrl: string;
	grade: number;
}
