export default function (origin, newValue) {
    if (origin == newValue) {
        return true;
    }

    if ((origin === undefined || origin === null || origin === "")
        && (newValue === undefined || newValue === null || newValue === "")) {
        return true;
    }

    if ((origin === true || origin === 1 || origin === "true")
        && (newValue === true || newValue === 1 || newValue === "true")) {
        return true;
    }

    if ((origin === false || origin === 0 || origin === "false")
        && (newValue === false || newValue === 0 || newValue === "false")) {
        return true;
    }

    return false;
}
