import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import useStateRef from "react-usestateref";
import axios from "axios";
import Row from "./Row";
import Footer from "./Footer";
import SpinnerGrow from "../loader/Spinner";
import mixin from "../../../mixin/mixin";
import InputTextFilter from "./filter/InputTextFilter";
import InputSelectFilter from "./filter/InputSelectFilter";
import ButtonFilter from "./filter/ButtonFilter";
import ButtonSortFilter from "./filter/ButtonSortFilter";

export default function Pagination({row, columns, fetch, name}) {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({
        button: [],
        input: {},
        page: 1,
        sortBy: null,
        orderBy: 'DESC',
        perPage: 8
    });
    const [metadata, setMetadata] = useState({});
    const [loading, setLoading] = useState(false);
    const [lastFetchVersion, setLastFetchVersion, lastFetchVersionRef] = useStateRef(null);
    const lastFetch = useRef(null);
    const interval = useRef(null);

    useLayoutEffect(() => {

        setFilters(getDefaultFilters(columns, filters));

        if (fetch.interval !== undefined && fetch.interval !== null) {
            interval.current = setInterval(() => {
                if (lastFetch.current === null) {
                    return;
                }

                if (lastFetch.current.getTime() + fetch.interval <= new Date().getTime()) {
                    fetchData();
                }

            }, fetch.interval);
        }

        return () => clearInterval(interval.current);
    }, []);

    const onInputTextChange = (name, value) => {
        filters.input[name] = value;
        setFilters({...filters});
    }

    const onInputSelectChange = (name, value) => {
        filters.input[name] = value;
        setFilters({...filters});
    }

    const onButtonSortClicked = orderBy => {
        filters.orderBy = orderBy;
        setFilters({...filters});
    }

    const onButtonClicked = (name) => {
        const indexInArray = filters.button.findIndex(value => name === value);

        if (indexInArray !== -1) {
            filters.button.splice(indexInArray, 1);
        } else {
            filters.button.push(name);
        }

        setFilters({...filters});
    }

    const onPageChange = (page) => {
        filters.page = page;

        setFilters({...filters});
        metadata.current_page = page;
        setMetadata({...metadata});
    }

    useEffect(() => {
        const fetchVersion = mixin.uuid();
        setLastFetchVersion(fetchVersion);

        setTimeout(() => {
            if (fetchVersion === lastFetchVersionRef.current) {
                fetchData();
            }
        }, 150);
    }, [filters]);


    const fetchData = () => {
        setLoading(true);
        const fetchVersion = lastFetchVersion;

        lastFetch.current = new Date();
        axios.get(fetch.url + getComputedQueryString(filters, columns, fetch), fetch.options)
            .then(response => {

                if (lastFetchVersion === fetchVersion) {
                    setItems(response.data.data);
                    delete response.data.data;
                    setMetadata(response.data);
                }

                setLoading(false);
            })
            .catch(ignored => {
            });
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="flex-row">
                            {
                                columns.map(column => {
                                    if (typeof column.searchButton !== 'object') {
                                        return null;
                                    }

                                    return column.searchButton.map((button, index) => (
                                        <ButtonFilter
                                            onClick={onButtonClicked}
                                            column={column.value}
                                            button={button}
                                        />
                                    ))
                                })
                            }
                        </div>
                        <div className="overflow-hidden">
                            <table className="min-w-full text-center">
                                <thead className="bg-ovh">
                                <tr>
                                    {
                                        columns.map((column, index) => (
                                            <th key={index} scope="col"
                                                className="px-6 py-4 font-bold border-y border-dark">
                                                <div className="flex justify-center">
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
                                                </div>
                                            </th>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    {
                                        columns.map((column, index) => (
                                            <th key={index} scope="col"
                                                className="px-6 py-4 font-bold border-y border-dark">
                                                {
                                                    column.searchInput === true && typeof column.value === 'string'
                                                        ?
                                                        <InputTextFilter
                                                            onChange={onInputTextChange}
                                                            column={column.value}
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
                                        ))
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    items.length > 0
                                        ? items.map((item, index) => (
                                            <Row key={index} data={item} columns={columns} config={row}/>
                                        ))
                                        : (
                                            <tr>
                                                <td className="px-1 py-5 bg-light" colSpan={columns.length}>
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
                            <Footer metadata={metadata} changePage={(page) => onPageChange(page)}/>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


function getDefaultFilters(columns, filters) {
    const result = filters;

    columns.forEach(column => {
        if (column.searchInput === true && typeof column.value === 'string') {
            result.input[column.value] = '';
        }

        if (column.primary === true) {
            result.sortBy = column.value;

            if (typeof column.orderBy === 'string') {
                result.orderBy = column.orderBy;
            }
        }
    });

    return result;
}

function getComputedQueryString(filters, columns, fetch) {
    let queryString = [];

    filters.button.forEach(value => {
        columns.forEach(column => {
            if (typeof column.searchButton === 'object') {
                column.searchButton.forEach(localButton => {
                    const buttonId = `${column.key}-${localButton.name}-${localButton.value}`;

                    if (buttonId === value) {
                        queryString.push(`${column.value}${encodeURIComponent('[')}${localButton.comparator}${encodeURIComponent(']')}=${encodeURIComponent(localButton.value)}`);
                    }
                });
            }
        })
    });

    for (let key in filters.input) {
        let value = filters.input[key];

        const column = columns.find(column => column.value === key);

        if (column === undefined || value === null || value.length === 0) {
            continue;
        }

        if (column.searchInput === true) {
            queryString.push(`${key}${encodeURIComponent('[')}${column.comparator}${encodeURIComponent(']')}=${encodeURIComponent(value)}`);
        } else {
            const option = column.searchSelect.find(option => option.value == value);

            if (option !== undefined) {
                queryString.push(`${key}${encodeURIComponent('[')}${option.comparator}${encodeURIComponent(']')}=${encodeURIComponent(value)}`);
            }
        }
    }

    queryString.push(`page=${filters.page}`);
    queryString.push(`orderBy=${filters.orderBy}`);
    queryString.push(`pre_page=${filters.perPage}`);

    if (filters.sortBy !== null) {
        queryString.push(`sortBy=${filters.sortBy}`);
    }

    if (typeof fetch.overwriteFilters === 'function') {
        queryString = fetch.overwriteFilters(queryString);
    }

    return `?${queryString.join('&')}`;
}
