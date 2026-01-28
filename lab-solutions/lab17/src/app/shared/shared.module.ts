import { NgModule } from '@angular/core';
import { Menu } from './menu/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
	declarations: [Menu],
	exports: [Menu],
	imports: [RouterLink, RouterLinkActive],
})
export class SharedModule {}
