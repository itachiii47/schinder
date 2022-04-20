import http from "./httpService";

export function login(data) {
    return http.post("/users/login", data);
}
export function signup(data) {
    return http.post("/users/signup", data);
}

const exportObject = {
    login,
    signup
};

export default exportObject;
