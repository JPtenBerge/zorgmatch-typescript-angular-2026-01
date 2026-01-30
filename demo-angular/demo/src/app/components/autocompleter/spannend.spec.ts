import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Autocompleter } from './autocompleter';
import { signal } from '@angular/core';
import { NavigateService } from '../../services/navigate.service';
import { Mocked } from 'vitest';

let bla = 19;
function doeIetsSpannends() {
	setTimeout(() => {
		bla = 42;
	}, 2000);
}

describe('Component: Autocompleter', () => {
	afterEach(() => console.log('lokale after'));

	describe('nested', () => {
		afterEach(() => {
			console.log('nested after');
		});

		it(`does exciting things`, () => {
			vi.useFakeTimers();

			doeIetsSpannends();

			vi.advanceTimersByTime(2000);

			expect(bla).toBe(42);
		});
	});
});
