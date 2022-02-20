import React from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import mixin from "../../mixin/mixin";

export default function GetOne() {
    const {id} = useParams();
    const credential = useSelector(state => state.credential.credentials.find(credential => credential.id == id));


    if (mixin.isNull(credential)) {
        return null;
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">{credential.name}</h4>

                <table className="table table-auto">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{credential.name}</td>
                    </tr>
                    <tr>
                        <th>SSH Key</th>
                        <td>******</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
