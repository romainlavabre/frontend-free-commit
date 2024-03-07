import React, {useEffect, useRef, useState} from "react";
import isNull from "../../../mixin/global/isNull";
import api from "../../../api/api";
import {useParams} from "react-router";
import dateFormatter from "../../../mixin/global/dateFormatter";

export default function () {
    const params = useParams();
    const [ticket, setTicket] = useState(null);
    const [messages, setMessages] = useState(null);
    const interval = useRef();

    useEffect(() => {
        const fetch = async () => {
            setTicket((await api.freeping.ticket.findOneByToken(params["*"])));
            setMessages((await api.freeping.message.findAllByToken(params["*"])))
        }

        fetch();

        interval.current = setInterval(() => {
            fetch();
        }, 10000);

        return () => clearInterval(interval.current);
    }, []);
    if (isNull(ticket) || isNull(messages)) return null;

    return (
        <div className="w-full bg-white h-screen text-gray-600 p-5">
            <div className="w-6/12 mx-auto">
                <div className="">
                    <h1 className="text-center text-3xl font-bold text-gray-500">{ticket.title}</h1>
                </div>

                <div
                    className="mt-10 p-5 rounded"
                    style={{boxShadow: "0 15px 35px rgba(50,50,93,0.1), 0 5px 15px #a3a3a3"}}
                >
                    <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-500">
                        </div>
                        <div className="ml-9 text-gray-400">
                            <div>
                                Ticket opened at {dateFormatter(ticket.created_at)}
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-300 w-11/12 mx-auto"/>
                    {
                        messages.map(message => (
                            <div key={message.id} className="mt-5">
                                <div className="flex items-center">
                                    <div className="h-3 w-3 animate-pulse rounded-full bg-teal-400">
                                    </div>
                                    <div className="ml-9 text-gray-400">
                                        {dateFormatter(message.created_at)}
                                    </div>
                                </div>
                                <div className="ml-12"
                                     dangerouslySetInnerHTML={{__html: message.content.replaceAll(/(?:\r\n|\r|\n)/g, '<br />')}}>
                                </div>
                                <hr className="border-gray-300 w-11/12 mx-auto"/>
                            </div>
                        ))
                    }
                    {
                        !isNull(ticket.closed_at)
                            ? (
                                <div className="flex items-center mt-5">
                                    <div className="h-3 w-3 rounded-full bg-red-500">
                                    </div>
                                    <div className="ml-9 text-gray-400">
                                        <div>
                                            Ticket closed at {dateFormatter(ticket.closed_at)}
                                        </div>
                                    </div>
                                </div>
                            )
                            : null
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