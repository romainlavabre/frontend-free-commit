import axios from "axios";
import database from "../../package-react-wrapper/database/database";
import getEnv from "../../mixin/getEnv";


const project = {
    async pagination(perPage = 10) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-commit/developer/paginations/project?per_page=${perPage}`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async findAll() {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + '/developer/projects', this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async findById(id) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/developer/projects/${id}`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async create(payload) {
        const response = await axios.post(getEnv('REACT_APP_API_URL') + '/admin/projects', payload, this.getConfig());
        return response.data;
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

export default project;
