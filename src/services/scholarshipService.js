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
export function apply(userId, scholarshipId) {
    return http.post(`/scholarship/apply-scholarship?user=${userId}&scholarship=${scholarshipId}`);
}
const exportObject = {
    viewPending,
    createScholarship,
    studentDetail,
    apply
};

export default exportObject;
