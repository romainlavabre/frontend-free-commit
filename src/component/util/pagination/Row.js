import mixin from "../../../mixin/mixin";
import React, {useEffect, useState} from "react";
import database from "../../../database/database";

export default function Row({data, columns, config, name}) {
    const [paginationConfig, setPaginationConfig] = useState({
        numberLineByPage: 9,
        isSaveFilters: false,
        hiddenColumn: []
    });

    useEffect(() => {
        fetchConfig();
        document.addEventListener('PAGINATION_CONFIG_UPDATED', fetchConfig);

        return () => document.removeEventListener('PAGINATION_CONFIG_UPDATED', fetchConfig);
    }, []);

    const fetchConfig = () => {
        const newConfig = database.read(database.TABLE_PAGINATION, name);
        setPaginationConfig(newConfig);
    }

    const getClass = () => {
        return config.class !== undefined ? `${config.class} ${config.onClick !== undefined && config.onClick !== null ? 'cursor-pointer' : 'null'}` : `bg-light border-y border-dark text-white ${config.onClick !== undefined && config.onClick !== null ? 'cursor-pointer hover:bg-dark' : 'null'}`;
    }

    return (
        <tr
            className={getClass(data)}
            onClick={(e) => {
                e.preventDefault();

                if (typeof config.onClick === 'function') {
                    config.onClick(data);
                }
            }}>
            {
                columns.map((column) => {
                    if (paginationConfig.hiddenColumn.includes(column.key)) return;

                    return (
                        <td key={mixin.uuid()}
                            className="px-1 py-2 border-y border-dark">
                            {
                                column.computedValue !== undefined && column.computedValue !== null
                                    ? column.computedValue(data)
                                    : data[column.value]
                            }
                        </td>
                    )
                })
            }
        </tr>
    );
}
