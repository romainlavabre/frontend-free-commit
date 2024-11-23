import axios from "axios";
import database from "../../package-react-wrapper/database/database";
import getEnv from "../../mixin/getEnv";


const build = {

    async findById(id) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-commit/developer/builds/${id}`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async getOutput(executorId) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-commit/developer/builds/output/${executorId}`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async getExecuteds() {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-commit/developer/builds/executeds`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async getQueueds() {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-commit/developer/builds/queueds`, this.getConfig());

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async killExecuted(executorId) {
        try {
            const response = await axios.delete(getEnv('REACT_APP_API_URL') + `/api-free-commit/developer/builds/kill/executed/${executorId}`, this.getConfig());

            return response.status === 204;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async killQueued(executorId) {
        try {
            const response = await axios.delete(getEnv('REACT_APP_API_URL') + `/api-free-commit/developer/builds/kill/queued/${executorId}`, this.getConfig());

            return response.status === 204;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
    async launch(projectId, ignoreSteps) {
        return await axios.post(getEnv('REACT_APP_API_URL') + `/api-free-commit/developer/builds/${projectId}`, {
            build: {
                ignore_steps: ignoreSteps
            }
        }, this.getConfig());
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

export default build;
