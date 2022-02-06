import axios from "axios";
import database from "../database/database";


const project = {
    async findAll() {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/api/developer/developers', this.getConfig());

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

export default project;
