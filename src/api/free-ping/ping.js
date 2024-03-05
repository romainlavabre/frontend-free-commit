import axios from "axios";
import getEnv from "../../mixin/getEnv";
import database from "../../database/database";

const ping = {
    async addTechnicalEmail(pingId, technicalEmails) {
        try {
            const response = await axios.patch(getEnv('REACT_APP_API_URL') + `/api-free-ping/admin/pings/${pingId}/alert_technical_emails`, {
                ping: {
                    alert_technical_emails: technicalEmails
                }
            }, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async addTechnicalPhone(pingId, technicalPhones) {
        try {
            const response = await axios.patch(getEnv('REACT_APP_API_URL') + `/api-free-ping/admin/pings/${pingId}/alert_technical_phones`, {
                ping: {
                    alert_technical_phones: technicalPhones
                }
            }, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async addUserEmail(pingId, userEmails) {
        try {
            const response = await axios.patch(getEnv('REACT_APP_API_URL') + `/api-free-ping/admin/pings/${pingId}/alert_user_emails`, {
                ping: {
                    alert_user_emails: userEmails
                }
            }, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async findPageByUri(uri) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-ping/guest/pings/${uri}`);

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
export default ping;