import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';

afterEach(() => {
    console.log('globale afterEach')
	vi.useRealTimers();
	vi.clearAllMocks();
	vi.restoreAllMocks();
});
