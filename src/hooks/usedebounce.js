import { useEffect, useState } from "react";

const useDebounce = (value, opt, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return { val: debouncedValue, opt: opt };
}


export default useDebounce