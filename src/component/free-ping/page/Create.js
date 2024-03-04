import {useEffect, useRef, useState} from "react";
import useApi from "../../../api/auto/useApi";
import {useNavigate} from "react-router";
import CheckIcon from "../../util/icon/CheckIcon";
import isNull from "../../../mixin/global/isNull";
import api from "../../../api/api";
import SelectSearch2 from "../../util/form/SelectSearch2";

export default function Create() {
    const {create} = useApi();
    const navigation = useNavigate();
    const [pings, setPings] = useState(null);
    const titleInput = useRef();
    const uriInput = useRef();
    const pingsInput = useRef();


    useEffect(() => {
        const init = async () => {
            setPings((await api.freeping.pagination.findAllPing()))
        }
        init();
    }, []);


    const submit = async () => {
        const payload = {
            page: {
                title: titleInput.current.value,
                uri: uriInput.current.value,
                pings_id: pingsInput.current
            }
        };

        const id = await create("api-free-ping", "pages", payload, "admin");

        if (typeof id === "number") {
            navigation("/free-ping/page");
        }
    }

    if (isNull(pings)) return null;

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
                <div className="input-group">
                    <label>Title</label>
                    <input className="input-text w-full" placeholder="Title" ref={titleInput}/>
                </div>
                <div className="input-group">
                    <SelectSearch2
                        items={pings}
                        index={"ping_id"}
                        value={"ping_title"}
                        multiple={true}
                        placeholder={"Search"}
                        defaultValue={[]}
                        reference={pingsInput}
                    />
                </div>
            </div>
            <div className="col-span-1">
                <div className="input-group">
                    <label>URI (after /public/pages)</label>
                    <input
                        className="input-text w-full"
                        placeholder="Title"
                        ref={uriInput}
                        defaultValue={"/"}
                    />
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex justify-end">
                    <button className="badge-green-square" onClick={submit}>
                        <CheckIcon size={6}/>
                    </button>
                </div>
            </div>
        </div>
    );
}
