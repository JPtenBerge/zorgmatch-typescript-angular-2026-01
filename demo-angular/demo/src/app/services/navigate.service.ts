import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigateService {
	next<T>(data: T[], currentIndex: number | null) {
        console.log('nav next');
		if (currentIndex !== null) {
			return (currentIndex + 1) % data.length;
		}

		return 0;
	}

	previous() {

	}

	dinges() {
		
	}
}
