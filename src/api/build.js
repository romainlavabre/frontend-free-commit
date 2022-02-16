import axios from "axios";
import database from "../database/database";
import getEnv from "../mixin/getEnv";


const build = {
    async findAllByProject(id) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api/developer/builds/by/project/${id}`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async findById(id) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api/developer/builds/${id}`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async getOutput(executorId) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api/developer/builds/output/${executorId}`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async getExecuteds() {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api/developer/builds/executeds`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async getQueueds() {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api/developer/builds/queueds`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async kill(executorId) {
        try {
            const response = await axios.delete(getEnv('REACT_APP_API_URL') + `/api/developer/builds/kill/${executorId}`, this.getConfig());

            return response.status === 204;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async launch(projectId) {
        return await axios.post(getEnv('REACT_APP_API_URL') + `/api/developer/builds/${projectId}`, {}, this.getConfig());
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
