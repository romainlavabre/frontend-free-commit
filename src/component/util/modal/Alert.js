import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {closeAlert} from "../../../store/util";

function Alert() {
    const dispatcher = useDispatch();
    const alert = useSelector(state => state.util.modal.alert);
    const [background, setBackground] = useState(null);
    const [border, setBorder] = useState(null);
    const [text9, setText9] = useState(null);
    const [text5, setText5] = useState(null);

    // This shitty code (for the class) is there to counterbalance the fucking bug of tailwind
    useEffect(() => {
        if (alert.open) {
            if (alert.type === null || alert.type === undefined || alert.type === 'success') {
                setBackground('bg-teal-100');
                setBorder('border-teal-500');
                setText9('text-teal-900');
                setText5('text-teal-500');
            }

            if (alert.type === 'error') {
                setBackground('bg-red-100');
                setBorder('border-red-500');
                setText9('text-red-900');
                setText5('text-red-500');
            }

            if (alert.type === 'warning') {
                setBackground('bg-orange-100');
                setBorder('border-orange-500');
                setText9('text-orange-900');
                setText5('text-orange-500');
            }

            let interval = setInterval(() => {
                dispatcher(closeAlert());
                clearInterval(interval);
            }, 3000);

        }

    }, [alert.open])


    if (!alert.open) {
        return null;
    }

    return (
        <div className={'flex justify-end'}>
            <div
                className={background + ' border-t-4 ' + border + ' rounded-b ' + text9 + ' px-4 py-3 shadow-md fixed w-80 '}
                role="alert">
                <div className={'flex'}>
                    <div className={'py-1'}>
                        <svg className={'fill-current h-6 w-6 ' + text5 + ' mr-4'}
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20">
                            <path
                                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                        </svg>
                    </div>
                    <div>
                        <p className={'font-bold'}>{alert.title}</p>
                        {
                            alert.description !== undefined && alert.description !== null
                                ? (<p className={'text-sm'}>{alert.description}</p>)
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Alert;
