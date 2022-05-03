import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class Egrants extends Component {
    state = {};
    render() {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">Egrants</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>
                            OBC - The income limit is INR 1 Lakh per annum,the student must have taken admission under merit and reservation quota,The student must be a permanent resident of Kerala.
                        </li>
                        <li>OEC,SC/ST - There is no income limitation.The student must be a permanent resident of Kerala.the student must have taken admission under merit and reservation quota.</li>
                        <li> Other categories - The student must have taken admission under merit and reservation quota.The income limit is INR 1 Lakh per annum.</li>
                    </ul>
                </Modal.Body>
            </>
        );
    }
}

export default Egrants;
