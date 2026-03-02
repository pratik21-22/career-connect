import { useState, useEffect } from 'react';

/**
 * Debounce hook — delays value updates until the user stops typing.
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default 400ms)
 */
export function useDebounce(value, delay = 400) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}
