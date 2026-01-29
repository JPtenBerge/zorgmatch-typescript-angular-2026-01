import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mocked } from 'vitest';

import { Autocompleter } from './autocompleter';
import { NavigateService } from '../../services/navigate.service';

interface Product {
	title: string;
}

describe('Component: Autocompleter', () => {
	let sut: Autocompleter<Product>;
	let fixture: ComponentFixture<Autocompleter<Product>>;
	let productData: Product[];
	let navigateServiceMock: Mocked<NavigateService>;

	beforeEach(() => {
		productData = [{ title: 'Hairbrush' }, { title: 'Laptop' }, { title: 'Mouse' }];
		navigateServiceMock = { next: vi.fn().mockReturnValue(18) };

		TestBed.configureTestingModule({
			providers: [{ provide: NavigateService, useValue: navigateServiceMock }],
		});
		fixture = TestBed.createComponent(Autocompleter<Product>);
		sut = fixture.componentInstance;
		fixture.componentRef.setInput('data', productData);
	});

	it('autocompletes a list of suggestions', async () => {
		sut.query.set('o');
		expect(sut.suggestions()).toEqual([{ title: 'Laptop' }, { title: 'Mouse' }]);
	});

	it(`uses ${NavigateService.name} for nexting to the next suggestions`, () => {
		sut.query.set('o');
		sut.next();
		expect(navigateServiceMock.next).toHaveBeenCalled();
		expect(sut.activeSuggestionIndex).toBe(18);
	});
});
