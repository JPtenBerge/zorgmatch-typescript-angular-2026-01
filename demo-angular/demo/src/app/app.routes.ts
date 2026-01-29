import { Routes } from '@angular/router';
import { FrameworksPage } from './pages/frameworks/frameworks.page';
import { ZooiPage } from './pages/zooi/zooi.page';
import { ReactivityPage } from './pages/reactivity/reactivity.page';

export const routes: Routes = [
	{ path: 'frameworks', component: FrameworksPage },
	{ path: 'zooi/:id', component: ZooiPage },
	{ path: 'reactivity', component: ReactivityPage },
	{ path: '', redirectTo: '/frameworks', pathMatch: 'full' },
	// ...adminRoutes
];
