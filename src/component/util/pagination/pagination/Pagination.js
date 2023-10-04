import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import useStateRef from "react-usestateref";
import axios from "axios";
import Row from "./Row";
import Footer from "./Footer";
import SpinnerGrow from "../loader/Spinner";
import mixin from "../../../mixin/global/mixin";
import InputTextFilter from "./filter/InputTextFilter";
import InputSelectFilter from "./filter/InputSelectFilter";
import ButtonFilter from "./filter/ButtonFilter";
import ButtonSortFilter from "./filter/ButtonSortFilter";
import Config from "./Config";
import database from "../../../database/database";
import isNull from "../../../mixin/global/isNull";
import useEventDispatcher from "../../../use/useEventDispatcher";
import event from "../../../event/event";
import RefreshIcon from "../icon/RefreshIcon";

export default function Pagination({
                                       row = {},
                                       columns,
                                       fetch,
                                       name,
                                       defaultFilters = [],
                                       sortBy = null,
                                       orderBy = "DESC",
                                       perPage = 9,
                                       enableLazyFetch = false,
                                       lazyFetchTableFollowed = null,
                                       lazyFetchEndpoint = null,
                                       lazyFetchForceReloadAfterSecondes = 30,
                                       hideFooter = false,
                                       hideConfig = false,
                                       mode = "exclude"
                                   }) {
    const eventDispatcher = useEventDispatcher();
    const [items, setItems] = useState([]);
    const [filters, setFilters, filtersRef] = useStateRef({
        button: [],
        input: {},
        page: 1,
        sortBy: sortBy,
        orderBy: orderBy,
        perPage: perPage,
        ignoreColumns: [],
        defaultFilters: defaultFilters
    });
    const [metadata, setMetadata] = useState({});
    const [loading, setLoading] = useState(false);
    const [lastFetchVersion, setLastFetchVersion, lastFetchVersionRef] = useStateRef(null);
    const lastFetch = useRef(null);
    const lastFetchLazy = useRef(null);
    const isModalOpen = useRef(false);
    const isModalOpenAt = useRef(null);
    const allowFetch = useRef(0);
    const interval = useRef(null);
    const [config, setConfig] = useState({
        numberLineByPage: perPage,
        isSaveFilters: false,
        hiddenColumn: [],
        filters: null
    });
    const lazyFetchPayload = useRef(null);
    const [reloadDisabled, setReloadDisabled] = useState(false);

    useLayoutEffect(() => {
        fetchConfig();

        setFilters(getDefaultFilters(columns, filters, sortBy, orderBy));

        if (fetch.interval !== undefined && fetch.interval !== null) {
            interval.current = setInterval(() => {
                if (lastFetch.current === null || isModalOpen.current || allowFetch.current !== 0) {
                    return;
                }

                if (lastFetch.current.getTime() + fetch.interval <= new Date().getTime()) {
                    fetchData();
                }

            }, fetch.interval);
        }

        return () => clearInterval(interval.current);
    }, []);

    useEffect(() => {
        if (config.isSaveFilters && !isNull(config.filters)) {
            setFilters(config.filters);
            return;
        } else {
            filters.perPage = config.numberLineByPage;
        }

        setFilters({...filters});
    }, [config]);

    useEffect(() => {
        const fetchVersion = mixin.uuid();
        setLastFetchVersion(fetchVersion);

        setTimeout(() => {
            if (fetchVersion === lastFetchVersionRef.current) {
                fetchData(true);

                if (config.isSaveFilters) {
                    config.filters = filters;
                    database.write(database.TABLE_PAGINATION, name, config);
                }
            }
        }, 150);
    }, [filters]);

    useEffect(() => {
        document.addEventListener('PAGINATION_CONFIG_UPDATED', fetchConfig);

        return () => document.removeEventListener('PAGINATION_CONFIG_UPDATED', fetchConfig);
    }, []);

    useEffect(() => {
        const handleModal = () => {
            isModalOpen.current = true;
            isModalOpenAt.current = new Date().toISOString();
        }

        const stopPaginationFetch = () => {
            allowFetch.current--;
        }

        eventDispatcher.subscribe(event.OPEN_MODAL, handleModal);
        eventDispatcher.subscribe(event.STOP_PAGINATION_FETCH, stopPaginationFetch);

        return () => {
            eventDispatcher.unsubscribe(event.OPEN_MODAL, handleModal);
            eventDispatcher.unsubscribe(event.STOP_PAGINATION_FETCH, stopPaginationFetch);
        };
    }, []);

    useEffect(() => {
        const handleModal = () => {
            isModalOpen.current = false;

            if (allowFetch.current === 0) {
                fetchData();
            }

            isModalOpenAt.current = null;
        }

        const startPaginationFetch = () => {
            allowFetch.current++;
        }

        eventDispatcher.subscribe(event.CLOSE_MODAL, handleModal);
        eventDispatcher.subscribe(event.START_PAGINATION_FETCH, startPaginationFetch);
        eventDispatcher.subscribe(event.PAGINATION_FETCH, fetchData);

        return () => {
            eventDispatcher.unsubscribe(event.CLOSE_MODAL, handleModal);
            eventDispatcher.unsubscribe(event.START_PAGINATION_FETCH, startPaginationFetch);
            eventDispatcher.unsubscribe(event.PAGINATION_FETCH, fetchData);
        };
    }, []);

    const onInputTextChange = (name, value) => {
        const column = columns.find(col => col.value === name);
        const searchFields = column?.searchFields;

        if (!isNull(column.onSearchChange)) {
            column.onSearchChange(value);
        }

        if (!isNull(searchFields)) {
            searchFields.forEach(searchField => {
                filters.input[searchField] = value;
            })
        } else {
            filters.input[name] = value;
            filters.page = 1;
        }

        setFilters({...filters});

    }
    const onInputSelectChange = (name, value) => {
        filters.input[name] = value;
        filters.page = 1;
        setFilters({...filters});
    }

    const onButtonSortClicked = orderBy => {
        filters.orderBy = orderBy;
        filters.page = 1;
        setFilters({...filters});
    }

    const onButtonClicked = (name) => {
        const indexInArray = filters.button.findIndex(value => name === value);

        if (indexInArray !== -1) {
            filters.button.splice(indexInArray, 1);
        } else {
            filters.button.push(name);
        }

        filters.page = 1;
        setFilters({...filters});
    }

    const onPageChange = (page) => {
        filters.page = page;
        setFilters({...filters});
        metadata.current_page = page;
        setMetadata({...metadata});
    }


    const fetchData = async (skipLazy = false) => {
        setLoading(true);
        const fetchVersion = lastFetchVersion;
        let invalid = true;

        lastFetch.current = new Date();

        if (!skipLazy && enableLazyFetch && lazyFetchPayload.current !== null) {
            lazyFetchPayload.current["superior_at"] = isModalOpenAt.current !== null ? isModalOpenAt.current : new Date(Date.now() - fetch.interval - 4000).toISOString();

            if (lastFetchLazy.current == null
                || lastFetchLazy.current.getTime() + lazyFetchForceReloadAfterSecondes * 1000 > Date.now()) {
                const response = await axios.post(lazyFetchEndpoint.url, {pagination: lazyFetchPayload.current}, fetch.options);

                invalid = response.data.invalid;

            }
        }

        if (!invalid) {
            return null;
        }

        lastFetchLazy.current = new Date();

        axios.get(fetch.url + getComputedQueryString(filtersRef.current, columns, fetch, mode), fetch.options)
            .then(response => {

                if (lastFetchVersion === fetchVersion) {
                    setItems(response.data.data);

                    if (enableLazyFetch) {
                        const newPayload = {};

                        for (let i = 0; i < lazyFetchTableFollowed.length; i++) {
                            newPayload[lazyFetchTableFollowed[i].table] = [];

                            for (let j = 0; j < response.data.data.length; j++) {
                                const id = response.data.data[j][lazyFetchTableFollowed[i].column];

                                if (id !== null && id !== undefined) {
                                    newPayload[lazyFetchTableFollowed[i].table].push(id);
                                }
                            }
                        }

                        lazyFetchPayload.current = newPayload;
                    }

                    if (fetch.getDataFunc !== null && fetch.getDataFunc !== undefined) {
                        fetch.getDataFunc({...response.data});
                    }

                    delete response.data.data;
                    setMetadata(response.data);

                }

                setLoading(false);
            })
            .catch(ignored => {
            });
    }

    const fetchConfig = () => {
        const newConfig = database.read(database.TABLE_PAGINATION, name);

        if (newConfig !== null && typeof newConfig === 'object') {
            setConfig(newConfig);
        }
    }


    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full">
                        <div className="flex-row">
                            {
                                columns.map(column => {
                                    if (typeof column.searchButton !== 'object') {
                                        return null;
                                    }

                                    return column.searchButton.map((button, index) => (
                                        <span key={index}>
                                            <ButtonFilter
                                                onClick={onButtonClicked}
                                                column={column.value}
                                                button={button}
                                            />
                                        </span>
                                    ))
                                })
                            }
                        </div>
                        <div className="overflow-hidden">
                            <table className="min-w-full text-center">
                                <thead className="">
                                <tr>
                                    {
                                        columns.map((column, index) => {
                                            if (config.hiddenColumn.includes(column.key)) return;

                                            if (isNull(column.key) && column.primary !== true && column.reloadOption !== true) {
                                                return;
                                            }

                                            return (
                                                <th key={index} scope="col"
                                                    className="px-6 py-4 font-bold border-b border-gray-600">
                                                    <div className="flex justify-center items-center">
                                                        {column.key}

                                                        {
                                                            column.primary !== true
                                                                ? null
                                                                : (
                                                                    <ButtonSortFilter
                                                                        onClick={onButtonSortClicked}
                                                                        defaultOrder='DESC'
                                                                    />
                                                                )
                                                        }

                                                        {
                                                            column.reloadOption
                                                                ? (
                                                                    <button className="mx-3" title="Rafraichir"
                                                                            onClick={() => {
                                                                                setReloadDisabled(true);
                                                                                fetchData();

                                                                                setTimeout(() => {
                                                                                    setReloadDisabled(false);
                                                                                }, 1000)
                                                                            }}
                                                                            disabled={reloadDisabled}
                                                                    >
                                                                        <RefreshIcon size={5}/>
                                                                    </button>
                                                                )
                                                                : null
                                                        }
                                                    </div>
                                                </th>
                                            )
                                        })
                                    }
                                </tr>
                                {
                                    !isNull(columns.find(column => !config.hiddenColumn.includes(column.key) && ((column.searchInput === true && typeof column.value === 'string') || column.searchSelect === 'object')))
                                        ? (
                                            <tr>
                                                {
                                                    columns.map((column, index) => {
                                                        if (config.hiddenColumn.includes(column.key)) return;

                                                        return (
                                                            <th key={index} scope="col"
                                                                className="px-6 pb-2 font-bold border-y border-gray-600">
                                                                {
                                                                    column.searchInput === true && typeof column.value === 'string'
                                                                        ?
                                                                        <InputTextFilter
                                                                            onChange={onInputTextChange}
                                                                            column={column.value}
                                                                            focus={column.searchFocus}
                                                                        />
                                                                        : null
                                                                }

                                                                {
                                                                    typeof column.searchSelect === 'object'
                                                                        ?
                                                                        <InputSelectFilter
                                                                            onChange={onInputSelectChange}
                                                                            column={column.value}
                                                                            options={column.searchSelect}
                                                                        />
                                                                        : null
                                                                }
                                                            </th>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        )
                                        : null
                                }

                                </thead>
                                <tbody>
                                {
                                    items.length > 0
                                        ? items.map((item, index) => (
                                            <Row
                                                key={JSON.stringify(item)}
                                                data={item}
                                                columns={columns}
                                                config={row}
                                                name={name}
                                                index={index}
                                            />
                                        ))
                                        : (
                                            <tr>
                                                <td className="px-1 py-3 bg-light" colSpan={columns.length}>
                                                    {
                                                        loading
                                                            ? (
                                                                <SpinnerGrow color={'fairfair'}/>
                                                            )
                                                            : 'No data available'
                                                    }
                                                </td>
                                            </tr>
                                        )

                                }
                                </tbody>
                            </table>
                            {
                                !hideFooter
                                    ? (
                                        <>
                                            {
                                                hideConfig
                                                    ? (
                                                        <div className="flex justify-end">
                                                            <div className="mt-1">
                                                                <Footer metadata={metadata}
                                                                        changePage={(page) => onPageChange(page)}/>
                                                            </div>
                                                        </div>
                                                    )
                                                    : (
                                                        <div className="flex justify-between">

                                                            <div className="ml-2 mt-2">
                                                                <Config name={name} columns={columns}/>
                                                            </div>
                                                            <div className="mt-1">
                                                                <Footer metadata={metadata}
                                                                        changePage={(page) => onPageChange(page)}/>
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                        </>
                                    )
                                    : null
                            }

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


function getDefaultFilters(columns, filters, sortBy, orderBy) {
    const result = filters;

    columns.forEach(column => {
        if (column.searchInput === true && typeof column.value === 'string') {
            result.input[column.value] = '';
        }

        if (column.primary === true) {
            if (isNull(sortBy)) {
                result.sortBy = column.value;
            }

            if (typeof column.orderBy === 'string' && isNull(orderBy)) {
                result.orderBy = column.orderBy;
            }
        }
    });

    return result;
}

function getComputedQueryString(filters, columns, fetch, mode) {
    let queryString = [];

    filters.button.forEach(value => {
        columns.forEach(column => {
            if (typeof column.searchButton === 'object') {
                column.searchButton.forEach(localButton => {
                    const buttonId = `${column.value}-${localButton.name}-${localButton.value}`;

                    if (buttonId === value) {
                        if (typeof localButton.conditions === 'object') {
                            localButton.conditions.forEach(condition => {
                                queryString.push(condition);
                            })
                        } else {
                            queryString.push(`${column.value}${encodeURIComponent('[')}${localButton.comparator}${encodeURIComponent(']')}=${encodeURIComponent(localButton.value)}`);
                        }
                    }
                });
            }
        })
    });

    for (let key in filters.input) {
        let value = filters.input[key];

        const column = columns.find(column => column.value === key);

        if (column === undefined || value === undefined || value === null || value.length === 0) {
            continue;
        }

        if (column.searchInput === true) {
            queryString.push(`${key}${encodeURIComponent('[')}${column.comparator}${encodeURIComponent(']')}=${encodeURIComponent(value)}`);

            if (!isNull(column.searchFields)) {
                column.searchFields.forEach(searchField => {
                    if (!isNull(filters.input[searchField]) && searchField !== key) {
                        queryString.push(`${searchField}${encodeURIComponent('[')}${column.comparator}${encodeURIComponent(']')}=${encodeURIComponent(value)}`);
                    }
                })
            }
        } else {
            const option = column.searchSelect.find(option => option.value == value);

            if (option !== undefined) {
                queryString.push(`${key}${encodeURIComponent('[')}${option.comparator}${encodeURIComponent(']')}=${encodeURIComponent(value)}`);
            }
        }
    }

    filters.defaultFilters.forEach(defaultFilter => queryString.push(defaultFilter));

    queryString.push(`page=${filters.page}`);
    queryString.push(`orderBy=${filters.orderBy}`);
    queryString.push(`per_page=${filters.perPage}`);
    queryString.push(`mode=${mode}`);

    if (filters.sortBy !== null) {
        queryString.push(`sortBy=${filters.sortBy}`);
    }

    if (typeof fetch.overwriteFilters === 'function') {
        queryString = fetch.overwriteFilters(queryString);
    }

    return `?${queryString.join('&')}`;
}
