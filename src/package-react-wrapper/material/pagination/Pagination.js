import Box from "@mui/material/Box";
import {
    DataGrid,
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridApiRef,
    useGridSelector
} from "@mui/x-data-grid";
import {GRID_DEFAULT_LOCALE_TEXT} from "./LocalText";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import database from "../../database/database";
import isNull from "../../mixin/isNull";
import Toolbar from "./Toolbar";
import MuiPagination from '@mui/material/Pagination';
import useWebsocketServer from "../../use/useWebsocketServer";
import {ZonedDateTime} from "@js-joda/core";
import useHelper from "../../use/useHelper";
import PaginationConfig from "./PaginationConfig";
import useConfirm from "../../use/useConfirm";
import useAlert from "../../use/useAlert";
import useEventDispatcher from "../../use/useEventDispatcher";
import ExportProcess from "./ExportProcess";


function Pagination({page, onPageChange, className}) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination
            color="primary"
            className={className}
            count={pageCount}
            showFirstButton={true}
            showLastButton={true}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event, newPage - 1);
            }}
        />
    );
}

function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
}


/**
 *
 * @param paginationConfig {PaginationConfig}
 * @return {JSX.Element}
 */
export default function ({paginationConfig}) {
    const {confirmModal, managedConfirm} = useConfirm();
    const alert = useAlert();
    const eventDispatcher = useEventDispatcher();
    const helper = useHelper();
    const websocketServer = useWebsocketServer();
    const apiRef = useGridApiRef();
    const [payload, setPayload] = useState(null);
    const payloadRef = useRef();
    const [reload, setReload] = useState(helper.uuid());
    const wsLastFetch = useRef(null);
    const [filters, setFilters] = useState(
        !isNull(database.read("pagination", paginationConfig.getId()))
            ? (() => {
                const flt = database.read("pagination", paginationConfig.getId());
                flt.mode = paginationConfig.getMode();
                flt.fixedFilters = paginationConfig.getFixedFilters();
                flt.mode = paginationConfig.getMode();
                return flt;
            })()
            : {
                perPage: paginationConfig.getPerPage(),
                page: 1,
                fixedFilters: paginationConfig.getFixedFilters(),
                userFilters: [],
                mode: paginationConfig.getMode()
            }
    );
    const filterRef = useRef(filters);
    const selected = useRef();
    const onReload = useRef();
    const interval = useRef();

    useEffect(() => {
        if (filters.page === 1) return;

        apiRef.current.setPage(filters.page - 1);
    }, []);

    useEffect(() => {
        if (isNull(paginationConfig.getReloadInterval())) return;

        interval.current = setInterval(() => {
            fetch();
        }, paginationConfig.getReloadInterval());

        return () => clearInterval(interval.current);
    }, []);

    useEffect(() => {
        if (isNull(paginationConfig.getNextOrderEvent())) return;

        document.addEventListener(paginationConfig.getNextOrderEvent(), selectNextOrder);

        return () => document.removeEventListener(paginationConfig.getNextOrderEvent(), selectNextOrder);
    }, []);

    useEffect(() => {
        document.addEventListener(PaginationConfig.RELOAD_EVENT, fetch);

        return () => document.removeEventListener(PaginationConfig.RELOAD_EVENT, fetch);
    }, []);

    useEffect(() => {
        filterRef.current = {...filters};
        fetch();
        persistFilter();
    }, [filters]);


    const persistFilter = () => {
        if (isNull(paginationConfig.getId())) return;

        database.write("pagination", paginationConfig.getId(), filters);
    }

    const fetch = async () => {
        const result = await axios.get((!isNull(paginationConfig.getUrl()) ? paginationConfig.getUrl() : process.env.REACT_APP_API_URL) + paginationConfig.getUri() + buildParams(), {
            headers: {
                authorization: `Bearer ${database.read("authentication", "access_token")}`
            }
        });

        setPayload(result.data);
        payloadRef.current = result.data;

        websocketSubscriber(result.data);

        if (!isNull(onReload.current)) {
            onReload.current(result.data);
            onReload.current = null;
        }
    }

    const buildParams = () => {
        let params = `?per_page=${filterRef.current.perPage}&page=${filterRef.current.page}&mode=${filterRef.current.mode}&orderBy=${paginationConfig.getOrderBy()}&sortBy=${paginationConfig.getSortBy() === null ? paginationConfig.getFieldAsId() : paginationConfig.getSortBy()}`;

        filterRef.current.fixedFilters.forEach(ff => params += `&${ff.key}${encodeURIComponent("[")}${ff.operator}${encodeURIComponent("]")}=${ff.value}`);

        const userFilters = [];

        filterRef.current.userFilters.forEach(uf => {
            if (Array.isArray(uf.value)) {
                uf.value.forEach(val => {
                    if (typeof val !== "string" || !val.startsWith("{\"overwrite")) {
                        const uf2 = userFilters.find(i => i.key === uf.key);

                        if (isNull(uf2)) {
                            userFilters.push({
                                key: uf.key,
                                operator: uf.operator,
                                value: val
                            });
                        } else {
                            if (Array.isArray(uf2.value)) {
                                uf2.value.push(val)
                            } else {
                                uf2.value = [uf2.value, val];
                            }
                        }
                    } else {
                        JSON.parse(val).overwrite.forEach(o => {
                            const uf2 = userFilters.find(i => i.key === o.key);

                            if (isNull(uf2)) {
                                userFilters.push(o);
                            } else {
                                if (Array.isArray(uf2.value)) {
                                    if (Array.isArray(o.value)) {
                                        o.value.forEach(v => uf2.value.push(v));
                                    } else {
                                        uf2.value.push(o.value);
                                    }
                                } else {
                                    uf2.value = [uf2.value];

                                    if (Array.isArray(o.value)) {
                                        o.value.forEach(v => uf2.value.push(v));
                                    } else {
                                        uf2.value.push(o.value);
                                    }
                                }
                            }
                        })
                    }
                })
            } else {
                if (typeof uf.value !== "string" || !uf.value.startsWith("{\"overwrite")) {
                    const uf2 = userFilters.find(i => i.key === uf.key);

                    if (isNull(uf2)) {
                        userFilters.push({
                            key: uf.key,
                            operator: uf.operator,
                            value: uf.value
                        });
                    } else {
                        uf2.value.push(uf.value)
                    }
                } else {
                    JSON.parse(uf.value).overwrite.forEach(o => {
                        const uf2 = userFilters.find(i => i.key === o.key);

                        if (isNull(uf2)) {
                            userFilters.push(o);
                        } else {
                            if (Array.isArray(uf2.value)) {
                                if (Array.isArray(o.value)) {
                                    o.value.forEach(v => uf2.value.push(v));
                                } else {
                                    uf2.value.push(o.value);
                                }
                            } else {
                                uf2.value = [uf2.value];

                                if (Array.isArray(o.value)) {
                                    o.value.forEach(v => uf2.value.push(v));
                                } else {
                                    uf2.value.push(o.value);
                                }
                            }
                        }
                    })
                }
            }

        });

        userFilters.forEach(uf => {
            /** @type PaginationColumn */
            const pColumn = paginationConfig.getPaginationColumns().find(pc => pc.getField() === uf.key);

            if (Array.isArray(uf.value)) {
                params += "&" + uf.value.map(val => `${uf.key}${encodeURIComponent("[")}${uf.operator}${encodeURIComponent("]")}=${!isNull(pColumn) ? pColumn.getFormatBeforeSearching()(val) : val}`).join("&");
            } else {
                params += `&${uf.key}${encodeURIComponent("[")}${uf.operator}${encodeURIComponent("]")}=${!isNull(pColumn) ? pColumn.getFormatBeforeSearching()(uf.value) : uf.value}`
            }
        })

        return params
    }

    const websocketSubscriber = data => {
        if (isNull(paginationConfig.getId()) || !paginationConfig.isUseSnapshotRefresh()) return;

        const to = [];

        data.data.forEach(row => {
            if (!isNull(row.reload_trigger)) {
                row.reload_trigger.forEach(item => {
                    if (!isNull(item.value) || !isNull(item.event)) {
                        to.push(item);
                    }
                })
            }
        });

        data.reload_trigger?.forEach(array => {
            to.push(array);
        });

        websocketServer.dataUpdateEvent.subscribe({
            registration_id: paginationConfig.getId(),
            onTriggerred: () => {
                if (wsLastFetch.current === null || wsLastFetch.current.toEpochSecond() + 1 <= ZonedDateTime.now().toEpochSecond()) {
                    setTimeout(fetch, 1000);
                    wsLastFetch.current = ZonedDateTime.now();
                }
            },
            to: to
        });
    }

    const handleResetFilter = () => {
        setFilters({
            perPage: paginationConfig.getPerPage(),
            page: 1,
            fixedFilters: paginationConfig.getFixedFilters(),
            userFilters: [],
            mode: paginationConfig.getMode()
        });
        setReload(helper.uuid());
    }

    const selectNextOrder = async e => {
        if (isNull(payloadRef.current) || payloadRef.current.data.length === 0) return;

        if (isNull(selected.current)) {
            selected.current = payloadRef.current.data[0];
            paginationConfig.getOnRowClicked()(payloadRef.current.data[0]);
            return;
        }

        const fieldAsId = paginationConfig.getFieldAsId();

        if (payloadRef.current.data.length === 1) {
            if (payloadRef.current.data[0][fieldAsId] !== selected.current[fieldAsId]) {
                selected.current = payloadRef.current.data[0];
                paginationConfig.getOnRowClicked()(payloadRef.current.data[0]);
                return;
            }

            if (payloadRef.current.current_page < payloadRef.current.last_page) {
                onReload.current = pay => {
                    if (isNull(pay) || pay.data.length === 0) return;

                    selected.current = pay.data[0];
                    paginationConfig.getOnRowClicked()(pay.data[0]);
                }
                return;
            }
        }

        if (payloadRef.current.data.length > 1) {
            if (payloadRef.current.data[0][fieldAsId] === selected.current[fieldAsId]) {
                selected.current = payloadRef.current.data[1];
                paginationConfig.getOnRowClicked()(payloadRef.current.data[1]);
            } else {
                selected.current = payloadRef.current.data[0];
                paginationConfig.getOnRowClicked()(payloadRef.current.data[0]);
            }

            return;
        }
    }

    const handleExport = () => {
        const handler = () => {
            eventDispatcher.launcher("start-process", {
                name: `Export ${paginationConfig.getId()}`,
                component: (onTerminate, onNewLog) => {
                    return <ExportProcess
                        onTerminate={onTerminate}
                        onNewLog={onNewLog}
                        params={buildParams()}
                        uri={paginationConfig.getUri()}
                        paginationConfig={paginationConfig}
                    />;
                }
            });
        }

        if (payloadRef.current.total > 1000 && payloadRef.current.total < 10000) {
            managedConfirm(
                "Attention, vous allez exporter + de 1000 lignes",
                `Avec les filtres actuels, vous allez exporter ${payloadRef.current.total}  lignes, Avec les filtres actuels, vous allez exporter 12 lignes. Si votre machine ne dispose pas des ressources nécessaires, elle risque de planter.`,
                handler
            );

            return;
        }

        if (payloadRef.current.total > 10000) {
            alert.warning("L'export est limité à 10 000 lignes, veuillez modifier vos filtres pour rester dans la limite");
            return;
        }

        handler();
    }

    const handleResetDimension = () => {
        database.write("pagination", paginationConfig.getId() + "col-dim", {});
        setReload(helper.uuid());
    }

    return (
        <Box
            sx={{
                //height: paginationConfig.getHeight(),
                width: '100%'
            }}
        >
            <DataGrid
                sx={{'--DataGrid-containerBackground': 'none'}}
                columnHeaderHeight={paginationConfig.isHideColumnHeader() ? 0 : 56}
                key={reload}
                paginationMode={"server"}
                autoHeight={true}
                apiRef={apiRef}
                rowCount={payload?.total ?? 0}
                getRowId={row => row[paginationConfig.getFieldAsId()]}
                rows={isNull(payload) ? [] : payload.data}
                columns={paginationConfig.toDataGridColumns(
                    item => {
                        const newFilters = {...filters}

                        newFilters.userFilters = newFilters.userFilters.filter(uf => uf.key !== item.key);

                        if (item.value !== "") {
                            newFilters.userFilters.push(item)
                        }

                        setFilters(newFilters);
                    },
                    key => filters.userFilters.find(uf => uf.key === key)
                )}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: paginationConfig.getPerPage(),
                        }
                    },
                    columns: {
                        columnVisibilityModel:
                            !isNull(database.read("pagination", paginationConfig.getId() + "-hidden-column"))
                                ? database.read("pagination", paginationConfig.getId() + "-hidden-column")
                                : {},
                    },
                    density: database.read("pagination", paginationConfig.getId() + "-density"),
                }}
                pageSizeOptions={paginationConfig.isHideRowPerPage() ? [] : [5, 10, 15, 20, 25, 30]}
                checkboxSelection={paginationConfig.withSelection()}
                disableRowSelectionOnClick
                localeText={(() => {
                    if (paginationConfig.isHideRowCountLabel()) {
                        const result = GRID_DEFAULT_LOCALE_TEXT;
                        result.MuiTablePagination.labelDisplayedRows = ({from, to, count}) => null;

                        return result;
                    }

                    return GRID_DEFAULT_LOCALE_TEXT

                })()}
                onPaginationModelChange={(model, details) => {
                    const newFilters = {...filters}

                    newFilters.perPage = model.pageSize;
                    newFilters.page = model.page + 1;

                    setFilters(newFilters);
                }}
                slots={{
                    toolbar: paginationConfig.isHideToolbar() ? null : (paginationConfig.getOverwriteToolbarWith() != null ? paginationConfig.getOverwriteToolbarWith() : Toolbar),
                    pagination: paginationConfig.isHidePageSelector() ? null : CustomPagination,
                }}
                slotProps={{
                    toolbar: {
                        onResetFilter: handleResetFilter,
                        onRefresh: paginationConfig.isWithRefreshOption() ? fetch : null,
                        customComponents: paginationConfig.getToolbarComponents(),
                        onExport: handleExport,
                        hideDensity: paginationConfig.isToolbarHideDensity(),
                        hideColumnManagement: paginationConfig.isToolbarHideColumnManagement(),
                        onResetDimension: handleResetDimension
                    },
                }}
                onRowClick={e => {
                    if (!isNull(paginationConfig.getOnRowClicked())) {
                        paginationConfig.getOnRowClicked()(e.row);
                        selected.current = e.row;
                    }
                }}
                onColumnVisibilityModelChange={e => {
                    if (Object.keys(e).length === 0) {
                        database.write("pagination", paginationConfig.getId() + "-hidden-column", {});
                        return;
                    }

                    let hiddenColumns = database.read("pagination", paginationConfig.getId() + "-hidden-column");

                    if (isNull(hiddenColumns)) {
                        hiddenColumns = e;
                    } else {
                        Object.keys(e).forEach(key => hiddenColumns[key] = e[key]);
                    }

                    database.write("pagination", paginationConfig.getId() + "-hidden-column", hiddenColumns);
                }}
                onDensityChange={e => {
                    database.write("pagination", paginationConfig.getId() + "-density", e);
                }}
                onRowSelectionModelChange={(e, details) => {
                    if (!isNull(paginationConfig.getOnSelectionChange())) {
                        paginationConfig.getOnSelectionChange()(e);
                    }
                }}
                onCellClick={(params, e) => {
                    if (params.isEditable) {
                        e.stopPropagation();
                    }
                }}
                onColumnResize={e => {
                    const current = database.read("pagination", paginationConfig.getId() + "col-dim") ?? {};

                    current[e.colDef.field] = e.colDef.width;

                    database.write("pagination", paginationConfig.getId() + "col-dim", current);
                }}
                hideFooter={paginationConfig.isHideFooter()}
                getRowHeight={() => paginationConfig.isDisableTextEllipsis() ? "auto" : null}
            />
            {confirmModal}
        </Box>
    );
}
