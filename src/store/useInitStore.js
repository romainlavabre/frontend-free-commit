import {load as loadUser} from "./user";
import {load as loadProject} from "./project";
import {load as loadSecret} from "./secret";
import {load as loadCredential} from "./credential";
import {useDispatch, useSelector} from "react-redux";
import api from "../api/api";
import isNull from "../mixin/isNull";
import {useEffect} from "react";

export default function useInitStore() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);
    const projects = useSelector(state => state.project.projects);
    const secrets = useSelector(state => state.secret.secrets);
    const credentials = useSelector(state => state.credential.credentials);

    useEffect(() => {
        if (isNull(users) || users.length === 0) {
            api.user.findAll()
                .then(users => dispatch(loadUser(users)));
        }

        if (isNull(projects) || projects.length === 0) {
            api.project.findAll()
                .then(projects => dispatch(loadProject(projects)));
        }

        if (isNull(secrets) || secrets.length === 0) {
            api.secret.findAll()
                .then(secrets => dispatch(loadSecret(secrets)));
        }

        if (isNull(credentials) || credentials.length === 0) {
            api.credential.findAll()
                .then(credentials => dispatch(loadCredential(credentials)));
        }
    }, []);
}
