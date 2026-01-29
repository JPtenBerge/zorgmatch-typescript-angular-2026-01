import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact';

@Pipe({ name: 'contactName' })
export class ContactNamePipe implements PipeTransform {
	transform({ firstName, surname }: Contact): string {
		return `${firstName} ${surname}`;
	}
}
