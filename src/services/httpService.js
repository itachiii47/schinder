import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

// axios.interceptors.request.use(async (config) => {
//     // Current user info
//     const data = auth.userData();
//     // if request is not triggered for auth token
//     if (config.url !== "/auth/signin/" && config.url !== "/auth/signup/" && config.url !== "/auth/verification") {
//         // if the user holding a token which is expired or not
//         if (data.accessToken) {
//             // set headers
//             config.headers["x-auth-token"] = data.accessToken;
//             config.headers["Content-Type"] = "application/json";
//         }
//     }

//     return config;
// });

// axios.interceptors.response.use(null, async (error) => {
//     const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;

//     // logout user if token refresh didn't work properly
//     if (error.config.url === "/auth/refresh") {
//         // redirect user
//         // TODO - redirect with Hash Router
//         window.location = "#/sign-out";
//         // reject promise
//         return Promise.reject(error);
//     }

//     if (!expectedErrors) {
//         //console.log("Logging ", error);
//         toast.error("An unexpected error occured");
//     }

//     if (error.response.status === 401) {
//         // Try request again with new token
//         return auth
//             .refreshToken()
//             .then(() => {
//                 // New request with new token
//                 let data = auth.userData();
//                 const config = error.config;
//                 config.headers["x-auth-token"] = data.accessToken;

//                 return new Promise((resolve, reject) => {
//                     axios
//                         .request(config)
//                         .then((response) => {
//                             resolve(response);
//                         })
//                         .catch((error) => {
//                             reject(error);
//                         });
//                 });
//             })
//             .catch((error) => {
//                 return Promise.reject(error);
//             });
//     }
//     return Promise.reject(error);
// });

const exportObject = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default exportObject;
