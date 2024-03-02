import {useSelector} from "react-redux";
import isNull from "../../../../mixin/global/isNull";
import TrashIcon from "../../../util/icon/TrashIcon";
import {useRef} from "react";
import CheckIcon from "../../../util/icon/CheckIcon";
import api from "../../../../api/api";
import useApi from "../../../../api/auto/useApi";

export default function ({pingId}) {
    const {findOneBy} = useApi();
    const ping = useSelector(state => state.api?.["api-free-ping"]?.pings?.values[pingId]);
    const technicalEmailInput = useRef();
    const technicalPhoneInput = useRef();
    const userEmailInput = useRef();

    const addTechnicalEmail = async () => {
        if (technicalEmailInput.current.value === "") return;

        const technicalEmails = [...ping.alert_technical_emails];
        technicalEmails.push(technicalEmailInput.current.value);

        await api.freeping.ping.addTechnicalEmail(pingId, technicalEmails);
        findOneBy("api-free-ping", "pings", "id", pingId, "admin", 2);
        technicalEmailInput.current.value = null;
    }

    const removeTechnicalEmail = async toRemove => {
        let technicalEmails = [...ping.alert_technical_emails];
        technicalEmails = technicalEmails.filter(email => email !== toRemove);

        await api.freeping.ping.addTechnicalEmail(pingId, technicalEmails);
        findOneBy("api-free-ping", "pings", "id", pingId, "admin", 2);
    }

    const addTechnicalPhone = async () => {
        if (technicalPhoneInput.current.value === "") return;

        const technicalPhones = [...ping.alert_technical_phones];
        technicalPhones.push(technicalPhoneInput.current.value);

        await api.freeping.ping.addTechnicalPhone(pingId, technicalPhones);
        findOneBy("api-free-ping", "pings", "id", pingId, "admin", 2);
        technicalPhones.current.value = null;
    }

    const removeTechnicalPhone = async toRemove => {
        let technicalPhones = [...ping.alert_technical_phones];
        technicalPhones = technicalPhones.filter(phone => phone !== toRemove);

        await api.freeping.ping.addTechnicalPhone(pingId, technicalPhones);
        findOneBy("api-free-ping", "pings", "id", pingId, "admin", 2);
    }


    const addUserEmail = async () => {
        if (userEmailInput.current.value === "") return;

        const userEmails = [...ping.alert_user_emails];
        userEmails.push(userEmailInput.current.value);

        await api.freeping.ping.addUserEmail(pingId, userEmails);
        findOneBy("api-free-ping", "pings", "id", pingId, "admin", 2);
        userEmailInput.current.value = null;
    }

    const removeUserEmail = async toRemove => {
        let userEmails = [...ping.alert_user_emails];
        userEmails = userEmails.filter(email => email !== toRemove);

        await api.freeping.ping.addUserEmail(pingId, userEmails);
        findOneBy("api-free-ping", "pings", "id", pingId, "admin", 2);
    }

    if (isNull(ping)) return null;

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1" style={{borderRight: "solid 1px #1f2937"}}>
                <h1 className="text-center underline">Technical team</h1>

                <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="col-span-1 flex justify-center">
                        <input
                            className="input-text"
                            placeholder="Add email"
                            ref={technicalEmailInput}
                            onKeyDown={e => {
                                if (e.key === "Enter") addTechnicalEmail();
                            }}
                        />
                        <button className="badge-green-square mx-3" onClick={addTechnicalEmail}>
                            <CheckIcon size={6}/>
                        </button>
                    </div>
                    <div className="col-span-1 flex justify-center">
                        <input
                            className="input-text"
                            placeholder="Add phone"
                            ref={technicalPhoneInput}
                            onKeyDown={e => {
                                if (e.key === "Enter") addTechnicalPhone();
                            }}
                        />
                        <button className="badge-green-square mx-3" onClick={addTechnicalPhone}>
                            <CheckIcon size={6}/>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {
                        ping.alert_technical_emails.map(email => (
                            <div key={email} className="col-span-1 flex justify-between items-center mt-2">
                                <div>
                                    {email}
                                </div>
                                <div className="badge-red-square mx-3" onClick={() => removeTechnicalEmail(email)}>
                                    <TrashIcon size={6}/>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="grid grid-cols-2 gap-4 mt-10">
                    {
                        ping.alert_technical_phones.map(phone => (
                            <div key={phone} className="col-span-1 flex justify-between items-center mt-2">
                                <div>
                                    {phone}
                                </div>
                                <div className="badge-red-square mx-3" onClick={() => removeTechnicalPhone(phone)}>
                                    <TrashIcon size={6}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="col-span-1">
                <h1 className="text-center underline">User team</h1>

                <div className="flex justify-center">
                    <input
                        className="input-text"
                        placeholder="Add email"
                        ref={userEmailInput}
                        onKeyDown={e => {
                            if (e.key === "Enter") addUserEmail();
                        }}
                    />
                    <button className="badge-green-square mx-3" onClick={addUserEmail}>
                        <CheckIcon size={6}/>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {
                        ping.alert_user_emails.map(email => (
                            <div key={email} className="col-span-1 flex justify-between items-center mt-2">
                                <div>
                                    {email}
                                </div>
                                <div className="badge-red-square mx-3" onClick={() => removeUserEmail(email)}>
                                    <TrashIcon size={6}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}