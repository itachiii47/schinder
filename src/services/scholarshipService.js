import http from "./httpService";

export function viewPending(data) {
    return http.get(`/scholarship/view?_id=${data}`);
}
export function appliedScholarship() {
    return http.get("/scholarship/applied-scholarship");
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
export function approveScholarship(id) {
    return http.post(`/scholarship/approve-scholarship?id=${id}`);
}
const exportObject = {
    viewPending,
    createScholarship,
    studentDetail,
    apply,
    appliedScholarship,
    approveScholarship
};

export default exportObject;
