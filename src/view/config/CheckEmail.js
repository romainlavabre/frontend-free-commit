import React, {useRef} from "react";
import api from "../../api/api";
import useAxiosConfig from "../../use/useAxiosConfig";
import useAlert from "../../use/useAlert";
import CheckIcon from "../../component/util/icon/CheckIcon";

export default function CheckEmail() {
    useAxiosConfig();
    const alert = useAlert();
    const emailInput = useRef();


    const submit = () => {
        api.config.checkEmail(emailInput.current.value);

        alert.launch("Mail sent");
    }

    return (
        <div>
            <div className="input-group">
                <label>Recipient</label>
                <div className="flex">
                    <input className="input-text" ref={emailInput} placeholder="Recipient"/>
                    <button className="text-green-500" onClick={submit}>
                        <CheckIcon size={8}/>
                    </button>
                </div>
            </div>
        </div>
    );
}
