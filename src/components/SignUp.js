import React, { Component } from "react";
import { Container, Modal } from "react-bootstrap";
import SignUpForm from "./SignUpForm";

function Signup({ show, onHide, signIn, handleStudentLogin, handleAdminLogin, ...rest }) {
    return (
        <Modal show={show} onHide={onHide} {...rest} size="md" aria-labelledby="contained-modal-title-vcenter" centered className="signup-modal">
            <div>
                <Container>
                    <h2
                        style={{
                            marginTop: "50px",
                            marginLeft: "10px",
                            fontWeight: "700",
                            fontSize: "31px"
                        }}
                    >
                        Sign Up
                    </h2>
                    <div style={{ padding: "30px" }}>
                        <SignUpForm handleAdminLogin={handleAdminLogin} handleStudentLogin={handleStudentLogin} />

                        <div className="login-redirect">
                            <p>Already have an account?</p>
                            <h3
                                className="pointer"
                                onClick={() => {
                                    onHide();
                                    signIn();
                                }}
                            >
                                Login
                            </h3>
                        </div>
                    </div>
                </Container>
            </div>
        </Modal>
    );
}

export default Signup;
