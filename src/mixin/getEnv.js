export default function (env) {
    return window.globalConfig[env] !== undefined
        ? window.globalConfig[env]
        : process.env.REACT_APP_API_URL;
}
