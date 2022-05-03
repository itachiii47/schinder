import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class PostMatric extends Component {
    state = {};
    render() {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">Post Matric Scholarship</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>Students who belong to SC, ST, OBC, Economically Backward Classes (EBC), and Minority Community can get scholarships under this scheme.</li>
                        <li>The candidate’s family income from all sources should not be more than 2 Lakh per annum.</li>
                        <li>Candidates must have secured at least 50% marks in the previous examination.</li>
                    </ul>
                </Modal.Body>
            </>
        );
    }
}

export default PostMatric;
