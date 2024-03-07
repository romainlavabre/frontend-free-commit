import {useSelector} from "react-redux";
import isNull from "../../../../mixin/global/isNull";
import {useRef} from "react";
import UpdateEntity from "../../../util/form/UpdateEntity";

export default function ({pingId}) {
    const ping = useSelector(state => state.api?.["api-free-ping"]?.pings?.values[pingId]);
    const technicalEmailInput = useRef();
    const technicalPhoneInput = useRef();
    const userEmailInput = useRef();

    if (isNull(ping)) return null;

    return (
        <div className="grid grid-cols-2">
            <div className="col-span-1 p-5" style={{borderRight: "solid 1px #1f2937"}}>
                <h1 className="text-center underline">Technical team</h1>
                <div className="mt-10">
                    <UpdateEntity
                        service={"api-free-ping"}
                        subject={"pings"}
                        id={pingId}
                        role={"admin"}
                        fields={[
                            {
                                title: "Emails",
                                name: "alert_technical_emails",
                                type: "array",
                                items: [],
                                key: "key",
                                value: "value",
                                multiple: true
                            },
                            {
                                title: "Phones",
                                name: "alert_technical_phones",
                                type: "array",
                                items: [],
                                key: "key",
                                value: "value",
                                multiple: true
                            }
                        ]}
                    />
                </div>
            </div>
            <div className="col-span-1 p-5">
                <h1 className="text-center underline">User team</h1>

                <div className="mt-10">
                    <UpdateEntity
                        service={"api-free-ping"}
                        subject={"pings"}
                        id={pingId}
                        role={"admin"}
                        fields={[
                            {
                                title: "Emails",
                                name: "alert_user_emails",
                                type: "array",
                                items: [],
                                key: "key",
                                value: "value",
                                multiple: true
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}