import http from "./httpService";

export function viewPending() {
    return http.get("/scholarship/view");
}
export function createScholarship(data) {
    return http.post("/scholarship/creation", data);
}
export function studentDetail(data) {
    return http.post("/users/student", data);
}
const exportObject = {
    viewPending,
    createScholarship,
    studentDetail
};

export default exportObject;
