import React, {Fragment, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useDispatch, useSelector} from "react-redux";
import {closeInfo} from "../../../store/util";

function Info() {
    const dispatch = useDispatch();
    const cancelButtonRef = useRef(null);
    const open = useSelector(state => state.util.modal.info.open);
    const title = useSelector(state => state.util.modal.info.title);
    const description = useSelector(state => state.util.modal.info.description);

    const close = () => {
        dispatch(closeInfo());
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className={'fixed z-10 inset-0 overflow-y-auto'} initialFocus={cancelButtonRef}
                    onClose={() => close()}>
                <div
                    className={'flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-50"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className={'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'}/>
                    </Transition.Child>

                    <span className={'hidden sm:inline-block sm:align-middle sm:h-screen'} aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className={'inline-block align-top rounded-sm text-left overflow-hidden shadow-xl transform transition-all w-full'}>
                            <div className={'flex flex-row bg-light px-4 pt-5 pb-4 w-full justify-center'}>
                                {description}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default Info;
