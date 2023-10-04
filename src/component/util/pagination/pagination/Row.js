import mixin from "../../../mixin/global/mixin";
import React, {useEffect, useState} from "react";
import database from "../../../database/database";

export default function Row({data, columns, config, name, index}) {
    const [paginationConfig, setPaginationConfig] = useState({
        numberLineByPage: 9,
        isSaveFilters: false,
        hiddenColumn: []
    });
    const [activeCss, setActiveCss] = useState(null);

    useEffect(() => {
        fetchConfig();
        document.addEventListener('PAGINATION_CONFIG_UPDATED', fetchConfig);

        return () => document.removeEventListener('PAGINATION_CONFIG_UPDATED', fetchConfig);
    }, []);

    useEffect(() => {
        document.addEventListener('PAGINATION_SET_ACTIVE', setActive);

        return () => document.removeEventListener('PAGINATION_SET_ACTIVE', setActive);
    }, []);

    const setActive = (payload) => {
        if (payload.data.getActiveCss === null || payload.data.getActiveCss === undefined) return;

        setActiveCss(payload.data.getActiveCss(data));
    }

    const fetchConfig = () => {
        const newConfig = database.read(database.TABLE_PAGINATION, name);

        if (newConfig !== null && typeof newConfig === 'object') {
            setPaginationConfig(newConfig);
        }
    }

    const getClass = data => {
        if (config.class !== undefined && config.class !== null) {
            return `${typeof config.class === "function" ? config.class(data, index) : config.class} ${config.onClick !== undefined && config.onClick !== null ? 'cursor-pointer' : 'null'}`;
        }

        return `border-t border-gray-700 ${config.onClick !== undefined && config.onClick !== null ? 'cursor-pointer hover:bg-gray-800' : 'null'}`;
    }

    return (
        <tr
            className={getClass(data) + " " + (activeCss !== null && activeCss !== undefined ? activeCss : "")}
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
                            className="px-1 py-1 border-none">
                            {
                                column.computedValue !== undefined && column.computedValue !== null
                                    ? column.computedValue(data, index)
                                    : data[column.value]
                            }
                        </td>
                    )
                })
            }
        </tr>
    );
}
