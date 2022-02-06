import axios from "axios";

const prefix = '/auth';

const authentication = {
    async authenticate(username, password) {
        const params = new URLSearchParams()
        params.append('grant_type', 'password');
        params.append('client_id', 'fairfair-group-user');
        params.append('username', username);
        params.append('password', password);

        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + `${prefix}/realms/fairfair-group/protocol/openid-connect/token`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            return response.data;
        } catch (e) {
            return null;
        }

    }
}

export default authentication;
