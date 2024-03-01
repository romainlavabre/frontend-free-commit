import React, {useRef} from "react";
import api from "../../../api/api";
import useAlert from "../../../use/useAlert";
import CheckIcon from "../../util/icon/CheckIcon";

export default function () {
    const alert = useAlert();
    const smsInput = useRef();


    const submit = () => {
        api.freeping.config.checkSms(smsInput.current.value);

        alert.launch("Sms sent");
    }

    return (
        <div>
            <div className="input-group">
                <label>Test email</label>
                <div className="flex">
                    <input className="input-text" ref={smsInput} placeholder="Recipient (+336)"/>
                    <button className="text-green-500" onClick={submit}>
                        <CheckIcon size={8}/>
                    </button>
                </div>
            </div>
        </div>
    );
}
