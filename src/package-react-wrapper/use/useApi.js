import {useDispatch, useSelector} from "react-redux";
import isNull from "../mixin/isNull";
import axios from "axios";
import database from "../database/database";
import {addOrOverwrite, remove} from "../store/api";
import useAlert from "./useAlert";
import useWebsocketServer from "./useWebsocketServer";
import useHelper from "./useHelper";

const fetchHistory = [];
let inProgress = [];

export default function useApi(errorMessage = null) {
    const helper = useHelper();
    const websocketServer = useWebsocketServer();
    const state = useSelector(state => state.api);
    const dispatch = useDispatch();
    const alert = useAlert();
    const UNIQUE_ID = helper.uuid();
    let currentlyUsed = [];

    const httpPropToEntityProp = prop => {
        let propName = "_";

        for (let i = 0; i < prop.length; i++) {
            if (prop[i] !== "_") {
                propName += prop[i];
            } else {
                propName += prop[i + 1].toUpperCase();
                i = i + 1;
            }
        }

        return propName;
    }


    const findOneInState = (service, subject, prop, value, registrationId) => {
        const searchResult = state[service.replace("service-", "").replaceAll("-", "_")]?.[subject]?.find(v => v?.[httpPropToEntityProp(prop)] == value);

        if (!isNull(searchResult)) {
            if (isCacheIsUpToDate(registrationId)) {
                return searchResult;
            }
        }

        return null;
    }

    const findAllInState = (service, subject, registrationId) => {
        const searchResult = state[service.replace("service-", "").replaceAll("-", "_")]?.[subject]?.filter(v => !isNull(v));

        if (!isNull(searchResult) && searchResult.length > 0 && fetchHistory.includes(registrationId)) {
            if (isCacheIsUpToDate(registrationId)) {
                return searchResult;
            }
        }

        return null;
    }

    const findAllByInState = (service, subject, prop, value, registrationId) => {
        const searchResult = state[service.replace("service-", "").replaceAll("-", "_")]?.[subject]?.filter(v => v?.[httpPropToEntityProp(prop)] == value);

        if (!isNull(searchResult) && searchResult.length > 0) {
            if (isCacheIsUpToDate(registrationId) && fetchHistory.includes(registrationId)) {
                return searchResult;
            }
        }

        return null;
    }

    const subscribeToWebsocketServer = (service, newInstance, subjectAsPlural, prop, value, registrationId, requestType, callback) => {
        if (!fetchHistory.includes(registrationId)) {
            fetchHistory.push(registrationId);
        }

        const subject = newInstance({}).getClassName();

        if (!isNull(window.global?.invalidCache?.[registrationId])) {
            window.global.invalidCache[registrationId] = null;
        }

        if (!currentlyUsed.includes(`${registrationId}-${UNIQUE_ID}`)) {
            currentlyUsed.push(`${registrationId}-${UNIQUE_ID}`);
        }

        const to = [];

        if (requestType === "findOneBy") {
            to.push({
                service: service,
                entity: subject,
                value: value,
                field: prop
            });
        }

        if (requestType === "findAll") {
            to.push({
                service: service,
                entity: subject,
                event: "UPDATED"
            });
            to.push({
                service: service,
                entity: subject,
                event: "CREATED"
            });
            to.push({
                service: service,
                entity: subject,
                event: "DELETED"
            });
        }

        if (requestType === "findAllBy") {
            to.push({
                service: service,
                entity: subject,
                value: value,
                field: prop
            });
            to.push({
                service: service,
                entity: subject,
                event: "DELETED"
            });
        }

        websocketServer.dataUpdateEvent.subscribe({
            registration_id: registrationId,
            to: to,
            onTriggerred: handleRefresh(registrationId, callback, subjectAsPlural)
        });
    }

    const handleRefresh = (registrationId, callback, subjectAsPlural) => payload => {
        if (isNull(window.global.invalidCache)) {
            window.global.invalidCache = {};
        }

        if (payload.type === "DELETED") {
            dispatch(remove({
                service: payload.service.replace("service-", "").replace("-", "_"),
                subject: subjectAsPlural,
                id: payload.id
            }))
        }

        if (currentlyUsed.includes(`${registrationId}-${UNIQUE_ID}`)) {
            window.global.invalidCache[registrationId] = false;
            callback(payload);
        } else {
            window.global.invalidCache[registrationId] = false;
        }
    }

    const isCacheIsUpToDate = registrationId => {
        return isNull(window.global.invalidCache?.[registrationId]) && websocketServer.isConnected();
    }

    const findOneBy = async (service, subject, prop, value, newInstance, role = "sub_admin", silent = false, useCache = true) => {
        const name = `findOneBy-${service}-${subject}-${prop}-${value}-${role}`;

        const cache = findOneInState(service, subject, prop, value, name);

        if (!isNull(cache) && useCache) {
            return cache;
        }

        if (inProgress.includes(name)) {
            return null;
        }

        inProgress.push(name);

        try {
            subscribeToWebsocketServer(service, newInstance, subject, prop, value, name, "findOneBy", payload => {
                if (payload.type === "DELETED") return;
                
                findOneBy(service, subject, prop, value, newInstance, role, silent)
            });

            const response = await axios.get(
                process.env.REACT_APP_API_URL + `/${service}/${role}/${subject}/${prop === "id" ? value : `by/${prop.replace(new RegExp('_id$'), '')}/${value}`}`,
                role !== "guest"
                    ? {
                        headers: {
                            Authorization: `Bearer ${database.read("authentication", "access_token")}`,
                            EncoderVersion: "V5"
                        }
                    }
                    : null
            );

            const instance = newInstance(response.data);

            dispatch(addOrOverwrite({
                service: service.replace("service-", "").replace("-", "_"),
                subject: subject,
                entity: instance
            }));

            inProgress = inProgress.filter(item => item !== name);
            return instance;
        } catch (e) {
            console.log(e);

            if (!silent) {
                alert.error(!isNull(errorMessage) ? errorMessage[e.response.data.message] : e.response.data.message);
            }

            inProgress = inProgress.filter(item => item !== name);

            return null;
        }
    };

    const findAll = async (service, subject, newInstance, role = "sub_admin", silent = false, useCache = true) => {
        const name = `findAll-${service}-${subject}-${role}`;

        const searchResult = findAllInState(service, subject, name);

        if (!isNull(searchResult) && useCache) {
            return searchResult;
        }

        if (inProgress.includes(name)) {
            return null;
        }

        inProgress.push(name);

        try {
            subscribeToWebsocketServer(service, newInstance, subject, null, null, name, "findAll", () => {
                findAll(service, subject, newInstance, role, silent);
            });

            const response = await axios.get(
                process.env.REACT_APP_API_URL + `/${service}/${role}/${subject}`,
                role !== "guest"
                    ? {
                        headers: {
                            Authorization: `Bearer ${database.read("authentication", "access_token")}`,
                            EncoderVersion: "V5"
                        }
                    }
                    : null
            );

            const instances = response.data.map(d => newInstance(d));

            dispatch(addOrOverwrite({
                service: service.replace("service-", "").replace("-", "_"),
                subject: subject,
                entity: instances
            }));

            inProgress = inProgress.filter(item => item !== name);
            return instances;
        } catch (e) {
            console.log(e);

            if (!silent) {
                alert.error(!isNull(errorMessage) ? errorMessage[e.response.data.message] : e.response.data.message);
            }

            inProgress = inProgress.filter(item => item !== name);

            return null;
        }
    };

    const findAllBy = async (service, subject, prop, value, newInstance, role = "sub_admin", silent = false, useCache = true) => {
        const name = `findAllBy-${service}-${subject}-${prop}-${value}-${role}`;

        const searchResult = findAllByInState(service, subject, prop, value, name);

        if (!isNull(searchResult) && useCache) {
            return searchResult;
        }

        if (inProgress.includes(name)) {
            return null;
        }

        inProgress.push(name);

        try {
            subscribeToWebsocketServer(service, newInstance, subject, prop, value, name, "findAllBy", () => {
                findAllBy(service, subject, prop, value, newInstance, role, silent)
            });

            const response = await axios.get(
                process.env.REACT_APP_API_URL + `/${service}/${role}/${subject}/${prop === "id" ? value : `by/${prop.replace(new RegExp('_id$'), '')}/${value}`}`,
                role !== "guest"
                    ? {
                        headers: {
                            Authorization: `Bearer ${database.read("authentication", "access_token")}`,
                            EncoderVersion: "V5"
                        }
                    }
                    : null
            );

            const instances = response.data.map(d => newInstance(d));

            const payload = {
                service: service.replace("service-", "").replace("-", "_"),
                subject: subject,
                entity: instances
            };

            dispatch(addOrOverwrite(payload));

            inProgress = inProgress.filter(item => item !== name);
            return instances;
        } catch (e) {
            console.log(e);

            if (!silent) {
                alert.error(!isNull(errorMessage) ? errorMessage[e.response.data.message] : e.response.data.message);
            }

            inProgress = inProgress.filter(item => item !== name);

            return null;
        }
    };

    return {
        findOneBy: findOneBy,
        findAll: findAll,
        findAllBy: findAllBy,
        create: async (service, subject, payload, newInstance, role = "sub_admin", silent = false) => {
            try {
                const response = await axios.post(
                    process.env.REACT_APP_API_URL + `/${service}/${role}/${subject}`,
                    payload,
                    role !== "guest"
                        ? {
                            headers: {
                                Authorization: `Bearer ${database.read("authentication", "access_token")}`,
                                EncoderVersion: "V5"
                            }
                        }
                        : null
                );

                if (!isNull(response.data.id)) {
                    if (isNull(window.global.websocketserver?.circuitBreaker)) {
                        window.global.websocketserver.circuitBreaker = [];
                    }

                    window.global.websocketserver.circuitBreaker.push(`${subject}-${response.data.id}`);

                    setTimeout(() => {
                        const index = window.global.websocketserver.circuitBreaker.findIndex(i => i === `${subject}-${response.data.id}`);

                        delete window.global.websocketserver.circuitBreaker[index];
                    }, 2000);

                    dispatch(addOrOverwrite({
                        service: service.replace("service-", "").replace("-", "_"),
                        subject: subject,
                        entity: newInstance(response.data)
                    }));
                }

                if (!silent) {
                    alert.launch("OK", "success");
                }

                return response.data.id;
            } catch (e) {
                console.log(e);

                if (!silent) {
                    alert.error(!isNull(errorMessage) ? errorMessage[e.response.data.message] : e.response.data.message);
                }

                return null;
            }
        },
        update: async (service, subject, id, prop, payload, newInstance, role = "sub_admin", silent = false) => {

            try {
                const response = await axios.patch(
                    process.env.REACT_APP_API_URL + `/${service}/${role}/${subject}/${id}/${prop.replace(new RegExp('_id$'), '')}`,
                    payload,
                    role !== "guest"
                        ? {
                            headers: {
                                Authorization: `Bearer ${database.read("authentication", "access_token")}`,
                                EncoderVersion: "V5"
                            }
                        }
                        : null
                );

                //findOneBy(service, subject, "id", id, role, 2);

                if (!silent) {
                    alert.launch("OK", "success");
                }

                if (isNull(window.global.websocketserver?.circuitBreaker)) {
                    window.global.websocketserver.circuitBreaker = [];
                }

                window.global.websocketserver.circuitBreaker.push(`${subject}-${id}`);

                setTimeout(() => {
                    const index = window.global.websocketserver.circuitBreaker.findIndex(i => i === `${subject}-${id}`);

                    delete window.global.websocketserver.circuitBreaker[index];
                }, 2000);

                dispatch(addOrOverwrite({
                    service: service.replace("service-", "").replace("-", "_"),
                    subject: subject,
                    entity: newInstance(response.data)
                }));

                return true;
            } catch (e) {
                console.log(e);

                if (!silent) {
                    alert.error(!isNull(errorMessage) ? errorMessage[e.response.data.message] : e.response.data.message);
                }

                return false;
            }
        },
        remove: async (service, subject, id, role = "sub_admin", silent = false) => {

            try {
                await axios.delete(
                    process.env.REACT_APP_API_URL + `/${service}/${role}/${subject}/${id}`,
                    role !== "guest"
                        ? {
                            headers: {
                                Authorization: `Bearer ${database.read("authentication", "access_token")}`,
                                EncoderVersion: "V5"
                            }
                        }
                        : null
                );

                if (!silent) {
                    alert.launch("OK", "success");
                }

                dispatch(remove({
                    service: service.replace("service-", "").replace("-", "_"),
                    subject: subject,
                    id: id
                }));

                return true;
            } catch (e) {
                console.log(e);

                if (!silent) {
                    alert.error(!isNull(errorMessage) ? errorMessage[e.response.data.message] : e.response.data.message);
                }

                return false;
            }
        }
    }
}
