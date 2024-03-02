import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import BackIcon from "../../util/icon/BackIcon";
import Template from "./template/Template";
import useApi from "../../../api/auto/useApi";
import MultipleCard from "../../util/card/MultipleCard";
import Metadata from "./metadata/Metadata";

export default function () {
    const {findOneBy} = useApi();
    const navigate = useNavigate();
    const {id} = useParams();
    const ping = useSelector(state => state.api?.["api-free-ping"]?.pings?.values[id]);

    useEffect(() => {
        findOneBy("api-free-ping", "pings", "id", id, "admin");
    }, []);

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-center text-3xl">{ping?.title}</h4>
                </div>
                <div>
                    <button className="badge-blue-square ml-3" onClick={() => navigate(`/free-ping/ping`)}>
                        <BackIcon size={8}/>
                    </button>
                </div>
            </div>
            <hr className="my-5 w-8/12 mx-auto"/>
            <div>
                <MultipleCard
                    key={"menu"}
                    items={[
                        {
                            title: "Metadata",
                            component: <Metadata id={id}/>
                        },
                        {
                            title: "Templates",
                            component: <Template pingId={id}/>
                        },
                        {
                            title: "Recipients",
                            component: null
                        }
                    ]}
                />
            </div>
        </div>
    );
}