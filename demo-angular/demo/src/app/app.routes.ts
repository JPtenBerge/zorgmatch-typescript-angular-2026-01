import { Routes } from '@angular/router';
import { FrameworksPage } from './pages/frameworks/frameworks.page';
import { ZooiPage } from './pages/zooi/zooi.page';
import { ReactivityPage } from './pages/reactivity/reactivity.page';
import { ChangeDetectionPage } from './pages/change-detection/change-detection.page';

export const routes: Routes = [
	{ path: 'frameworks', component: FrameworksPage },
	{ path: 'zooi/:id', component: ZooiPage },
	{ path: 'reactivity', component: ReactivityPage },
	{ path: 'change-detection', component: ChangeDetectionPage },
	{ path: '', redirectTo: '/frameworks', pathMatch: 'full' },
	// ...adminRoutes
];
