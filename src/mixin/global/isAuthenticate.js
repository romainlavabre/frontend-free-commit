import mixin from "./mixin";

export default function (accessToken) {
    if (accessToken === null) {
        return false;
    }

    const decodedAccessToken = mixin.decodeAccessToken(accessToken);

    if (!decodedAccessToken.realm_access.roles.includes('ROLE_FAIRFAIR_EMERGENCY_ARTISAN')
        || !decodedAccessToken.realm_access.roles.includes('ROLE_FAIRFAIR_USER_ARTISAN')) {
        return false;
    }

    return true;
}
