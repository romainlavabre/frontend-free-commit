import axios from "axios";
import getEnv from "../../mixin/getEnv";
import database from "../../database/database";

const statistic = {
    async byPageByYearGroupByMonth(pageId, year) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-ping/admin/statistics/by/page/${pageId}/by/year/${year}/group/by/month`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async byPingByYearGroupByMonth(pingId, year) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-ping/admin/statistics/by/ping/${pingId}/by/year/${year}/group/by/month`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async byPageFromYearGroupByYear(pageId, year) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-ping/admin/statistics/by/page/${pageId}/from/year/${year}/group/by/year`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async byPingFromYearGroupByYear(pingId, year) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-ping/admin/statistics/by/ping/${pingId}/from/year/${year}/group/by/year`, this.getConfig());

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

export default statistic;