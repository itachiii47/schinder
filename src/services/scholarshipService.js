import http from "./httpService";

export function viewPending() {
    return http.get("/scholarship/view");
}
export function createScholarship(data) {
    return http.post("/scholarship/creation", data);
}
const exportObject = {
    viewPending,
    createScholarship
};

export default exportObject;
