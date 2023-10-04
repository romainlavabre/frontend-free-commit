import {useDispatch} from "react-redux";
import {put} from "../store/background";

const TYPE_SALE_INVOICE_STATUS_BILLED = 0;
export default function () {
    const dispatch = useDispatch();


    return (title, worker, id) => {

        dispatch(put({
            title: title,
            worker: worker,
            id: id,
            inProgress: true
        }));

        /**
         switch (type) {
            case TYPE_SALE_INVOICE_STATUS_BILLED:

                 dispatch(put({
                    title: title,
                    file: URL.createObjectURL(new Blob([`(${saleInvoiceStatusBilledWorker.toString()})()`], {type: "application/javascript"})),
                    params: params
                }));
                break;
        }

         dispatch(put({
            title: title,
            file: URL.createObjectURL(new Blob([`(${file.toString()})()`], {type: "application/javascript"})),
            params: params
        }));
         */
    }
}