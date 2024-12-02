import authentication from "./free-commit/authentication";
import project from "./free-commit/project";
import user from "./free-commit/user";
import secret from "./free-commit/secret";
import credential from "./free-commit/credential";
import build from "./free-commit/build";
import config from "./free-commit/config";
import log from "./free-commit/log";
import statistic from "./free-commit/statistic";

const api = {
    authentication,
    project,
    user,
    secret,
    credential,
    build,
    log,
    config,
    statistic
};

export default api;
