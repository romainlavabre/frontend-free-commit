import React, {useState} from "react";
import isNull from "../../../mixin/global/isNull";

/**
 *
 * @param items <code>{title: string, component: HTMLElement}</code>
 * @param gridColsNumber Class grid-cols-{number of item}
 * @return {JSX.Element}
 */
export default function ({items, gridColsNumber = "grid-cols-12"}) {
    const [selected, setSelected] = useState(items[0]);

    if (isNull(selected)) return null;

    return (
        <div className={`grid ${gridColsNumber}`}>
            {
                items.map(item => (
                    <div
                        key={item.title}
                        className={`col-span-1 ${item.title === selected.title ? "bg-default" : "bg-gray-800"} text-center cursor-pointer`}
                        style={{
                            borderBottom: item.title === selected.title ? "none" : "solid 1px #1f2937",
                            borderTop: "solid 1px #1f2937",
                            borderLeft: "solid 1px #1f2937",
                            borderRight: "solid 1px #1f2937"
                        }}
                        onClick={() => setSelected(item)}
                    >
                        {item.title}
                    </div>
                ))
            }

            <div className="col-span-full p-5" style={{
                borderBottom: "solid 1px #1f2937",
                borderLeft: "solid 1px #1f2937",
                borderRight: "solid 1px #1f2937"
            }}>
                {selected.component}
            </div>
        </div>
    )
}