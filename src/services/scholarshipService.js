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
export function approveScholarship(id, approve) {
    return http.post(`/scholarship/approve-scholarship?id=${id}&approved=${approve}`);
}
export function getStudents() {
    return http.get(`/scholarship/students-list`);
}
export function getScholarships() {
    return http.get(`/scholarship/admin-view`);
}

export function deleteStudent(id) {
    return http.post(`/scholarship/delete?id=${id}`);
}
export function approveReject() {
    return http.get(`/scholarship/approved-rejected`);
}
export function editScholarship(id, data) {
    return http.post(`/scholarship/edit?id=${id}`, data);
}

export function viewEdit(id) {
    return http.get(`/scholarship/edit-view?id=${id}`);
}

const exportObject = {
    viewEdit,
    editScholarship,
    approveReject,
    viewPending,
    getScholarships,
    createScholarship,
    studentDetail,
    apply,
    appliedScholarship,
    approveScholarship,
    getStudents,
    deleteStudent
};

export default exportObject;
