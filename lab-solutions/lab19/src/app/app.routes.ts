import { Routes } from '@angular/router';
import { ContactsPage } from './contacts/contacts-page/contacts-page';
import { EventsPage } from './events/events-page/events-page';
import { EditEventPage } from './events/edit-event-page/edit-event-page';

export const routes: Routes = [
	{ path: 'contacts', loadComponent: () => import('./contacts/contacts-page/contacts-page').then(m => m.ContactsPage) },
	{ path: 'events', loadComponent: () => import('./events/events-page/events-page').then(m => m.EventsPage) },
	{ path: 'events/edit/:id', component: EditEventPage },
	{ path: '', redirectTo: 'contacts', pathMatch: 'full' },
];
