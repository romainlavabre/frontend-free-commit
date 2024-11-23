import axios from "axios";
import database from "../../package-react-wrapper/database/database";
import getEnv from "../../mixin/getEnv";


const user = {
    async findAll() {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + '/developer/developers', this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async findById(id) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/developer/developers/${id}`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e);
            return null;
        }
    },
    async create(payload) {
        const response = await axios.post(getEnv('REACT_APP_API_URL') + '/admin/developers', payload, this.getConfig());
        return response.data;
    },
    async update(id, property, payload) {
        await axios.patch(getEnv('REACT_APP_API_URL') + `/admin/developers/${id}/${property}`, payload, this.getConfig());
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

export default user;
