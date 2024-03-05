import isNull from "../../../mixin/global/isNull.js";
import CheckIcon from "../icon/CheckIcon.js";
import useApi from "../../../api/auto/useApi.js";
import {useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import inputFileToDocument from "../../../mixin/global/inputFileToDocument.js";
import SelectSearch2 from "./SelectSearch2";

export default function ({
                             subject,
                             id,
                             replaceSuffix = "s",
                             replaceBy = "",
                             role = "sub_admin",
                             service = "emergency",
                             onSuccess = null,
                             searchByProp = "id",
                             field
                         }) {
    const currentValue = useRef();
    const {findOneBy, update} = useApi();
    const subjectEntity = useSelector(state => state.api?.[service]?.[subject.split("::")[0]]?.values?.find(entity => !isNull(entity) && entity[searchByProp] == id));
    const callSuccess = useRef(false);

    useEffect(() => {
        findOneBy(service, subject, searchByProp, id, role);
    }, []);

    useEffect(() => {
        if (isNull(currentValue.current)) {
            return;
        }

        if (field.type === "text" || field.type === "long-text") {
            currentValue.current.value = subjectEntity[field.name];
        } else if (field.type === "array" && field.multiple) {
            if (true) {
                return;
            }
            for (let i = 0; i < subjectEntity[field.name].length; i++) {
                const element = [...currentValue.current.options].find(option => option.value == subjectEntity[field.name][i]);

                if (!isNull(element)) {
                    element.selected = true;
                }
            }
        }
    }, [subjectEntity]);

    useEffect(() => {
        if (callSuccess.current === false) return;

        callSuccess.current = false;

        onSuccess(subjectEntity);
    }, [subjectEntity])

    const updateSubject = async field => {
        const payload = {};
        const regex = new RegExp(replaceSuffix + "$");
        const entity = subject.includes("::") ? subject.split("::")[1] : subject;

        payload[entity.replace(regex, replaceBy)] = {};

        if (field.type === "boolean") {
            payload[entity.replace(regex, replaceBy)][field.name] = currentValue.current.checked;
        } else if (field.type === "datetime-local") {
            payload[entity.replace(regex, replaceBy)][field.name] = new Date(currentValue.current.value).toISOString();
        } else if (field.type === "array") {
            //const selectedValues = [...currentValue.current.options]
            //    .filter(x => x.selected)
            //    .map(x => x.value);

            //payload[entity.replace(regex, replaceBy)][field.name] = selectedValues;
            payload[entity.replace(regex, replaceBy)][field.name] = currentValue.current;
        } else {
            payload[entity.replace(regex, replaceBy)][field.name] = currentValue.current.value !== null && currentValue.current.value === "" ? null : currentValue.current.value;
        }


        const result = await update(service, subject, subjectEntity.id, field.name, payload, role);

        if (result && !isNull(onSuccess)) {
            callSuccess.current = true;
        }

        if (result && !isNull(field.onClick)) {
            field.onClick();
        }
    }

    const uploadFile = async (field, fileReceived) => {
        const file = await inputFileToDocument(fileReceived);

        const payload = {
            uploaded_file: {}
        };
        const regex = new RegExp(replaceSuffix + "$");

        payload.uploaded_file[subject.replace(regex, replaceBy) + "_" + field.name] = file;

        const result = await update(service, subject, subjectEntity.id, field.name, payload, role);

        if (result && !isNull(onSuccess)) {
            onSuccess();
        }

        if (result && !isNull(field.onClick)) {
            field.onClick();
        }
    }

    const datetimeLocalFormatter = defaultValue => {
        if (isNull(defaultValue)) {
            return null;
        }

        let now = new Date(defaultValue);
        let utcString = now.toISOString().substring(0, 19);
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let localDatetime = year + "-" +
            (month < 10 ? "0" + month.toString() : month) + "-" +
            (day < 10 ? "0" + day.toString() : day) + "T" +
            (hour < 10 ? "0" + hour.toString() : hour) + ":" +
            (minute < 10 ? "0" + minute.toString() : minute) +
            utcString.substring(16, 19);
        return localDatetime;
    }

    if (isNull(subjectEntity)) {
        return null;
    }

    if (field.type === "array") {
        return (
            <div className={!isNull(field.title) ? 'mt-5' : ''}>
                <div className="w-full my-auto">
                    {
                        !isNull(field.title)
                            ? <label
                                className="cursor-pointer my-auto">{typeof field.title === "function" ? field.title(subjectEntity) : field.title}</label>
                            : null
                    }

                    <div className="flex justify-between">
                        <SelectSearch2
                            items={field.items}
                            index={field.key}
                            value={field.value}
                            multiple={!isNull(field.multiple) && field.multiple}
                            defaultValue={subjectEntity[field.name]}
                            onChange={(res) => {
                                if (isNull(field.disabled) || !field.disabled) {
                                    currentValue.current = res;
                                }
                            }}
                        />
                        {/**
                         <select
                         ref={currentValue}
                         className={`input-select my-auto py-1 w-full ${field.multiple === true ? "h-20" : ""}`}
                         defaultValue={isNull(field.formatter) ? subjectEntity[field.name] : field.formatter(subjectEntity[field.name])}
                         onChange={() => {
                         if (!isNull(field.disabled) && !field.disabled) {
                         updateSubject(field);
                         }
                         }}
                         multiple={!isNull(field.multiple) ? field.multiple : false}
                         >
                         {
                         field.items.map(item => (
                         <option key={item[isNull(field.key) ? "key" : field.key]}
                         value={item[isNull(field.key) ? "key" : field.key]}>{item[isNull(field.value) ? "value" : field.value]}</option>
                         ))
                         }
                         </select>
                         **/}
                        {
                            !isNull(field.disabled) && field.disabled === true
                                ? (
                                    <div className="text-gray-600 mx-3 my-auto cursor-default">
                                        <CheckIcon size={8}/>
                                    </div>
                                )
                                : (
                                    <div
                                        className="text-green-600 mx-3 my-auto cursor-pointer hover:text-green-700"
                                        onClick={() => updateSubject(field)}>
                                        <CheckIcon size={8}/>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }

    if (field.type === "boolean") {
        return (
            <div className={!isNull(field.title) ? 'mt-5' : ''}>
                <div className="w-full my-auto">
                    <label htmlFor={`checkbox-${field.name}`}
                           className="cursor-pointer my-auto mx-5">{typeof field.title === "function" ? field.title(subjectEntity) : field.title}</label>
                    <input
                        ref={currentValue}
                        type="checkbox"
                        id={`checkbox-${field.name}`}
                        placeholder={field.title}
                        className={`input-checkbox my-auto py-1`}
                        defaultChecked={subjectEntity[field.name] === true}
                        readOnly={!isNull(field.disabled) ? field.disabled : false}
                        onChange={() => {
                            updateSubject(field);
                        }}
                    />
                </div>
            </div>
        );
    }

    if (field.type === "file") {
        return (
            <div className={!isNull(field.title) ? 'mt-5' : ''}>
                {
                    !isNull(field.title)
                        ? <label className={!isNull(field.disabled) ? "cursor-pointer" : ""}>
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8`} fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                            {typeof field.title === "function" ? field.title(subjectEntity) : field.title}

                            <input
                                ref={currentValue}
                                type="file"
                                placeholder={field.title}
                                style={{display: "none"}}
                                readOnly={!isNull(field.disabled) ? field.disabled : false}
                                disabled={field.disabled}
                                onChange={e => uploadFile(field, e.target.files[0])}
                            />
                        </label>
                        : null
                }
            </div>
        )
    }

    if (!isNull(field.type) && field.type.includes("date")) {
        return (
            <div className={!isNull(field.title) ? 'mt-5' : ''}>
                {
                    !isNull(field.title)
                        ? <label>{typeof field.title === "function" ? field.title(subjectEntity) : field.title}</label>
                        : null
                }

                <div className="flex justify-between">
                    <input
                        ref={currentValue}
                        type={field.type}
                        placeholder={field.title}
                        className={`input-text w-full py-1`}
                        defaultValue={isNull(field.formatter) ? (field.type === "datetime-local" ? datetimeLocalFormatter(subjectEntity[field.name]) : subjectEntity[field.name]) : field.formatter(subjectEntity[field.name])}
                        readOnly={!isNull(field.disabled) ? field.disabled : false}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                updateSubject(field);
                            }
                        }}
                    />
                    {
                        !isNull(field.disabled) && field.disabled === true
                            ? (
                                <div className="text-gray-600 mx-3 my-auto cursor-default">
                                    <CheckIcon size={8}/>
                                </div>
                            )
                            : (
                                <div
                                    className="text-green-600 mx-3 my-auto cursor-pointer hover:text-green-700"
                                    onClick={() => updateSubject(field)}>
                                    <CheckIcon size={8}/>
                                </div>
                            )
                    }
                </div>
            </div>
        );
    }

    if (field.type === "long-text") {
        return (
            <div key={subject + "-" + id + "-" + subjectEntity[field.name]}
                 className={!isNull(field.title) ? 'mt-5' : ''}>
                {
                    !isNull(field.title)
                        ? <label>{typeof field.title === "function" ? field.title(subjectEntity) : field.title}</label>
                        : null
                }
                <div className="flex justify-between">
                                    <textarea
                                        ref={currentValue}
                                        placeholder={field.title}
                                        className={isNull(field.css) ? "input-text w-full py-1" : field.css}
                                        defaultValue={isNull(field.formatter) ? subjectEntity[field.name] : field.formatter(subjectEntity[field.name])}
                                        readOnly={!isNull(field.disabled) ? field.disabled : false}
                                        onKeyDown={e => {
                                            if (e.key === "Enter") {
                                                updateSubject(field);
                                            }
                                        }}
                                    />
                    {
                        !isNull(field.disabled) && field.disabled === true
                            ? (
                                <div className="text-gray-600 mx-3 my-auto cursor-default">
                                    <CheckIcon size={8}/>
                                </div>
                            )
                            : (
                                <div
                                    className="text-green-600 mx-3 my-auto cursor-pointer hover:text-green-700"
                                    onClick={() => updateSubject(field)}>
                                    <CheckIcon size={8}/>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }

    return (
        <div className={!isNull(field.title) ? 'mt-5' : ''}>
            {
                !isNull(field.title)
                    ? <label>{typeof field.title === "function" ? field.title(subjectEntity) : field.title}</label>
                    : null
            }
            <div className="flex justify-between">
                <input
                    ref={currentValue}
                    type={isNull(field.type) ? "text" : field.type}
                    placeholder={field.title}
                    className={isNull(field.css) ? `input-${isNull(field.type) ? "text" : field.type} w-full py-1` : field.css}
                    defaultValue={isNull(field.formatter) ? subjectEntity[field.name] : field.formatter(subjectEntity[field.name])}
                    readOnly={!isNull(field.disabled) ? field.disabled : false}
                    step="0.01"
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            updateSubject(field);
                        }
                    }}
                />
                {
                    !isNull(field.disabled) && field.disabled === true
                        ? (
                            <div className="text-gray-600 mx-3 my-auto cursor-default">
                                <CheckIcon size={8}/>
                            </div>
                        )
                        : (
                            <div className="text-green-600 mx-3 my-auto cursor-pointer hover:text-green-700"
                                 onClick={() => updateSubject(field)}>
                                <CheckIcon size={8}/>
                            </div>
                        )
                }
            </div>
        </div>
    )
}
