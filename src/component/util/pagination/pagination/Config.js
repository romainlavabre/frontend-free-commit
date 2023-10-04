import React, {useRef, useState} from "react";
import database from "../../../database/database";

export default function Config({name, columns}) {
    const [isOpen, setOpen] = useState(false);
    let config = database.read(database.TABLE_PAGINATION, name);
    const numberLineByPageInput = useRef();
    const hiddenColumnInput = useRef();

    if (config == undefined) {
        config = {
            numberLineByPage: 9,
            isSaveFilters: false,
            hiddenColumn: []
        }
    }

    const submit = () => {
        database.write(database.TABLE_PAGINATION, name, {
            numberLineByPage: numberLineByPageInput.current.value,
            hiddenColumn: [...hiddenColumnInput.current.selectedOptions].map(option => option.value)
        });
        setOpen(false);
        document.dispatchEvent(new Event('PAGINATION_CONFIG_UPDATED'));
    };

    return (
        <>
            <button onClick={() => setOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
            </button>

            {
                !isOpen
                    ? null
                    : (
                        <div className="bg-gray-700 fixed z-50 w-96 h-96 top-3 m-auto p-5 shadow"
                             onMouseLeave={() => setOpen(false)}>
                            <div className="flex justify-end">
                                <button onClick={() => setOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex justify-center">
                                <div>
                                    <div className="input-group justify-center">
                                        <label className="font-bold">Nombre de ligne par page</label>
                                        <input
                                            type="number"
                                            className="input-text"
                                            placeholder="Number lines by page"
                                            defaultValue={config.numberLineByPage}
                                            ref={numberLineByPageInput}
                                        />
                                    </div>

                                    <div className="input-group justify-center">
                                        <label className="font-bold">Masquer des colonnes</label>
                                        <select
                                            className="input-select w-full h-32"
                                            multiple
                                            defaultValue={config.hiddenColumn}
                                            ref={hiddenColumnInput}
                                        >
                                            <option></option>
                                            {
                                                columns.map(column => (
                                                    <option key={column.key} value={column.key}>{column.key}</option>
                                                ))
                                            }

                                        </select>
                                    </div>

                                    <div className="form-submit">
                                        <button className="text-green" onClick={submit}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20"
                                                 fill="currentColor">
                                                <path
                                                    d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    );
}
