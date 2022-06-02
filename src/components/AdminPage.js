import React, { Component } from "react";
import { Col, Modal, Container, Dropdown } from "react-bootstrap";
import { appliedScholarship, approveScholarship } from "./../services/scholarshipService";
import { toast } from "react-toastify";
import AdminForm from "./AdminForm";
import CreateScholarship from "./CreateScholarship";
import auth from "../services/auth.service";
import Button from "../util/Button";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
class AdminPage extends Component {
    state = {
        applications: [],
        showAdmin: false,
        showScholarship: false
    };
    componentDidMount() {
        this.fetchApplications();
    }
    fetchApplications = async () => {
        try {
            const response = await appliedScholarship();
            if (response.status === 200) {
                this.setState({ isProcessing: false });
                const data = response.data;
                this.setState({ applications: data.data });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };
    handleModal = () => {
        const { showAdmin } = this.state;
        this.setState({ showAdmin: !showAdmin });
    };
    handleScholarshipModal = () => {
        const { showScholarship } = this.state;
        this.setState({ showScholarship: !showScholarship });
    };
    handleAdminSignup = () => {
        const { showAdmin } = this.state;
        this.setState({ showAdmin: !showAdmin });
    };
    handleLogOut = () => {
        auth.logout();
    };
    handleApprove = async (id) => {
        try {
            const response = await approveScholarship(id);
            if (response.status === 200) {
                toast.success("Approved");
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };
    handleReject = async (id) => {
        confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to do this ?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => this.deleteArray(id)
                },
                {
                    label: "No",
                    onClick: () => alert("Click No")
                }
            ]
        });
    };
    deleteArray = (id) => {
        const { applications } = this.state;
        const newArray = applications.filter((item) => item._id !== id);
        this.setState({ applications: newArray });
    };
    render() {
        const { applications: data, showAdmin, showScholarship } = this.state;
        return (
            <Col>
                <Modal show={showAdmin} onHide={this.handleModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Title style={{ padding: 20 }}>Admin Signup</Modal.Title>
                    <Container style={{ padding: 20 }}>
                        <AdminForm handleAdminSignup={this.handleAdminSignup} />
                    </Container>
                    {/* <Modal.Footer>
                        <Button variant="primary" onClick={() => this.handleApplication(type)}>
                            Apply
                        </Button>
                    </Modal.Footer> */}
                </Modal>
                <Modal show={showScholarship} onHide={this.handleScholarshipModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Title style={{ padding: 20 }}>Create Scholarship</Modal.Title>
                    <Container style={{ padding: 20 }}>
                        <CreateScholarship handleScholarshipModal={this.handleScholarshipModal} />
                    </Container>
                    {/* <Modal.Footer>
                        <Button variant="primary" onClick={() => this.handleApplication(type)}>
                            Apply
                        </Button>
                    </Modal.Footer> */}
                </Modal>

                <div className="admin-header">
                    <div>
                        <h3>Admin Panel</h3>
                        <div className="greetings">
                            <p>Hello User,</p>
                            <span>Here are the pending applications</span>
                        </div>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Settings
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.handleAdminSignup}>Add Admin</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleScholarshipModal}>Create Scholarship</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleLogOut} href="/">
                                Log out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {/* <div>
                    <img src="/admin.webp" style={{ width: "100%", borderRadius: 12 }} />
                </div> */}
                <table style={{ textAlign: "center", verticalAlign: "middle" }} className="table">
                    {/* heading of the table */}
                    <thead>
                        {/* rows of the table */}
                        <tr>
                            {/* each heading */}
                            <th scope="col">#</th>
                            <th scope="col">Student's Name</th>
                            <th scope="col">Scholarships Applied</th>
                            <th scope="col">Approve</th>
                            <th scope="col">Reject</th>
                        </tr>
                    </thead>
                    {/* body of the table */}
                    <tbody>
                        {data &&
                            data.map((item, index) => (
                                // row of the table
                                <tr key={index}>
                                    {/* data in table */}
                                    <td>{index + 1}</td>

                                    {<td>{item.student.name}</td>}
                                    <td>{item.scholarship.title}</td>
                                    <td
                                        style={{
                                            display: "flex",

                                            justifyContent: "center"
                                        }}
                                    >
                                        {/* conditional rendering */}
                                        {!item.isApproved && <Button onClick={() => this.handleApprove(item._id)} color="success" title="Approve" />}
                                        {item.isApproved && <p style={{ color: "green" }}>Approved</p>}
                                    </td>
                                    {!item.isApproved && (
                                        <td>
                                            <Button onClick={() => this.handleReject(item._id)} color="danger" title="Reject" />
                                        </td>
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </Col>
        );
    }
}

export default AdminPage;
