import axios from "axios";
import database from "../../package-react-wrapper/database/database";
import getEnv from "../../mixin/getEnv";


const statistic = {
    async sumDuration() {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + '/api-free-commit/developer/statistics/sum/duration', this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    getConfig() {
        const accessToken = database.read("authentication", 'access_token');

        return {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
    }
}

export default statistic;
