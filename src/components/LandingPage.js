import React, { Component } from "react";
import Login from "./Login";
import Signup from "./SignUp";
import { Col, Row } from "react-bootstrap";
import StudentDetail from "./StudentDetail";

class LandingPage extends Component {
    state = {
        signIn: false,
        signUp: false,
        studentDetail: false
    };

    handleSignInModal = () => {
        this.setState({ signIn: !this.state.signIn });
    };

    handleSignUpModal = () => {
        this.setState({ signUp: !this.state.signUp });
    };
    handleStudentDetailModal = () => {
        this.setState({ studentDetail: !this.state.studentDetail });
    };
    handleStudentLogin = () => {
        this.props.history.push("/dashboard");
    };
    handleAdminLogin = () => {
        this.props.history.push("/applied");
    };

    render() {
        const { signUp, signIn, studentDetail } = this.state;
        return (
            <div>
                <Row>
                    <Col md={12} className="landing-page">
                        <img src="/skinder.png" />
                        <button onClick={this.handleSignUpModal} className="auth-button custom-button">
                            <div className="sign-in">
                                <h2>Sign Up</h2>
                            </div>
                        </button>
                    </Col>
                </Row>
                <Signup
                    handleSignUpModal={this.handleSignUpModal}
                    handleStudentLogin={this.handleStudentLogin}
                    handleAdminLogin={this.handleAdminLogin}
                    show={signUp}
                    onHide={this.handleSignUpModal}
                    handleStudentDetailModal={this.handleStudentDetailModal}
                    signIn={this.handleSignInModal}
                />
                <Login handleStudentLogin={this.handleStudentLogin} handleAdminLogin={this.handleAdminLogin} show={signIn} onHide={this.handleSignInModal} signUp={this.handleSignUpModal} />
                <StudentDetail
                    handleStudentLogin={this.handleStudentLogin}
                    handleAdminLogin={this.handleAdminLogin}
                    show={studentDetail}
                    onHide={this.handleSignInModal}
                    signUp={this.handleSignUpModal}
                />
            </div>
        );
    }
}

export default LandingPage;
