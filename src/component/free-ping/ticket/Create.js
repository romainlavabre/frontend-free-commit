import useApi from "../../../api/auto/useApi";
import {useNavigate} from "react-router";
import React, {useRef} from "react";
import SelectSearch2 from "../../util/form/SelectSearch2";
import CheckIcon from "../../util/icon/CheckIcon";
import {Editor} from "@monaco-editor/react";

export default function () {
    const {create} = useApi();
    const navigation = useNavigate();
    const titleInput = useRef();
    const recipients = useRef();
    const contentInput = useRef();


    const submit = async () => {
        const payload = {
            ticket: {
                title: titleInput.current.value,
                recipients: recipients.current,
                ticket_url_base: `${window.location.protocol}//${window.location.host}/public/tickets/`
            },
            message: {
                content: contentInput.current.getValue()
            }
        };

        const id = await create("api-free-ping", "tickets", payload, "admin");

        if (typeof id === "number") {
            navigation("/free-ping/ticket");
        }
    }

    const handleEditorDidMount = (editor) => {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        contentInput.current = editor;
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <div className="input-group">
                        <label>Title</label>
                        <input className="input-text w-full" ref={titleInput} placeholder="Title"/>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="input-group">
                        <label>Recipients</label>
                        <SelectSearch2
                            items={[]}
                            multiple={true}

                            reference={recipients}
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <Editor
                        theme={"vs-dark"}
                        language={"text"}
                        options={{
                            inlineSuggest: true,
                            fontSize: "16px",
                            formatOnType: true,
                            autoClosingBrackets: true,
                            minimap: {scale: 10}
                        }}
                        height={"300px"}
                        onMount={handleEditorDidMount}
                    />
                </div>
                <div className="col-span-2 flex justify-end">
                    <button className="badge-green-square" onClick={submit}>
                        <CheckIcon size={6}/>
                    </button>
                </div>
            </div>

        </div>
    );
}