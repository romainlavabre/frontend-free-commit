import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function InputTextFilter({onChange, column, focus = false}) {
    const [value, setValue] = useState();

    useEffect(() => {
        onChange(column, value);
    }, [value]);

    return (
        <div className="input-group">
            <input
                type="text"
                placeholder="Rechercher"
                className="input-text w-full text-gray-200"
                onChange={e => setValue(e.target.value)}
                autoFocus={focus}
            />
        </div>
    );
}

InputTextFilter.propTypes = {
    onChange: PropTypes.func.isRequired,
    column: PropTypes.string.isRequired
}
