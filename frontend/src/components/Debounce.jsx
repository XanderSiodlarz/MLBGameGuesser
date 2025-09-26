import {useState, useEffect } from "react";

function Debounce(value, delay) {
    const [dVal, setDVal] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDVal(value), delay)
        return () => clearTimeout(handler);
    }, [value, delay]);

    return dVal
}

export default Debounce