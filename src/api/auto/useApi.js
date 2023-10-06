import {useDispatch, useSelector} from "react-redux";
import isNull from "../../mixin/global/isNull";
import config from "./config";
import axios from "axios";
import database from "../../database/database";
import {addOrOverwrite, remove} from "../../store/api";
import useAlert from "../../use/useAlert";
import enums from "../../enum/enums";
import getEnv from "../../mixin/getEnv";

let inProgress = [];

export default function useApi() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const alert = useAlert();

    const findOneBy = async (service, subject, prop, value, role = "sub_admin", consistencyLevel = 1, silent = false) => {
        let subjectStore = null;
        let subjectApi = null;

        if (subject.includes("::")) {
            subjectStore = subject.split("::")[0];
            subjectApi = subject.split("::")[1];
        } else {
            subjectStore = subject;
            subjectApi = subject;
        }

        const name = `findOneBy-${service}-${subject}-${prop}-${value}-${role}-${consistencyLevel}`;

        if (inProgress.includes(name)) {
            return null;
        }

        inProgress.push(name);

        let entity = searchEntity(service, subjectStore, prop, value, state, "findOneBy", consistencyLevel);

        if (entity !== null) {
            inProgress = inProgress.filter(item => item !== name);
            return entity;
        }

        try {
            const response = await axios.get(
                getEnv('REACT_APP_API_URL') + `/${service}/${role}/${subjectApi}/${prop === "id" ? value : `by/${prop.replace(new RegExp('_id$'), '')}/${value}`}`,
                role !== "guest"
                    ? {
                        headers: {
                            Authorization: `Bearer ${database.read(database.TABLE_AUTHENTICATION, "access_token")}`
                        }
                    }
                    : null
            );

            response.data.lastFetchAt = new Date();

            dispatch(addOrOverwrite({
                service: service.replace("service-", "").replace("-", "_"),
                subject: subjectStore,
                entity: response.data
            }));

            inProgress = inProgress.filter(item => item !== name);
            return response.data;
        } catch (e) {
            if (!silent) {
                alert.launch(!isNull(enums.error[e.response.data.message]) ? enums.error[e.response.data.message] : enums.error["DEFAULT_MESSAGE"], "error");
            }

            console.log(e);
            inProgress = inProgress.filter(item => item !== name);
            return null;
        }
    };

    const findAll = async (service, subject, role = "sub_admin", consistencyLevel = 1, silent = false) => {
        let subjectStore = null;
        let subjectApi = null;

        if (subject.includes("::")) {
            subjectStore = subject.split("::")[0];
            subjectApi = subject.split("::")[1];
        } else {
            subjectStore = subject;
            subjectApi = subject;
        }

        const name = `findOneBy-${service}-${subject}-${role}-${consistencyLevel}`;

        if (inProgress.includes(name)) {
            return null;
        }

        inProgress.push(name);

        let entity = searchEntity(service, subjectStore, null, null, state, "findAll", consistencyLevel);

        if (entity !== null) {
            inProgress = inProgress.filter(item => item !== name);
            return entity;
        }

        try {
            const response = await axios.get(
                getEnv('REACT_APP_API_URL') + `/${service}/${role}/${subjectApi}`,
                role !== "guest"
                    ? {
                        headers: {
                            Authorization: `Bearer ${database.read(database.TABLE_AUTHENTICATION, "access_token")}`
                        }
                    }
                    : null
            );

            for (let i = 0; i < response.data.length; i++) {
                response.data[i].lastFetchAt = new Date();
            }

            dispatch(addOrOverwrite({
                service: service.replace("service-", "").replace("-", "_"),
                subject: subjectStore,
                entity: response.data,
                findAllAt: new Date()
            }));

            inProgress = inProgress.filter(item => item !== name);
            return response.data;
        } catch (e) {
            if (!silent) {
                alert.launch(!isNull(enums.error[e.response.data.message]) ? enums.error[e.response.data.message] : enums.error["DEFAULT_MESSAGE"], "error");
            }

            console.log(e);
            inProgress = inProgress.filter(item => item !== name);
            return null;
        }
    };

    const findAllBy = async (service, subject, prop, value, role = "sub_admin", consistencyLevel = 1, silent = false) => {
        let subjectStore = null;
        let subjectApi = null;

        if (subject.includes("::")) {
            subjectStore = subject.split("::")[0];
            subjectApi = subject.split("::")[1];
        } else {
            subjectStore = subject;
            subjectApi = subject;
        }

        const name = `findOneBy-${service}-${subject}-${prop}-${value}-${role}-${consistencyLevel}`;

        if (inProgress.includes(name)) {
            return null;
        }

        inProgress.push(name);

        let entity = searchEntity(service, subjectStore, prop, value, state, "findAllBy", consistencyLevel);

        if (entity !== null) {
            inProgress = inProgress.filter(item => item !== name);
            return entity;
        }

        try {

            const response = await axios.get(
                getEnv('REACT_APP_API_URL') + `/${service}/${role}/${subjectApi}/${prop === "id" ? value : `by/${prop.replace(new RegExp('_id$'), '')}/${value}`}`,
                role !== "guest"
                    ? {
                        headers: {
                            Authorization: `Bearer ${database.read(database.TABLE_AUTHENTICATION, "access_token")}`
                        }
                    }
                    : null
            );

            for (let i = 0; i < response.data.length; i++) {
                response.data[i].lastFetchAt = new Date();
            }

            const payload = {
                service: service.replace("service-", "").replace("-", "_"),
                subject: subjectStore,
                entity: response.data,
                prop: prop,
                value: value
            };
            payload[`findAllBy-${prop}`] = new Date();

            dispatch(addOrOverwrite(payload));

            inProgress = inProgress.filter(item => item !== name);
            return response.data;
        } catch (e) {
            console.log(e);
            inProgress = inProgress.filter(item => item !== name);
            return null;
        }
    };

    return {
        findOneBy: findOneBy,
        findAll: findAll,
        findAllBy: findAllBy,
        create: async (service, subject, payload, role = "sub_admin", silent = false) => {
            let subjectStore = null;
            let subjectApi = null;

            if (subject.includes("::")) {
                subjectStore = subject.split("::")[0];
                subjectApi = subject.split("::")[1];
            } else {
                subjectStore = subject;
                subjectApi = subject;
            }

            try {
                const response = await axios.post(
                    getEnv('REACT_APP_API_URL') + `/${service}/${role}/${subjectApi}`,
                    payload,
                    role !== "guest"
                        ? {
                            headers: {
                                Authorization: `Bearer ${database.read(database.TABLE_AUTHENTICATION, "access_token")}`
                            }
                        }
                        : null
                );

                if (!isNull(response.data.id)) {
                    //findOneBy(service, subject, "id", response.data.id, role, 2);
                    response.data.lastFetchAt = new Date();

                    dispatch(addOrOverwrite({
                        service: service.replace("service-", "").replace("-", "_"),
                        subject: subjectStore,
                        entity: response.data
                    }));
                }

                if (!silent) {
                    alert.launch("OK", "success");
                }

                return response.data.id;
            } catch (e) {
                if (!silent) {
                    alert.launch(!isNull(enums.error[e.response.data.message]) ? enums.error[e.response.data.message] : enums.error["DEFAULT_MESSAGE"], "error");
                }

                console.log(e);
                return null;
            }
        },
        update: async (service, subject, id, prop, payload, role = "sub_admin", silent = false) => {
            let subjectStore = null;
            let subjectApi = null;

            if (subject.includes("::")) {
                subjectStore = subject.split("::")[0];
                subjectApi = subject.split("::")[1];
            } else {
                subjectStore = subject;
                subjectApi = subject;
            }


            try {
                const response = await axios.patch(
                    getEnv('REACT_APP_API_URL') + `/${service}/${role}/${subjectApi}/${id}/${prop.replace(new RegExp('_id$'), '')}`,
                    payload,
                    role !== "guest"
                        ? {
                            headers: {
                                Authorization: `Bearer ${database.read(database.TABLE_AUTHENTICATION, "access_token")}`
                            }
                        }
                        : null
                );

                //findOneBy(service, subject, "id", id, role, 2);

                if (!silent) {
                    alert.launch("OK", "success");
                }

                response.data.lastFetchAt = new Date();

                dispatch(addOrOverwrite({
                    service: service.replace("service-", "").replace("-", "_"),
                    subject: subjectStore,
                    entity: response.data
                }));

                return true;
            } catch (e) {
                console.log(e);

                if (!silent) {
                    alert.launch(!isNull(enums.error[e.response.data.message]) ? enums.error[e.response.data.message] : enums.error["DEFAULT_MESSAGE"], "error");
                }

                return false;
            }
        },
        remove: async (service, subject, id, role = "sub_admin", silent = false) => {
            let subjectStore = null;
            let subjectApi = null;

            if (subject.includes("::")) {
                subjectStore = subject.split("::")[0];
                subjectApi = subject.split("::")[1];
            } else {
                subjectStore = subject;
                subjectApi = subject;
            }

            try {
                await axios.delete(
                    getEnv('REACT_APP_API_URL') + `/${service}/${role}/${subjectApi}/${id}`,
                    role !== "guest"
                        ? {
                            headers: {
                                Authorization: `Bearer ${database.read(database.TABLE_AUTHENTICATION, "access_token")}`
                            }
                        }
                        : null
                );

                dispatch(remove({
                    service: service.replace("service-", "").replace("-", "_"),
                    subject: subjectStore,
                    id: id
                }));

                return true;
            } catch (e) {
                if (!silent) {
                    alert.launch(!isNull(enums.error[e.response.data.message]) ? enums.error[e.response.data.message] : enums.error["DEFAULT_MESSAGE"], "error");
                }

                console.log(e);
                return false;
            }
        }
    }
}

function searchEntity(service, subject, prop, value, state, method = "findOneBy", consistencyLevel = 1) {
    if (parseInt(consistencyLevel) === 2) {
        return null;
    }

    service = service.replace("service-", "").replace("-", "_");

    if (isNull(state.api?.[service]?.[subject])) {
        return null;
    }

    let result;

    if (value !== null) {
        if (method.startsWith("findOne")) {
            result = state.api[service][subject].values.find(item => item !== undefined && item[prop] == value);
        } else {
            result = state.api[service][subject].values.filter(item => item !== undefined && item[prop] == value);
        }
    } else {
        result = state.api[service][subject].values;
    }

    if (isNull(result) || result.length === 0) {
        return null;
    }

    if (parseInt(consistencyLevel) === 0) {
        return result;
    }

    if (method === "findOneBy") {
        if (new Date().getTime() / 1000 - result.lastFetchAt.getTime() / 1000 > config[service][subject].cacheLifeTime) {
            return null;
        }
    } else if (method === "findAll") {
        if (!isNull(state.api[service][subject].metadata.findAllAt)
            && new Date().getTime() / 1000 - state.api[service][subject].metadata.findAllAt.getTime() / 1000 > config[service][subject].cacheLifeTimeFindAll) {
            return null;
        }

        for (let i = 0; i < result.length; i++) {
            if (isNull(result[i])) {
                continue;
            }

            if (new Date().getTime() / 1000 - result[i].lastFetchAt.getTime() / 1000 > config[service][subject].cacheLifeTime) {
                return null;
            }
        }
    } else if (method === "findAllBy") {
        if (!isNull(state.api[service][subject].metadata[`findAllBy-${prop}`])
            && new Date().getTime() / 1000 - state.api[service][subject].metadata[`findAllBy-${prop}`].getTime() / 1000 > config[service][subject][`cacheLifeTimeFindAllBy_${prop}`]) {
            return null;
        }

        for (let i = 0; i < result.length; i++) {
            if (isNull(result[i])) {
                continue;
            }

            if (new Date().getTime() / 1000 - result[i].lastFetchAt.getTime() / 1000 > config[service][subject].cacheLifeTime) {
                return null;
            }
        }
    }

    return result;
}
