import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Container, Navbar, Nav, NavDropdown, Modal } from "react-bootstrap";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import AdminPage from "./components/AdminPage";
import AppliedScholarship from "./components/AppliedScholarship";
import StudentList from "./components/StudentList";
import auth from "./services/auth.service";
import AdminForm from "./components/AdminForm";
import CreateScholarship from "./components/CreateScholarship";
import ScholarshipList from "./components/ScholarshipList";
import ApprovedAndRejected from "./components/ApprovedAndRejected";

class Routes extends Component {
    state = {
        showAdmin: false,
        showScholarship: false,
        isAdmin: false
    };
    componentDidMount() {
        const admin = localStorage.getItem("isAdmin");
        this.setState({ isAdmin: admin });
    }
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
            <React.Fragment>
                <Container fluid="lg">
                    {this.state.isAdmin && (
                        <>
                            <Navbar bg="light" expand="lg">
                                <Container>
                                    <Navbar.Brand href="/applied">Admin Panel</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="me-auto">
                                            <Nav.Link href="/students">Manage Students</Nav.Link>
                                            <Nav.Link href="/scholarship">Manage Scholarships</Nav.Link>
                                            <Nav.Link href="/approvedlist">Approved & Rejected</Nav.Link>
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
                        </>
                    )}
                    <Row>
                        <Switch>
                            <Route exact path="/" component={LandingPage} />
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/admin" component={AdminPage} />
                            <Route exact path="/applied" component={AppliedScholarship} />
                            <Route exact path="/students" component={StudentList} />
                            <Route exact path="/scholarship" component={ScholarshipList} />
                            <Route exact path="/approvedlist" component={ApprovedAndRejected} />
                        </Switch>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Routes;
