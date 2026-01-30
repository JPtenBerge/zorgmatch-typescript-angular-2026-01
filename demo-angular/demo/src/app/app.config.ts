import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, provideCheckNoChangesConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideCheckNoChangesConfig({ exhaustive: true }),
		provideRouter(routes, withComponentInputBinding()),
	],
};
