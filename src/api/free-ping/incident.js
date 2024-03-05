import axios from "axios";
import getEnv from "../../mixin/getEnv";

const incident = {
    async countByUri(uri) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-ping/guest/incidents/${uri}`);

            return response.data.incident;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
}

export default incident;