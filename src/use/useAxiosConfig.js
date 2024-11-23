import axios from "axios";
import {useNavigate} from "react-router";
import database from "../package-react-wrapper/database/database.js";

export default function () {
    const navigate = useNavigate();

    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        database.write("authentication", "access_token", null);
                        navigate("/");
                    }
                }
            }
            return Promise.reject(error);
        }
    );
}