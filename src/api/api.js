import authentication from "./free-commit/authentication";
import project from "./free-commit/project";
import user from "./free-commit/user";
import secret from "./free-commit/secret";
import credential from "./free-commit/credential";
import build from "./free-commit/build";
import config from "./free-commit/config";
import log from "./free-commit/log";
import freePingConfig from "./free-ping/config";
import ping from "./free-ping/ping";
import pagination from "./free-ping/pagination";
import statistic from "./free-ping/statistic";
import page from "./free-ping/page";
import incident from "./free-ping/incident";
import ticket from "./free-ping/ticket";
import message from "./free-ping/message";

const api = {
    authentication,
    project,
    user,
    secret,
    credential,
    build,
    log,
    config,
    freeping: {
        config: freePingConfig,
        ping: ping,
        pagination: pagination,
        statistic: statistic,
        page: page,
        incident: incident,
        ticket: ticket,
        message: message
    }
};

export default api;
