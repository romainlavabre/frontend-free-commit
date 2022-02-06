export default function (date) {
    let reference = null;

    if (date instanceof Date) {
        reference = date;
    } else {
        reference = new Date(date);
    }

    return `${reference.toLocaleDateString("fr-Fr")} à ${reference.toLocaleTimeString("fr").split(':')[0]}h${reference.toLocaleTimeString("fr").split(':')[1]}`
}
