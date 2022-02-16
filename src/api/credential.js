import axios from "axios";
import database from "../database/database";
import getEnv from "../mixin/getEnv";


const credential = {
    async findAll() {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + '/api/developer/credentials', this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async findById(id) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api/developer/credentials/${id}`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async create(payload) {
        const response = await axios.post(getEnv('REACT_APP_API_URL') + '/api/admin/credentials', payload, this.getConfig());
        return response.data;
    },
    async update(id, property, payload) {
        await axios.patch(getEnv('REACT_APP_API_URL') + `/api/admin/credentials/${id}/${property}`, payload, this.getConfig());
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

export default credential;
