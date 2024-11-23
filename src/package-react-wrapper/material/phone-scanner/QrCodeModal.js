import QRCode from "react-qr-code";

export default function ({phone}) {

    return <QRCode value={phone}/>;
}