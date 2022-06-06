import React, { Component } from "react";
import { Col, Container, Navbar, Nav, NavDropdown, Modal } from "react-bootstrap";
import auth from "../services/auth.service";
import "react-confirm-alert/src/react-confirm-alert.css";
import AppliedScholarship from "./AppliedScholarship";
import AdminForm from "./AdminForm";
import CreateScholarship from "./CreateScholarship";
class AdminPage extends Component {
    state = {
        showAdmin: false,
        showScholarship: false
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
        const { showAdmin, showScholarship } = this.state;
        return (
            <Col>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/applied">Admin Panel</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/students">Manage Students</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                                <NavDropdown title="Settings" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={this.handleAdminSignup}>Add Admin</NavDropdown.Item>
                                    <NavDropdown.Item onClick={this.handleScholarshipModal}>Create Scholarship</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={this.handleLogOut} href="/">
                                        Log out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <AppliedScholarship />
                <Modal show={showAdmin} onHide={this.handleModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Title style={{ padding: 20 }}>Admin Signup</Modal.Title>
                    <Container style={{ padding: 20 }}>
                        <AdminForm handleAdminSignup={this.handleAdminSignup} />
                    </Container>
                </Modal>
                <Modal show={showScholarship} onHide={this.handleScholarshipModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Title style={{ padding: 20 }}>Create Scholarship</Modal.Title>
                    <Container style={{ padding: 20 }}>
                        <CreateScholarship handleScholarshipModal={this.handleScholarshipModal} />
                    </Container>
                </Modal>
            </Col>
        );
    }
}

export default AdminPage;
