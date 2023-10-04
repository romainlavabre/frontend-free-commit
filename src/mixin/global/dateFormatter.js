export default function (date, withTime = true, withDate = true) {
    let reference = null;

    if (date instanceof Date) {
        reference = date;
    } else {
        reference = new Date(date);
    }

    if (!withTime && withDate) {
        return `${reference.toLocaleDateString("fr-Fr")}`;
    }

    if (withTime && !withDate) {
        return `${reference.toLocaleTimeString("fr").split(':')[0]}:${reference.toLocaleTimeString("fr").split(':')[1]}`;
    }

    return `${reference.toLocaleDateString("fr-Fr")} à ${reference.toLocaleTimeString("fr").split(':')[0]}:${reference.toLocaleTimeString("fr").split(':')[1]}`
}
