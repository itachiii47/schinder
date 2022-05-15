import http from "./httpService";

export function login(data) {
    return http.post("/users/login", data);
}
export function signup(data) {
    return http.post("/users/signup", data);
}
export function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("access_token");
}
const exportObject = {
    login,
    signup,
    logout
};

export default exportObject;
