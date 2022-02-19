import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import React, {useEffect, useRef} from "react";
import api from "../../api/api";
import {load} from "../../store/project";
import Pagination from "../util/pagination/Pagination";
import getEnv from "../../mixin/getEnv";
import database from "../../database/database";
import dateFormatter from "../../mixin/dateFormatter";

export default function GetAll() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const projects = useSelector(state => state.project.projects);
    const intervalRef = useRef(null);

    const openProject = id => {
        navigate(`/project/${id}`)
    }

    useEffect(() => {
        fetchProjects();

        intervalRef.current = setInterval(async () => {
            fetchProjects();
        }, 10000);
    }, []);

    const fetchProjects = async () => {
        const projects = await api.project.findAll();
        dispatch(load(projects));
    }

    useEffect(() => () => clearInterval(intervalRef.current), []);

    return (
        <>
            <h4 className="font-bold">Projects</h4>

            <Pagination
                name="project"
                columns={[
                    {
                        key: "Id",
                        value: "project_id",
                        searchInput: true,
                        comparator: 'contains',
                        primary: true,
                        computedValue: data => {
                            return (
                                <span className="text-blue-500">
                                    #{data.project_id}
                                </span>
                            )
                        }
                    },
                    {
                        key: "Name",
                        value: "project_name",
                        searchInput: true,
                        comparator: 'contains'
                    },
                    {
                        key: "Last build status",
                        value: "build_last_exit_code",
                        searchInput: true,
                        comparator: 'eq',
                        computedValue: (data) => {
                            return (
                                <span className={data.build_last_exit_code === 0 ? "text-green-500" : "text-red-5000"}>
                                {data.build_last_exit_code} ({data.build_last_exit_message !== null ? data.build_last_exit_message : 'OK'})
                                </span>
                            )
                        }
                    },
                    {
                        key: "Last build at",
                        value: "build_last_created_at",
                        searchInput: true,
                        comparator: 'contains',
                        computedValue: (data) => {
                            return dateFormatter(data.build_last_created_at)
                        }
                    },

                ]}
                row={{
                    onClick: data => {
                        navigate(`/project/${data.project_id}`)
                    }
                }}
                fetch={{
                    url: getEnv('REACT_APP_API_URL') + '/api/developer/paginations/project',
                    options: {
                        headers: {
                            Authorization: 'Bearer ' + database.read(database.TABLE_AUTHENTICATION, "access_token")
                        }
                    },
                    interval: 3000
                }}
            />
        </>
    );
}
