import { computed, inject, Injectable, signal } from '@angular/core';
import { Framework } from '../entities/framework';
import { FrameworkDal } from '../dal/framework.dal';

@Injectable({ providedIn: 'root' })
export class FrameworkStore {
	private frameworkDal = inject(FrameworkDal);
	private isLoading = true;

	private allFrameworksWritable = signal<Framework[]>([]);
	allFrameworks = this.allFrameworksWritable.asReadonly();

	constructor() {
		this.frameworkDal.getAll().subscribe(frameworks => {
			this.allFrameworksWritable.set(frameworks);
			this.isLoading = false;
		});

        // multi-user   (.NET wrapper WebSocket - SignalR)
        // new WebSocket('').addEventListener('message', () => {})
	}

	get(id: number) {
		return computed(() => /* check isLoading */ this.allFrameworks().find(x => x.id === id));
	}

	add(framework: Omit<Framework, 'id'>) {
		// if isloading then error/rekening mee houden

		this.frameworkDal.add(framework).subscribe(updatedFramework => {
			this.allFrameworksWritable.update(frameworks => [...frameworks, updatedFramework]);
		});
	}
}
