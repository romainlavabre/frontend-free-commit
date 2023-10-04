import {useEffect, useRef, useState} from "react";
import CloseIcon from "../icon/CloseIcon";
import isNull from "../../../mixin/global/isNull";
import SearchIcon from "../icon/SearchIcon";

export default function ({
                             name,
                             items,
                             index = "key",
                             value = "value",
                             multiple = false,
                             onChange,
                             defaultValue,
                             reference,
                             placeholder = "Rechercher"
                         }) {
    const [showResult, setShowResult] = useState(false);
    const [content, setContent] = useState(null);
    const [result, setResult] = useState(items);
    const [isSearch, setSearch] = useState(true);
    const searchInput = useRef();

    useEffect(() => {
        if (isNull(defaultValue)) {
            setContent([]);
        }

        if (typeof defaultValue === "object") {
            const res = items.filter(item => defaultValue.includes(item[index]));

            setContent(res);

            if (res.length > 0) {
                setSearch(false);
            }

            return;
        }

        const res = items.filter(item => defaultValue === item[index]);

        setContent(res);

        if (res.length > 0) {
            setSearch(false);
        }
    }, []);

    useEffect(() => {

        if (isNull(content)) return;

        onSearch();

        if (!isNull(reference)) {
            if (multiple) {
                reference.current = content.map(item => item[index]);
            } else {
                if (content.length === 0) {
                    reference.current = null;
                } else {
                    reference.current = {value: content[0][index]}
                }
            }
        }

        if (!isNull(onChange)) {
            if (multiple) {
                onChange(content.map(item => item[index]));
                return;
            }

            if (content.length === 0) {
                onChange(null);
                return;
            }

            onChange(content[0][index]);
        }
    }, [content]);

    useEffect(() => {
        if (!isSearch) return;

        if (isNull(searchInput.current)) return;

        searchInput.current.focus();
    }, [isSearch]);

    const select = item => {
        if (!multiple) {
            setContent([item]);
            setShowResult(false);
            if (!isNull(item)) {
                setSearch(false);
            }
            return;
        }

        if (!isNull(content.find(localItem => localItem[index] === item[index]))) {
            return;
        }

        content.push(item);
        setContent([...content]);
        searchInput.current.focus();

        onSearch();
        setShowResult(false);
        setSearch(false);
    }

    const unselect = item => {
        const res = content.filter(localItem => localItem[index] !== item[index]);

        setContent(res);

        if (res.length === 0) {
            setSearch(true);
        }
    }

    const onSearch = () => {
        if (isNull(searchInput.current) || searchInput.current.value.length === 0) {
            setResult(items.filter(item => !isContentContains(item)));
            return;
        }

        setResult(items.filter(item => item[value].toLowerCase().includes(searchInput.current.value.toLowerCase()) && !isContentContains(item)));
    }

    const isContentContains = item => {
        return !isNull(content.find(localItem => localItem[index] === item[index]));
    }

    if (isNull(content)) return null;

    return (
        <div className="w-full relative bg-default">
            <div
                className=" block p-0 border border-gray-700 text-center rounded"
                style={{wordBreak: "break-all", minHeight: "33px"}}
                onFocus={() => setShowResult(true)}
            >
                {
                    isSearch
                        ? (
                            <div className="flex justify-between items-center">
                                <input
                                    className="input-text w-full border-none m-0"
                                    placeholder={placeholder}
                                    ref={searchInput}
                                    onChange={onSearch}
                                />
                                <div className="text-gray-500 cursor-pointer" onClick={() => {
                                    searchInput.current.value = "";
                                    onSearch();

                                    setShowResult(false);

                                    if (content.length > 0) {
                                        setSearch(false);
                                    }
                                }}>
                                    <CloseIcon size={6}/>
                                </div>
                            </div>
                        )
                        : null
                }

                <div className="w-full">
                    {
                        content.map(item => (
                            <div key={item[index]} className="badge-green-square mx-2 text-xs p-1 mb-1 mt-1"
                                 onClick={() => {
                                     if (!isSearch) {
                                         setSearch(true);
                                         return;
                                     }

                                     unselect(item)
                                 }}>
                                {item[value]}
                                <div className="ml-1">
                                    <CloseIcon size={4}/>
                                </div>
                            </div>
                        ))
                    }
                    {
                        !isSearch
                            ? (
                                <div className="absolute top-0 right-0 flex py-1">
                                    <div className="text-gray-500 cursor-pointer" onClick={() => setSearch(true)}>
                                        <SearchIcon size={6}/>
                                    </div>
                                </div>
                            )
                            : null
                    }
                </div>


            </div>

            {
                showResult
                    ? (
                        <div className="absolute border border-gray-600 bg-default w-full max-h-56 overflow-y-auto z-50">
                            {
                                result.length > 0
                                    ? result.map(item => (
                                        <div key={item[index]} className="cursor-pointer hover:bg-gray-800 text-center"
                                             onClick={() => select(item)}>
                                            {item[value]}
                                        </div>
                                    ))
                                    : (
                                        <div className="cursor-default hover:bg-gray-800 text-center">
                                            No result
                                        </div>
                                    )
                            }
                        </div>
                    )
                    : null
            }
        </div>
    );
}