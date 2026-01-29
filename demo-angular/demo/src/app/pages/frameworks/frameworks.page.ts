import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { Framework } from '../../entities/framework';
import { ValidationMessages } from '../../validation-message';

@Component({
	imports: [ValidationMessages, FormField, JsonPipe],
	templateUrl: './frameworks.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameworksPage {
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

	addFramework() {
		this.addFrameworkForm().reset();
		// this.addFrameworkValue.set({ })

		console.log('werkt!', this.addFrameworkValue());
		// this.frameworks.push({ id: 0, ...this.addFrameworkValue() });
	}
}
