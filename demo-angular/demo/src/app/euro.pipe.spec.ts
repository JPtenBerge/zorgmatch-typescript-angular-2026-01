import { EuroPipe } from './euro.pipe';

describe('Pipe: Euro', () => {
	it.skip('works', () => {
		expect(12).toBe(12);
		expect('hoi').toBe('hoi');
		expect('hoi').not.toBe('qwerty');
		expect({ x: 24, y: { test: 'hoqqqi' } }).toEqual({ x: 24, y: { test: 'hoi' } });
	});

	let sut: EuroPipe;
	beforeEach(() => {
		sut = new EuroPipe();
	});

	it('format and round a number with more than two decimals as two decimals', () => {
		expect(sut.transform(123.456789)).toBe('€ 123,46');
	});

	let inputEnOutput = [
		{ input: 123.4, expected: '€ 123,40' },
		{ input: 123.4, expected: '€ 123,40' },
		{ input: 123.4, expected: '€ 123,40' },
	];
	for (let item of inputEnOutput) {
		it(`formats correctly with ${item.input}`, () => {});
	}
	// nog beter: it.each()

	it('formats a number with one decimal as two decimals', () => {
		expect(sut.transform(123.4)).toBe('€ 123,40');
	});

	it('formats a number with two decimals as two decimals', () => {
		expect(sut.transform(123.45)).toBe('€ 123,45');
	});

	it('formats a whole number as two zero decimals', () => {
		expect(sut.transform(123)).toBe('€ 123,00');
	});
});
