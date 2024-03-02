import {Editor} from "@monaco-editor/react";
import React, {useEffect, useRef, useState} from "react";
import useApi from "../../../../api/auto/useApi";

export default function ({initialContent, prop, pingId}) {
    const {update} = useApi();
    const editorRef = useRef();
    const [content, setContent] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setContent(initialContent);
            editorRef.current.getAction('editor.action.formatDocument').run();
        }, 500);
    }, []);

    const handleEditorDidMount = (editor, monaco) => {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        editorRef.current = editor;
        editor.onKeyDown((e) => {
            if (e.keyCode === 49 /** KeyCode.KeyS */ && e.ctrlKey) {
                e.stopPropagation();
                e.preventDefault();
                editorRef.current.getAction('editor.action.formatDocument').run();
                save();
            }

        });
    }

    const save = () => {
        update("api-free-ping", "pings", pingId, prop, {
            ping: {
                [prop]: editorRef.current.getValue()
            }
        }, "admin");
    }

    return (
        <div className="grid grid-cols-2 gap-4 h-screen">
            <div className="col-span-1 h-full">
                <Editor
                    theme={"vs-dark"}
                    language={"html"}
                    options={{
                        inlineSuggest: true,
                        fontSize: "16px",
                        formatOnType: true,
                        autoClosingBrackets: true,
                        minimap: {scale: 10}
                    }}
                    height={"100%"}
                    defaultValue={initialContent}
                    onMount={handleEditorDidMount}
                    onChange={val => setContent(val)}
                />
            </div>
            <div className="bg-white col-span-1 h-full">
                <iframe className="w-full h-[500px]" key={content} srcDoc={content}></iframe>
            </div>
        </div>
    );
}