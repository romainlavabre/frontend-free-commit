import axios from "axios";
import database from "../database/database";


const build = {
    async findAllByProject(id) {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/api/developer/builds/by/project/${id}`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async getExecuteds() {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/api/developer/builds/executeds`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async getQueueds() {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/api/developer/builds/queueds`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async kill(executorId) {
        try {
            const response = await axios.delete(process.env.REACT_APP_API_URL + `/api/developer/builds/kill/${executorId}`, this.getConfig());

            return response.status === 204;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async launch(projectId) {
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + `/api/developer/builds/${projectId}`, {}, this.getConfig());

            return response.status === 201;
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

export default build;
