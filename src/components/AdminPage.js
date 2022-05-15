import React, { Component } from "react";
import { Button, Col, Modal, Container, Dropdown } from "react-bootstrap";
import { viewPending } from "./../services/scholarshipService";
import { toast } from "react-toastify";
import AdminForm from "./AdminForm";
import CreateScholarship from "./CreateScholarship";
import auth from "../services/auth.service";
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
            const response = await viewPending();
            if (response.status === 200) {
                this.setState({ isProcessing: false });
                const data = response.data.data;
                this.setState({ applications: data.scholarship });
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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Student's Name</th>
                            <th scope="col">Scholarships Applied</th>
                            <th scope="col">Approve</th>
                            <th scope="col">Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data &&
                            data.map((club, index) => (
                                <tr key={index}>
                                    <td>
                                        <span
                                            onClick={() => {
                                                navigator.clipboard.writeText(club._id);
                                                toast.success("Copied", { position: "bottom-left" });
                                            }}
                                        >
                                            Copy ID &nbsp;
                                            <MdContentCopy className="pointer" />
                                        </span>
                                    </td>
                                    <td>{club.name}</td>
                                    <td>{club.place}</td>
                                </tr>
                            ))} */}
                    </tbody>
                </table>
            </Col>
        );
    }
}

export default AdminPage;
