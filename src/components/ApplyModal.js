import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";

class ApplyModal extends Component {
    state = {};
    handleApplication = (appId) => {
        console.log(appId);
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
                    <Button variant="primary" onClick={() => this.handleApplication()}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ApplyModal;
