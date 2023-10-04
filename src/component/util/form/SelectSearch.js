import React, {useEffect, useState} from "react";
import uuid from "../../../mixin/global/uuid";
import isNull from "../../../mixin/global/isNull";

export default function SelectSearch({name, defaultValue, className, items, index = "key", value = "value", disabled = false, onChange}) {
    const [showList, setShowList] = useState(false);
    const [currentKey, setCurrentKey] = useState(null);
    const [choices, setChoices] = useState(items);
    const id = uuid();

    useEffect(() => {
        //change(null, defaultValue);
        filter(defaultValue);
    }, []);

    const filter = search => {
        if (search.length === 0) {
            setChoices(items);
        }

        setChoices(items.filter(item => item[value].toLowerCase().includes(search.toLowerCase())));
    }

    const change = (key, value) => {
        onChange(name, key, value);

        if (!isNull(key)) {
            setCurrentKey(key);
            setShowList(false);
            const input = document.getElementById(id);
            input.value = value;
        }
    }


    return (
        <div>
            <input
                onFocus={() => setShowList(!disabled ? true : false)}
                type="text"
                className={className}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={e => {
                    filter(e.target.value);
                    change(null, e.target.value)
                }}
                id={id}
            />

            <ul className={`border overflow-hidden overflow-y-scroll max-h-56 absolute w-full z-50 bg-gray-700 ${showList ? "" : "hidden"}`}>
                {
                    choices.map(item => {
                        if (item[index] === currentKey) {
                            return null;
                        }

                        return (
                            <li
                                key={item[index]}
                                onClick={() => change(item[index], item[value])}
                                className="hover:bg-gray-600 flex justify-center w-full border-b border-b-gray-200 text-center cursor-pointer text-white"
                            >
                                {item[value]}
                            </li>
                        );
                    })
                }

                {
                    choices.length === 0
                        ? (
                            <li
                                key={1}
                                className="hover:bg-gray-600 flex justify-center w-full border-b border-b-gray-200 text-center cursor-pointer text-white"
                            >
                                Aucun résultat
                            </li>
                        )
                        : null
                }

                <li
                    onClick={() => setShowList(false)}
                    className="hover:bg-gray-600 flex justify-center w-full border-b border-b-gray-200 text-center cursor-pointer text-white"
                >
                    Fermer
                </li>
            </ul>
        </div>
    );
}
