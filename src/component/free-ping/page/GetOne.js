import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import BackIcon from "../../util/icon/BackIcon";
import useApi from "../../../api/auto/useApi";
import MultipleCard from "../../util/card/MultipleCard";
import Metadata from "./metadata/Metadata";
import Statistic from "../statistic/Statistic";

export default function () {
    const {findOneBy} = useApi();
    const navigate = useNavigate();
    const {id} = useParams();
    const page = useSelector(state => state.api?.["api-free-ping"]?.pages?.values[id]);

    useEffect(() => {
        findOneBy("api-free-ping", "pages", "id", id, "admin");
    }, []);

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-center text-3xl">{page?.title}</h4>
                </div>
                <div>
                    <button className="badge-blue-square ml-3" onClick={() => navigate(`/free-ping/page`)}>
                        <BackIcon size={8}/>
                    </button>
                </div>
            </div>
            <hr className="my-5 w-8/12 mx-auto"/>
            <div>
                <MultipleCard
                    key={"menu"}
                    gridColsNumber={"grid-cols-2"}
                    items={[
                        {
                            title: "Metadata",
                            component: <Metadata pageId={id}/>
                        },
                        {
                            title: "Statistic",
                            component: <Statistic pageId={id}/>
                        }
                    ]}
                />
            </div>
        </div>
    );
}