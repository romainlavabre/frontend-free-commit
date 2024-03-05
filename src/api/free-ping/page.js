import axios from "axios";
import getEnv from "../../mixin/getEnv";

const page = {
    async findPageByUri(uri) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-ping/guest/pages/${uri}`);

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
}

export default page;