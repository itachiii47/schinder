import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";
import scholarship from "../services/scholarshipService";
import { toast } from "react-toastify";

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

                    <div>
                        <h5 style={{ textDecoration: "underline" }}> Criteria</h5>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginRight: 5 }}>Caste :</p>
                            <p>{details.criteria.caste.join(" - ")}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginRight: 5 }}>Category :</p>
                            <p>{details.criteria.category.join(" - ")}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginRight: 5 }}>Income :</p>
                            <p>{details.criteria.income}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginRight: 5 }}>Percentage :</p>
                            <p>{details.criteria.percentage}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginRight: 5 }}>Religion :</p>
                            <p>{details.criteria.relegion.join(" - ")}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginRight: 5 }}>Residence :</p>
                            <p>{details.criteria.residence}</p>
                        </div>
                    </div>
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
