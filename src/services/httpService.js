import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const exportObject = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default exportObject;
