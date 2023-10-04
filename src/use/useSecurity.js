import database from "../database/database";
import isNull from "../mixin/global/isNull";
import enums from "../enum/enums";

export default function () {
    const accessToken = database.read(database.TABLE_AUTHENTICATION, "access_token");
    const roles = database.read(database.TABLE_AUTHENTICATION, "roles");
    const username = database.read(database.TABLE_AUTHENTICATION, "username");
    const id = database.read(database.TABLE_AUTHENTICATION, "id");
    const attributes = database.read(database.TABLE_AUTHENTICATION, "attributes");

    if (!isNull(process.env.REACT_APP_ENV) && process.env.REACT_APP_ENV === "dev" && !isNull(process.env.REACT_APP_ADMIN_ID)) {
        return {
            id: process.env.REACT_APP_ADMIN_ID,
            accessToken,
            roles,
            username,
            attributes,
            isDirector: roles.includes(enums.role.GENERAL_DIRECTOR)
                || roles.includes(enums.role.TECHNICAL_DIRECTOR)
                || roles.includes(enums.role.OPERATIONAL_DIRECTOR),
            isOperationalDirector: roles.includes(enums.role.GENERAL_DIRECTOR)
                || roles.includes(enums.role.TECHNICAL_DIRECTOR)
                || roles.includes(enums.role.OPERATIONAL_DIRECTOR)
        };
    }

    return {
        id,
        accessToken,
        roles,
        username,
        attributes,
        isDirector: roles.includes(enums.role.GENERAL_DIRECTOR)
            || roles.includes(enums.role.TECHNICAL_DIRECTOR)
            || roles.includes(enums.role.OPERATIONAL_DIRECTOR),
        isOperationalDirector: roles.includes(enums.role.GENERAL_DIRECTOR)
            || roles.includes(enums.role.TECHNICAL_DIRECTOR)
            || roles.includes(enums.role.OPERATIONAL_DIRECTOR)
    };
}
