import axios from "axios";

const authentication = {
    async authenticate(username, password) {
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + `/api/auth`, {
                "auth": {
                    username,
                    password
                }
            });

            return response.data;
        } catch (e) {
            return null;
        }

    }
}

export default authentication;
