import axios from "axios";
import database from "../database/database";


const secret = {
    async findAll() {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/api/developer/secrets', this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async create(payload) {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/secrets', payload, this.getConfig());
        return response.data;
    },
    async update(id, property, payload) {
        await axios.patch(process.env.REACT_APP_API_URL + `/api/admin/secrets/${id}/${property}`, payload, this.getConfig());
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

export default secret;
