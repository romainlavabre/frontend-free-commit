import axios from "axios";
import getEnv from "../../mixin/getEnv";
import database from "../../database/database";

const pagination = {
    async countOpenedIncident() {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-ping/admin/paginations/incident?per_page=10000&incident_at${encodeURIComponent("[")}eq${encodeURIComponent("]")}null`, this.getConfig());

            return response.data.total;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async findAllPing() {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-ping/admin/paginations/ping?per_page=1000000`, this.getConfig());

            return response.data.data;
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
export default pagination;