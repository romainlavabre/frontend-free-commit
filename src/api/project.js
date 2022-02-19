import axios from "axios";
import database from "../database/database";
import getEnv from "../mixin/getEnv";


const project = {
    async findAll() {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + '/api/developer/projects', this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async findById(id) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api/developer/projects/${id}`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async create(payload) {
        const response = await axios.post(getEnv('REACT_APP_API_URL') + '/api/admin/projects', payload, this.getConfig());
        return response.data;
    },
    async update(id, property, payload) {
        await axios.patch(getEnv('REACT_APP_API_URL') + `/api/admin/projects/${id}/${property}`, payload, this.getConfig());
    },
    async delete(id) {
        await axios.delete(getEnv('REACT_APP_API_URL') + `/api/admin/projects/${id}`, this.getConfig());
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

export default project;
