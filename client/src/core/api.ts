import axios from "axios";
import { SERVER_URL } from "../shared/constants";

export default axios.create({
    baseURL: `${ SERVER_URL }/api/`,
    responseType: "json",
});



