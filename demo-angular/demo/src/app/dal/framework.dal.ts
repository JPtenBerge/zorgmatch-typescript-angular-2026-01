import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Framework } from '../entities/framework';

@Injectable({ providedIn: 'root' })
export class FrameworkDal {
	private http = inject(HttpClient);

	getAll() {
		return this.http.get<Framework[]>('http://localhost:3000/frameworks');
	}

	add(framework: Omit<Framework, 'id'>) {
		return this.http.post<Framework>('http://localhost:3000/frameworks', framework);
	}
}
