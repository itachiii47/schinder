import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class CentralSector extends Component {
    state = {};
    render() {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">Central Sector Scholarship</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>Candidates who are above the 80th percentile of successful students who have passed class 12 .</li>
                        <li>Pursuing regular UG/PG course.</li>
                        <li>Annual family income less than INR 8 Lakh .</li>
                        <li>The candidates belonging to reserved categories of SC, ST, OBC and PWD will get a reservation of 15%, 7.5%, 27% and 5%, respectively.</li>
                    </ul>
                </Modal.Body>
            </>
        );
    }
}

export default CentralSector;
