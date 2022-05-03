import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class Fisheries extends Component {
    state = {};
    render() {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">Fisheries Egrants Scholarships</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>This scholarship is offered by the Fisheries Department of Kerala for the recognized children of fishermen.</li>
                        <li>The student must have taken admission under merit and reservation quota.</li>
                    </ul>
                </Modal.Body>
            </>
        );
    }
}

export default Fisheries;
