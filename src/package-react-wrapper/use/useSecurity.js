import database from "../database/database";
import isNull from "../mixin/isNull";

export default function () {
    const accessToken = database.read("authentication", "access_token");
    const roles = database.read("authentication", "roles");
    const username = database.read("authentication", "username");
    const id = database.read("authentication", "id");
    const attributes = database.read("authentication", "attributes");

    if (isNull(accessToken)) {
        return {
            id: null,
            accessToken: null,
            roles: null,
            username: null,
            attributes: null,
            isDirector: null,
            isOperationalDirector: null
        }
    }

    return {
        id,
        accessToken,
        roles,
        username,
        attributes
    };
}
