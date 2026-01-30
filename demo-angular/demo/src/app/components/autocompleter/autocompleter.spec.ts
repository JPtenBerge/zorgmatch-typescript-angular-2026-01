import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Autocompleter } from './autocompleter';
import { signal } from '@angular/core';
import { NavigateService } from '../../services/navigate.service';
import { Mocked } from 'vitest';

interface Iets {
	title: string;
}

describe('Component: Autocompleter', () => {
	let sut: Autocompleter<Iets>;
	let fixture: ComponentFixture<Autocompleter<Iets>>;
	let ietsjes: Iets[];
	let navigateServiceMock: Mocked<Pick<NavigateService, 'next'>>;

	beforeEach(() => {
		ietsjes = [{ title: 'hoi' }, { title: 'hallo' }, { title: 'hatseflats' }];
		navigateServiceMock = { next: vi.fn().mockReturnValue(42) };

		TestBed.configureTestingModule({
			providers: [{ provide: NavigateService, useValue: navigateServiceMock }],
		});
		fixture = TestBed.createComponent(Autocompleter<Iets>);
		sut = fixture.componentInstance;
		fixture.componentRef.setInput('data', ietsjes);
	});

	it('autocompletes a list of suggestions', () => {
		sut.query.set('a');
		expect(sut.suggestions()).toEqual<Iets[]>([{ title: 'hallo' }, { title: 'hatseflats' }]);
	});

	it(`uses ${NavigateService.name} for nexting`, () => {
		sut.query.set('a');
		sut.next();

		expect(navigateServiceMock.next).toHaveBeenCalledOnce();
        expect(sut.activeSuggestionIndex).toBe(42);
	});
});
