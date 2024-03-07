import React, {useRef} from "react";
import {Editor} from "@monaco-editor/react";
import CheckIcon from "../../../util/icon/CheckIcon";
import useApi from "../../../../api/auto/useApi";
import {useNavigate} from "react-router";

export default function ({ticketId}) {
    const navigation = useNavigate();
    const {create} = useApi();
    const contentInput = useRef();
    const handleEditorDidMount = (editor) => {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        contentInput.current = editor;
    }

    const submit = async () => {
        const payload = {
            message: {
                content: contentInput.current.getValue(),
                ticket_id: ticketId
            }
        };

        await create("api-free-ping", "messages", payload, "admin");
    }

    return (
        <div>
            <div>
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
            <div className="flex justify-end mt-5">
                <button className="badge-green-square" onClick={submit}>
                    <CheckIcon size={6}/>
                </button>
            </div>
        </div>
    )
}