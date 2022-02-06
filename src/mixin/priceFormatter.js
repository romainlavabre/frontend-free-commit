export default function (value){
    if (value === null) {
        return;
    }

    value = value.toString();

    if (value.includes('.')) {
        let sections = value.split('.');

        return sections[0] + "," + sections[1].substr(0, 2);
    }

    return value + ",00";
}
