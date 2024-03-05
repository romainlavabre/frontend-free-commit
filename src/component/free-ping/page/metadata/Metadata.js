import {useSelector} from "react-redux";
import isNull from "../../../../mixin/global/isNull";
import UpdateEntity from "../../../util/form/UpdateEntity";
import {useEffect, useState} from "react";
import api from "../../../../api/api";
import LinkIcon from "../../../util/icon/LinkIcon";

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
                            title: "URI (after /public/pages)",
                            name: "uri",
                            type: "text"
                        },
                        {
                            title: "Logo",
                            name: "logo",
                            type: "file"
                        }
                    ]}
                />

                {
                    !isNull(page.logo)
                        ? (
                            <div className="flex justify-center">
                                <img src={page.logo}/>
                            </div>
                        )
                        : null
                }

                <div className="mt-10 flex justify-center">
                    <a href={`${window.location.protocol}//${window.location.host}/public/pages${page.uri}`}
                       target="_blank"
                       className="link flex">
                        <div className="mx-3">
                            <LinkIcon size={6}/>
                        </div>
                        <div>
                            Link
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}