import React, { Component } from "react";
import { Container, Modal } from "react-bootstrap";
import StudentDetailsForm from "./StudentDetailsForm";

function StudentDetail({ show, onHide, signIn, handleStudentLogin, handleAdminLogin, ...rest }) {
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
                        Student Details
                    </h2>
                    <div style={{ padding: "30px" }}>
                        <StudentDetailsForm handleAdminLogin={handleAdminLogin} handleStudentLogin={handleStudentLogin} />
                    </div>
                </Container>
            </div>
        </Modal>
    );
}

export default StudentDetail;
