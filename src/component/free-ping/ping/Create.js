import {useRef} from "react";
import useApi from "../../../api/auto/useApi";
import {useNavigate} from "react-router";
import CheckIcon from "../../util/icon/CheckIcon";

export default function () {
    const {create} = useApi();
    const navigation = useNavigate();
    const titleInput = useRef();
    const pingUrlInput = useRef();
    const slowDownSecondsInput = useRef();
    const intervalInput = useRef();


    const submit = async () => {
        const payload = {
            ping: {
                title: titleInput.current.value,
                ping_url: pingUrlInput.current.value,
                slow_down_seconds: slowDownSecondsInput.current.value,
                interval: intervalInput.current.value
            }
        };

        const id = await create("api-free-ping", "pings", payload, "admin");

        if (typeof id === "number") {
            navigation("/free-ping/ping");
        }
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
                <div className="input-group">
                    <label>Title</label>
                    <input className="input-text w-full" placeholder="Title" ref={titleInput}/>
                </div>
                <div className="input-group">
                    <label>URL</label>
                    <input className="input-text w-full" placeholder="URL" ref={pingUrlInput}/>
                </div>
            </div>
            <div className="col-span-1">
                <div className="input-group">
                    <label>Interval (in second)</label>
                    <input className="input-text w-full" typeof="number" step="1" placeholder="Interval"
                           ref={intervalInput}/>
                </div>
                <div className="input-group">
                    <label>Delay for slowdown (in seconds)</label>
                    <input
                        className="input-text w-full"
                        typeof="number"
                        step="1"
                        placeholder="Delay for slowdown (in seconds)"
                        ref={slowDownSecondsInput}
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
