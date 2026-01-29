import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { createPlannedEvent, PlannedEvent } from '../../events/planned-event';
import { environment } from '../../../environments/environment';
import { EventSelectorComponent } from './event-selector.component';

const ENOUGH_TIME = 1000;

describe(EventSelectorComponent.name, () => {
	let element: HTMLElement;
	let sut: ComponentFixture<EventSelectorComponent>;
	let http: HttpTestingController;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EventSelectorComponent],
			providers: [provideHttpClient(), provideHttpClientTesting()],
		}).compileComponents();

		vi.useFakeTimers();
		sut = TestBed.createComponent(EventSelectorComponent);
		http = TestBed.inject(HttpTestingController);
		element = sut.nativeElement;
		sut.detectChanges();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it('should show events when typing', () => {
		// Arrange
		const expected = [createPlannedEvent({ name: 'DND Finally' })];

		// Act
		actAndAssertTyping('DND', expected);

		// Assert
		const listItems = element.querySelectorAll('li');
		expect(listItems.length).toBe(1);
		expect(listItems.item(0).textContent?.trim()).toBe('DND Finally');
	});

	it('should dispatch the selected event when an event is clicked', () => {
		vi.spyOn(sut.componentInstance.selected, 'emit');
		const expected = createPlannedEvent({ name: 'DND Finally' });
		actAndAssertTyping('DND', [expected]);
		const button = element.querySelector('li button');
		button!.dispatchEvent(new MouseEvent('click'));
		expect(sut.componentInstance.selected.emit).toHaveBeenCalledWith(expected);
	});

	function actAndAssertTyping(search: string, expected: PlannedEvent[]) {
		const input = element.querySelector('input')!;
		input.value = search;
		input.dispatchEvent(new InputEvent('input'));
		vi.advanceTimersByTime(ENOUGH_TIME);
		http.expectOne(`${environment.backendUrl}/events?name_like=${search}`).flush(expected);
		sut.detectChanges();
	}
});
