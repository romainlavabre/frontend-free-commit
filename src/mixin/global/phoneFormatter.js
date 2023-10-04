export default function phoneFormatter(phone) {
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
}
