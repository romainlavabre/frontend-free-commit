import axios from "axios";
import getEnv from "../mixin/getEnv";

const authentication = {
    async authenticate(username, password) {
        try {
            const response = await axios.post(getEnv('REACT_APP_API_URL') + `/api/auth/token`, {
                "auth": {
                    username,
                    password
                }
            });

            return response.data;
        } catch (e) {
            console.log(e);
            return null;
        }

    }
}

export default authentication;
