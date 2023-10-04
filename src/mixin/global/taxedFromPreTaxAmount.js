export default function taxedFromPreTaxAmount(amount, vat) {
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
}
