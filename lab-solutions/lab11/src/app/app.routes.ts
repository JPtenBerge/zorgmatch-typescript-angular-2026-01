import { Routes } from '@angular/router';
import { ContactsPage } from './contacts-page/contacts-page';
import { EventsPage } from './events-page/events-page';
import { EditEventPage } from './edit-event-page/edit-event-page';

export const routes: Routes = [
	{ path: 'contacts', component: ContactsPage },
	{ path: 'events', component: EventsPage },
	{ path: 'events/edit/:id', component: EditEventPage },
	{ path: '', redirectTo: 'contacts', pathMatch: 'full' },
];
