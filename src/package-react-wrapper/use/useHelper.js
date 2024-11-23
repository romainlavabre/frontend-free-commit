import {LocalDate} from "@js-joda/core";
import {Chip} from "@mui/material";
import isNull from "../mixin/isNull";

export default function () {
    return {
        formatDate(date, withTime = true, withDate = true) {
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
        },
        uuid() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        },
        inputFileToRequestFile: async file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = async (e) => {
                    let contentType = file.type;
                    let content = e.target.result.replace("data:" + contentType + ";base64,", "");

                    const parts = file.name.split(".");

                    parts.pop();

                    resolve({"content": content, "content-type": contentType, "name": parts.join("-")});
                };

                reader.onerror = reject;

                reader.readAsDataURL(file);
            });
        },
        phoneFormatter: (phone) => {
            if (phone === null || phone === undefined) {
                return null;
            }

            phone = phone.replace("+33", "0").split("");

            let result = "";
            for (let i = 0; i < phone.length; i++) {
                if (Math.abs(i % 2) == 1) {
                    result += `${phone[i]} `;
                } else {
                    result += `${phone[i]}`;
                }
            }

            return result;
        },
        getYearsOld: (date, reference = new Date().toISOString()) => {
            date = LocalDate.parse(date);
            reference = LocalDate.parse(reference.split("T")[0]);

            let result = LocalDate.of(
                reference.minusYears(date.year()).year(),
                reference.monthValue(),
                1
            );

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
        },
        phoneToLink: phone => {
            if (isNull(phone)) return "";

            if (phone.startsWith("+336") || phone.startsWith("+337")) {
                return `tel:${phone}`;
            }

            return `tel:${phone.replace("+33", "0")}`;
        },
        priceFormatter: (value) => {
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
        },
        getTimeAge: (date, size = "normal") => {
            const createdAt = new Date(date);
            const now = new Date();
            const diff = now - createdAt;
            const daysDiff = Math.floor(diff / (24 * 3600 * 1000));
            const hoursDiff = Math.floor(diff / (60 * 60 * 1000)) - daysDiff * 24;
            const minutesDiff = Math.floor(diff / (60 * 1000)) - (daysDiff * 24 * 60 + hoursDiff * 60);
            let result = "";
            let color = "success";

            if (daysDiff > 0) {
                result += `${daysDiff}j `
            }

            if (hoursDiff > 0) {
                result += `${hoursDiff}h `
            }

            if (minutesDiff > 0 && daysDiff === 0) {
                result += `${minutesDiff}m`
            }

            if (result.length === 0) {
                result = "<1m";
            }

            if (diff / 1000 > 60 * 60 * 5) {
                color = "error";
            } else if (diff / 1000 > 60 * 60 * 3) {
                color = "warning";
            } else if (diff / 1000 > 60 * 15) {
                color = "secondary";
            }


            return (
                <Chip size={size} sx={{fontSize: size}} label={result} color={color}/>
            );
        },
        taxedFromPreTaxAmount(amount, vat) {
            switch (vat) {
                case 0:
                    return amount;
                case 10:
                    return amount * 1.1;
                case 20:
                    return amount * 1.2;
                default:
                    console.log("Vat not supported")
                    return amount;
            }
        },
        addressToName(address, withHtml = true){
            if (!address.split("@")[0].includes(".")) {
                if (withHtml) {
                    return (
                        <>
                            {address.split("@")[0].substring(0, 1).toUpperCase()}{address.split("@")[0].substring(1)}
                        </>
                    )
                }

                return address.split("@")[0].substring(0, 1).toUpperCase() + address.split("@")[0].substring(1);
            }

            if (withHtml) {
                return (
                    <>
                        {address.split("@")[0].split(".")[0].substring(0, 1).toUpperCase()}
                        {address.split("@")[0].split(".")[0].substring(1)}
                        <span className="ml-1"></span>
                        {address.split("@")[0].split(".")[1].substring(0, 1).toUpperCase()}
                        {address.split("@")[0].split(".")[1].substring(1)}
                    </>
                )
            }

            return address.split("@")[0].split(".")[0].substring(0, 1).toUpperCase() + address.split("@")[0].split(".")[0].substring(1) + " " + address.split("@")[0].split(".")[1].substring(0, 1).toUpperCase() + address.split("@")[0].split(".")[1].substring(1);
        }
    }
}