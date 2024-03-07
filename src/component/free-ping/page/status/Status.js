import {useParams} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import api from "../../../../api/api";
import isNull from "../../../../mixin/global/isNull";
import CheckCircleIcon from "../../../util/icon/CheckCircleIcon";
import priceFormatter from "../../../../mixin/global/priceFormatter";

export default function () {
    const params = useParams();
    const [page, setPage] = useState(null);
    const [pings, setPings] = useState(null);
    const [countIncident, setCountIncident] = useState(0);
    const interval = useRef();

    useEffect(() => {
        const fetch = async () => {
            setPage((await api.freeping.page.findPageByUri(params["*"])));
            setPings((await api.freeping.ping.findPageByUri(params["*"])));
        }

        const countIncident = async () => {
            setCountIncident((await api.freeping.incident.countByUri(params["*"])));
        }
        fetch();
        countIncident();

        interval.current = setInterval(() => {
            fetch();
            countIncident();
        }, 10000);

        return () => clearInterval(interval.current);
    }, []);


    if (isNull(page) || isNull(pings)) return null;

    return (
        <div className="w-full bg-white min-h-screen text-gray-600 p-5">
            <div className="w-6/12 mx-auto">
                <div className="grid grid-cols-3">
                    <div className="col-span-1 ">
                        <img src={page.logo} style={{width: "auto", height: "auto"}}/>
                    </div>
                    <div className="col-span-1">
                        <h1 className="text-center text-3xl font-bold">{page.title}</h1>
                    </div>
                </div>

                {
                    countIncident === 0
                        ? (
                            <div className="bg-green-600 text-white flex items-center mt-10 rounded h-20"
                                 style={{boxShadow: "0 15px 35px rgba(50,50,93,0.1), 0 5px 15px #d1d5db"}}>
                                <div className="mx-10 bg-white text-green-600 rounded-full">
                                    <CheckCircleIcon size={10}/>
                                </div>
                                <div className="uppercase font-bold text-2xl">
                                    All systems operational
                                </div>
                            </div>
                        )
                        : (
                            <div className="bg-red-500 text-white flex items-center mt-10 rounded h-20"
                                 style={{boxShadow: "0 15px 35px rgba(50,50,93,0.1), 0 5px 15px #d1d5db"}}>
                                <div className="mx-10 bg-white text-red-600 rounded-full">
                                    <CheckCircleIcon size={10}/>
                                </div>
                                <div className="uppercase font-bold text-2xl">
                                    {countIncident} outage
                                </div>
                            </div>
                        )
                }

                <div className="text-center mt-10 font-bold">Status : Last 7 days</div>

                <div
                    className="mt-10 p-5 rounded"
                    style={{boxShadow: "0 15px 35px rgba(50,50,93,0.1), 0 5px 15px #a3a3a3"}}
                >
                    <h2 className="text-right text-sm">The system has an availability rate
                        of {priceFormatter(page.availability_percent)}% by {new Date().getFullYear()}</h2>
                    {
                        pings.map(ping => (
                            <div key={ping.title} className="grid grid-cols-2 mt-5">
                                <div className="col-span-1 flex">
                                    {
                                        ping.has_down_time
                                            ? (
                                                <div className="bg-red-500 rounded-full text-white" title="Down time">
                                                    <CheckCircleIcon size={7}/>
                                                </div>
                                            )
                                            : null
                                    }

                                    {
                                        ping.has_slow_down
                                            ? (
                                                <div className="bg-orange-600 rounded-full text-white" title="Slow down">
                                                    <CheckCircleIcon size={7}/>
                                                </div>
                                            )
                                            : null
                                    }

                                    {
                                        !ping.has_down_time && !ping.has_slow_down
                                            ? (
                                                <div className="bg-green-600 rounded-full text-white" title="Up">
                                                    <CheckCircleIcon size={7}/>
                                                </div>
                                            )
                                            : null
                                    }

                                    <div className="text-lg mx-5 link my-auto">
                                        {ping.title}
                                    </div>
                                </div>
                                <div className="col-span-1 grid grid-cols-2 font-bold text-gray-400">
                                    <div className="col-span-1 my-auto">
                                        {priceFormatter(ping.availability_percent)} % availability
                                    </div>
                                    <div className="col-span-1 text-right my-auto">
                                        {ping.downtime_minute} minute downtime
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <hr className="w-10/12 mx-auto border-gray-300"/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="mt-5 text-center text-gray-400">
                <span className="font-bold">System monitoring</span> powered by <a
                href="https://romain.gitbook.io/free-commit/" target="_blank" className="font-bold link">Free Tools
                Suite (Open source & Free in a self hosted context)</a>
            </div>
        </div>
    );
}