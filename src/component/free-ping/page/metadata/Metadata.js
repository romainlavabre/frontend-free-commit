import {useSelector} from "react-redux";
import isNull from "../../../../mixin/global/isNull";
import UpdateEntity from "../../../util/form/UpdateEntity";
import {useEffect, useState} from "react";
import api from "../../../../api/api";

export default function ({pageId}) {
    const page = useSelector(state => state.api?.["api-free-ping"]?.pages?.values[pageId]);
    const [pings, setPings] = useState(null);

    useEffect(() => {
        const init = async () => {
            setPings((await api.freeping.pagination.findAllPing()))
        }
        init();
    }, []);

    if (isNull(page) || isNull(pings)) return null;

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
                <UpdateEntity
                    subject={"pages"}
                    service={"api-free-ping"}
                    id={pageId}
                    role={"admin"}
                    fields={[
                        {
                            title: "Title",
                            name: "title",
                            type: "text"
                        },
                        {
                            title: "Pings",
                            name: "pings_id",
                            type: "array",
                            items: pings,
                            key: "ping_id",
                            value: "ping_title",
                            multiple: true
                        }
                    ]}
                />
            </div>
            <div className="col-span-1">
                <UpdateEntity
                    subject={"pages"}
                    service={"api-free-ping"}
                    id={pageId}
                    role={"admin"}
                    fields={[
                        {
                            title: "URI",
                            name: "uri",
                            type: "text"
                        }
                    ]}
                />
            </div>
        </div>
    );
}