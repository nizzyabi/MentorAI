import { useState, useEffect } from "react"

//   This custom React Hook, 'useDebounce', is designed to debounce a value. 

// Debouncing is a technique that delays the execution of a function or an update when a value changes, typically used for scenarios like search input fields to reduce the number of rapid requests or updates triggered by user input.

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        {/* Every time the value of the input feild changes, there will be a time delay for the search */}
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500);  // use previous delay OR 5 seconds.

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay]);

    return debouncedValue;
}