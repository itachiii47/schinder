import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class Koya extends Component {
    state = {};
    render() {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">CH Muhammed Koya Scholarship</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>The student must belong to the Muslim, Latin or Converted Christian Community.</li>
                        <li>Students must be a domicile of Kerala State.</li>
                        <li>Students must be a Girl student studying for graduation or higher courses in Govt/Aided institutions.</li>
                        <li>Students who have given the Common Entrance Examinations and got admission to self-financing colleges from the merit seat are also eligible.</li>
                        <li> Students must have secured at least 50% marks in the qualifying examinations.</li>
                        <li>The student’s family income should not be more than 8 Lakhs per annum.</li>
                        <li> Students who apply for hostel stipend must be staying in recognized hostels.</li>
                        <li>Students who are eligible for the hostel stipend will not be eligible for the scholarship.</li>
                        <li>Students must have a bank account in any recognized bank to receive the scholarship amount.</li>
                    </ul>
                </Modal.Body>
            </>
        );
    }
}

export default Koya;
