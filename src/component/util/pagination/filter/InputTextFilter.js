import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import PropTypes from "prop-types";

export default function InputTextFilter({onChange, column}) {
    const {register, watch} = useForm({mode: "onChange"})
    const value = watch(column);

    useEffect(() => {
        onChange(column, value);
    }, [value]);

    return (
        <div className="input-group">
            <input
                type="text"
                placeholder="Search"
                className="input-text w-full"
                {...register(column)}
            />
        </div>
    );
}

InputTextFilter.propTypes = {
    onChange: PropTypes.func.isRequired,
    column: PropTypes.string.isRequired
}
