import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class Pragati extends Component {
    state = {};
    render() {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">Pragati Scholarship</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>Applicant is applying for SC/ST/OBC category.</li>
                        <li>
                            Applicants must be admitted to the 1st year or 2nd year (through lateral entry only) of technical diploma/degree programme of an AICTE approved college/institute in the
                            current academic year through the centralised admission process of the State/Central Government.
                        </li>
                        <li>
                            The annual family income of the applicant must not be more than INR 8 lakh during the preceding financial year. In case the applicant is married, the income of
                            parents/in-laws is considered, whichever is higher.
                        </li>
                    </ul>
                </Modal.Body>
            </>
        );
    }
}

export default Pragati;
