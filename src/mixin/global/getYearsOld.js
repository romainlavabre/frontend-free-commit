import {LocalDate} from "@js-joda/core";

export default function (date, reference = new Date().toISOString()) {
    date = LocalDate.of(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDay());
    reference = LocalDate.of(new Date(reference).getFullYear(), new Date(reference).getMonth(), new Date(reference).getDay() === 0 ? 1 : new Date(reference).getDay());
    let result = LocalDate.of(0, 1, 1);

    result = result.plusYears(reference.minusYears(date.year()).year() - 1);
    result = result.plusMonths(((LocalDate.of(2000, 12, 31).monthValue() - date.monthValue()) + reference.monthValue()) - 1);

    if (result.year() === 0 && result.monthValue() === 0) {
        return "Quelques jours";
    }

    if (result.year() === 0) {
        return `~ ${result.monthValue()} mois`;
    }

    if (result.monthValue() - 2 === 0) {
        return `~ ${result.year()} ans`;
    }

    return `~ ${result.year()} ans et ${result.monthValue()} mois`
}
