import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class MeritCumMeans extends Component {
    state = {};
    render() {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">Merit-cum-Means Scholarship Scheme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>Sikhs, Muslims, Buddhists, Christians, Zoroastrians (Parsis) and Jains, notified as minority communities are eligible for this scheme.</li>
                        <li>50% marks or equivalent grade in the previous final examination.</li>
                        <li>The annual income of the guardians or parents of the students from all sources should not exceed Rs.2.50 lakh.</li>
                        <li>The pursuing course must be of minimum one-year duration.</li>
                    </ul>
                </Modal.Body>
            </>
        );
    }
}

export default MeritCumMeans;
