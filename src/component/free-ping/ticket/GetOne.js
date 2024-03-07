import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import BackIcon from "../../util/icon/BackIcon";
import useApi from "../../../api/auto/useApi";
import dateFormatter from "../../../mixin/global/dateFormatter";
import isNull from "../../../mixin/global/isNull";
import Create from "./message/Create";
import LinkIcon from "../../util/icon/LinkIcon";

export default function () {
    const {findOneBy, findAllBy, update} = useApi();
    const navigate = useNavigate();
    const {id} = useParams();
    const ticket = useSelector(state => state.api?.["api-free-ping"]?.tickets?.values[id]);
    const messages = useSelector(state => state.api?.["api-free-ping"]?.messages?.values?.filter(message => message?.ticket_id == id))

    useEffect(() => {
        findOneBy("api-free-ping", "tickets", "id", id, "admin");
        findAllBy("api-free-ping", "messages", "ticket_id", id, "admin");
    }, []);

    const close = () => {
        update("api-free-ping", "tickets", id, "closed_at", null, "admin");
    }

    if (isNull(ticket)) return null;

    return (
        <div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <h4 className="text-center text-3xl">{ticket?.title}</h4>
                    <div className="ml-10">
                        {
                            isNull(ticket?.closed_at)
                                ? <span className="badge-green">Open</span>
                                : <span className="badge-red">Close</span>
                        }
                    </div>
                    <div className="ml-10">
                        <a href={`${window.location.protocol}//${window.location.host}/public/tickets/${ticket.token}`}
                           target="_blank"
                           className="link flex">
                            <div className="mx-3">
                                <LinkIcon size={6}/>
                            </div>
                            <div>
                                Link
                            </div>
                        </a>
                    </div>
                </div>
                <div>
                    <button className="badge-blue-square ml-3" onClick={() => navigate(`/free-ping/ticket`)}>
                        <BackIcon size={8}/>
                    </button>
                </div>
            </div>
            <hr className="my-5 w-8/12 mx-auto"/>
            <div>
                {
                    messages?.map(message => (
                        <div key={message.id}>
                            <div className="font-bold">{dateFormatter(message.created_at)}</div>
                            <div dangerouslySetInnerHTML={{__html: message.content.replaceAll("\n", "<br/>")}}></div>
                            <hr className="w-12/12 mx-auto"/>
                        </div>
                    ))
                }

                {
                    !isNull(ticket) && isNull(ticket.closed_at)
                        ? <Create key={messages?.length} ticketId={id}/>
                        : null
                }

                {
                    !isNull(ticket) && isNull(ticket.closed_at)
                        ? (
                            <div>
                                <button className="badge-red-square" onClick={close}>
                                    Close ticket
                                </button>
                            </div>
                        )
                        : null
                }
            </div>
        </div>
    );
}