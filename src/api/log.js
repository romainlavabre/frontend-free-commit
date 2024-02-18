import axios from "axios";
import getEnv from "../mixin/getEnv";
import database from "../database/database";

const log = {
    async getExecutorLog(executorId, step, lineNumber) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api/developer/logs/${executorId}/${step}/${lineNumber}`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async getBuildLog(buildId, step) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api/developer/logs/${buildId}/${step}`, this.getConfig());

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

export default log;