import PropTypes from "prop-types";
import React, {useState} from "react";

export default function ButtonFilter({onClick, column, button}) {
    const [active, setActive] = useState(false);

    const onButtonClick = () => {
        const buttonId = `${column}-${button.name}-${button.value}`;

        setActive(!active);
        onClick(buttonId)
    }

    return (
        <button
            className={button.class !== undefined && button.class !== null ? button.class : `rounded-md px-5 py-1 my-2 mr-2 ${!active ? 'bg-gray' : 'bg-gray-700'}`}
            onClick={() => onButtonClick()}>
            {button.name}
        </button>
    );
}

ButtonFilter.propTypes = {
    onClick: PropTypes.func.isRequired,
    column: PropTypes.string.isRequired,
    button: PropTypes.object.isRequired
}
