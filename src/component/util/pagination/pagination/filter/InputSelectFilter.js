import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function InputSelectFilter({onChange, column, options}) {
    const [value, setValue] = useState();

    useEffect(() => {
        onChange(column, value);
    }, [value]);

    return (
        <div className="input-group">
            <select
                className="input-select w-full text-gray-200"
                placeholder="Rechercher"
                onChange={e => setValue(e.target.value)}
            >
                <option value="">Rechercher</option>
                {
                    options.map((option) => (
                        <option key={option.value}
                                value={option.value}>{option.name}</option>
                    ))
                }
            </select>
        </div>
    );
}

InputSelectFilter.propTypes = {
    onChange: PropTypes.func.isRequired,
    column: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}
