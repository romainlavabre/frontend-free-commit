import React from "react";
import * as PropTypes from "prop-types";

export default function SpinnerGrow({color}) {
    return (
        <div className="flex justify-center items-center space-x-2">
            <div
                className={`spinner-grow inline-block w-8 h-8 bg-${color} rounded-full opacity-0 text-gray-300`}
                role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

SpinnerGrow.propTypes = {
    color: PropTypes.string.isRequired
}
