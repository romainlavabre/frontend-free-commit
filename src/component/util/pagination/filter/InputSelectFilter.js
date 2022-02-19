import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import PropTypes from "prop-types";

export default function InputSelectFilter({onChange, column, options}) {
    const {register, watch} = useForm({mode: "onChange"})
    const value = watch(column);

    useEffect(() => {
        onChange(column, value);
    }, [value]);

    return (
        <div className="input-group">
            <select
                className="input-select"
                placeholder="Rechercher"
                {...register(column)}
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
