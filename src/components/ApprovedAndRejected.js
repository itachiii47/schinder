import React, { useEffect, useState } from "react";
import scholarshipService from "../services/scholarshipService";
import { toast } from "react-toastify";
import Button from "./../util/Button";
import { Col, Modal, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";

function ApprovedAndRejected() {
    const [approved, setApproved] = useState(null);
    const [rejected, setRejected] = useState(null);
    const [showScholarship, setShowScholarship] = useState(false);
    const [scholarId, setScholarId] = useState("");

    useEffect(() => {
        fetchList();
    }, []);

    const fetchList = async () => {
        try {
            const response = await scholarshipService.approveReject();
            if (response.data.statusCode === 200) {
                const data = response.data.data;
                setApproved(data.approved);
                setRejected(data.rejected);
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };

    return (
        <div>
            <Row style={{ marginTop: 20 }}>
                <Col>
                    <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Approved</h3>
                    <table style={{ textAlign: "center", verticalAlign: "middle" }} className="table">
                        {/* heading of the table */}
                        <thead>
                            {/* rows of the table */}
                            <tr>
                                {/* each heading */}
                                <th scope="col">No.</th>
                                <th scope="col">Student</th>
                                <th scope="col">Scholarship</th>
                            </tr>
                        </thead>
                        {/* body of the table */}
                        <tbody>
                            {approved &&
                                approved.map((item, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>{index + 1}</td>

                                            <td>{item.student.name}</td>
                                            <td>{item.scholarship.title}</td>
                                        </tr>
                                    </>
                                ))}
                        </tbody>
                    </table>
                </Col>
                <Col>
                    <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Rejected</h3>
                    <table style={{ textAlign: "center", verticalAlign: "middle" }} className="table">
                        {/* heading of the table */}
                        <thead>
                            {/* rows of the table */}
                            <tr>
                                {/* each heading */}
                                <th scope="col">No.</th>
                                <th scope="col">Student</th>
                                <th scope="col">Scholarship</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rejected &&
                                rejected.map((item, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>{index + 1}</td>

                                            <td>{item.student.name}</td>
                                            <td>{item.scholarship.title}</td>
                                        </tr>
                                    </>
                                ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    );
}

export default ApprovedAndRejected;
