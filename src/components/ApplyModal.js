import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";
import scholarship from "../services/scholarshipService";

class ApplyModal extends Component {
    handleApplication = async (scholarshipId) => {
        const userId = localStorage.getItem("userId");

        try {
            const response = await scholarship.apply(userId, scholarshipId);
            if (response.status === 200) {
                this.setState({ isProcessing: false });
                toast.success("Applied Successfully");
            } else {
                toast.error("Sorry, Something went wrong");
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };
    render() {
        const { show, details } = this.props;
        return (
            <Modal show={show} onHide={this.props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Container style={{ padding: 20 }}>
                    <h2>{details.title}</h2>
                    <p>{details.description}</p>
                </Container>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.handleApplication(details._id)}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ApplyModal;
