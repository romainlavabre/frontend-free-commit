import Menu from "../component/Menu";
import React, {useState} from "react";
import List from "../component/user/List";
import Create from "../component/user/Create";

export default function User() {
    const [showUserForm, setShowUserForm] = useState(false);

    const onShowUserClicked = () => {
        setShowUserForm(true);
    }

    return (
        <>
            <div className="flex flex-row">
                <div className="">
                    <Menu activeName={'user'}/>
                </div>
                <div className="w-full m-3">
                    <div className="flex justify-end">
                        <button className="bg-ovh rounded py-2 px-10" onClick={onShowUserClicked}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path
                                    d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                            </svg>
                        </button>
                    </div>
                    {
                        showUserForm
                            ? <Create/>
                            : <List/>
                    }
                </div>
            </div>
        </>
    )
}
