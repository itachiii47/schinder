import React, { Component } from "react";
import Login from "./Login";
import Signup from "./SignUp";
import { Col, Row } from "react-bootstrap";

class LandingPage extends Component {
    state = {
        signIn: false,
        signUp: false
    };

    handleSignInModal = () => {
        this.setState({ signIn: !this.state.signIn });
    };

    handleSignUpModal = () => {
        this.setState({ signUp: !this.state.signUp });
    };
    render() {
        const { signUp, signIn } = this.state;
        return (
            <div>
                <Row>
                    <Col md={12} className="landing-page">
                        <img src="/skinder.png" />
                        <button onClick={this.handleSignUpModal} className="auth-button custom-button">
                            <div className="sign-in">
                                <h2>Sign in</h2>
                            </div>
                        </button>
                    </Col>
                </Row>
                <Signup show={signUp} onHide={this.handleSignUpModal} signIn={this.handleSignInModal} />
                <Login show={signIn} onHide={this.handleSignInModal} signUp={this.handleSignUpModal} />
            </div>
        );
    }
}

export default LandingPage;
