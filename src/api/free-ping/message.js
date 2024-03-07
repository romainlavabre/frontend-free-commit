import axios from "axios";
import getEnv from "../../mixin/getEnv";

const ticket = {
    async findAllByToken(token) {
        try {
            const response = await axios.get(getEnv('REACT_APP_API_URL') + `/api-free-ping/guest/messages/by/token/${token}`);

            return response.data;
        } catch (e) {
            console.log(e)
            return null;
        }
    }
}

export default ticket;