import { useState } from "react";

function AutoDropdown({ options }) {
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [selected, setSelected] = useState(null);

    const handleChange = (x) => {
        const value = x.target.value;
        setInputValue(value);

        const filtered = options.filter((opt) =>
            opt.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(filtered);
    };

    const handleSelect = (option) => {
        setSelected(option);
        setInputValue(option);
        setFilteredOptions([]);
    };

    return (
        <div style={{ position: "relative", width:"200px" }}>
            <p>Hello</p>
            <input
                type = "text"
                value = {inputValue}
                onChange = {handleChange}
                placeholder = "Search a name..."
                style = {{ width: "100%", padding: "8px"}}
            />
            {filteredOptions.length > 0 && inputValue && (
                <ul>
                    {filteredOptions.map((option, index) => (
                        <li
                            key = {index}
                            onClick = { () => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
            {selected && <p>Selected: {selected}</p>}
        </div>
    )


}

export default AutoDropdown