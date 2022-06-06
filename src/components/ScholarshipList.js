import React, { useEffect, useState } from "react";
import scholarshipService from "../services/scholarshipService";
import { toast } from "react-toastify";
import Button from "./../util/Button";
import { Modal } from "react-bootstrap";
import { Container } from "react-bootstrap";
import CreateScholarship from "./CreateScholarship";
import EditScholarship from "./EditScholarship";

function ScholarshipList() {
    const [data, setData] = useState(null);
    const [showScholarship, setShowScholarship] = useState(false);
    const [scholarId, setScholarId] = useState("");

    useEffect(() => {
        fetchScholarships();
    }, []);

    const fetchScholarships = async () => {
        try {
            const response = await scholarshipService.getScholarships();
            if (response.data.statusCode === 200) {
                const data = response.data.data;
                setData(data.scholarships);
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };

    const handleScholarshipModal = (id) => {
        setScholarId(id);
        setShowScholarship(!showScholarship);
    };

    return (
        <div>
            <table style={{ textAlign: "center", verticalAlign: "middle" }} className="table">
                {/* heading of the table */}
                <thead>
                    {/* rows of the table */}
                    <tr>
                        {/* each heading */}
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                {/* body of the table */}
                <tbody>
                    {data &&
                        data.map((item, index) => (
                            <>
                                <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td>{item.title}</td>
                                    <td>{item.description}</td>

                                    <td
                                        style={{
                                            display: "flex",

                                            justifyContent: "center"
                                        }}
                                    >
                                        <Button color="primary" onClick={() => handleScholarshipModal(item._id)} title="Edit" />
                                    </td>
                                </tr>
                            </>
                        ))}
                </tbody>
            </table>
            <Modal show={showScholarship} onHide={() => handleScholarshipModal()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Title style={{ padding: 20 }}>Edit Scholarship</Modal.Title>
                <Container style={{ padding: 20 }}>
                    <EditScholarship scholarId={scholarId} handleScholarshipModal={handleScholarshipModal} />
                </Container>
            </Modal>
        </div>
    );
}

export default ScholarshipList;
