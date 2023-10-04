export default function (value) {
    if (value === null || value === undefined) {
        return;
    }

    value = value.toString();

    if (value.includes('.')) {
        let sections = value.split('.');

        const decimals = sections[1].substr(0, 2);

        return sections[0] + "," + (decimals.toString().length === 2 ? decimals : `${decimals}0`);
    }

    return value + ",00";
}
