import axios from "axios";
import database from "../../database/database";
import getEnv from "../../mixin/getEnv";


const config = {
    async checkEmail(email) {
        try {
            const response = await axios.post(
                getEnv('REACT_APP_API_URL') + `/api-free-commit/admin/config/mail/test/${email}`, null, this.getConfig()
            );

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async getEnv() {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-commit/admin/config/env`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    getConfig() {
        const accessToken = database.read(database.TABLE_AUTHENTICATION, 'access_token');

        return {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
    }
}

export default config;
