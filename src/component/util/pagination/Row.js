import mixin from "../../../mixin/mixin";
import React from "react";

export default function Row({data, columns, config}) {

    const getClass = (data) => {
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
                columns.map((column) => (
                    <td key={mixin.uuid()}
                        className="px-1 py-2 border-y border-dark">
                        {
                            column.computedValue !== undefined && column.computedValue !== null
                                ? column.computedValue(data)
                                : data[column.value]
                        }
                    </td>
                ))
            }
        </tr>
    );
}
