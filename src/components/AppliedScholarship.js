import React, { Component } from "react";
import { appliedScholarship, approveScholarship } from "./../services/scholarshipService";
import { toast } from "react-toastify";
import Button from "../util/Button";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
class AppliedScholarship extends Component {
    state = {
        applications: [],
        showAdmin: false,
        showScholarship: false
    };
    componentDidMount() {
        this.fetchApplications();
    }
    fetchApplications = async () => {
        try {
            const response = await appliedScholarship();
            if (response.status === 200) {
                this.setState({ isProcessing: false });
                const data = response.data;
                this.setState({ applications: data.data });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };

    handleApprove = async (id) => {
        try {
            const response = await approveScholarship(id, true);
            if (response.status === 200) {
                toast.success("Approved");
                this.fetchApplications();
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };
    handleReject = async (id) => {
        try {
            const response = await approveScholarship(id, false);
            if (response.status === 200) {
                toast.error("Rejected");
                this.fetchApplications();
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };

    render() {
        const { applications: data } = this.state;
        return (
            <>
                <div className="admin-header">
                    <div>
                        <div className="greetings">
                            <p>Hello User,</p>
                            <span>Here are the pending applications</span>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <img src="/admin.webp" style={{ width: "100%", borderRadius: 12 }} />
                </div> */}
                <table style={{ textAlign: "center", verticalAlign: "middle" }} className="table">
                    {/* heading of the table */}
                    <thead>
                        {/* rows of the table */}
                        <tr>
                            {/* each heading */}
                            <th scope="col">
                                <h3>No.</h3>
                            </th>
                            <th scope="col">
                                <h3>Student's Name</h3>
                            </th>
                            <th scope="col">
                                <h3>Scholarships Applied</h3>
                            </th>
                            <th scope="col">
                                <h3>Approve</h3>
                            </th>
                            <th scope="col">
                                <h3>Reject</h3>
                            </th>
                        </tr>
                    </thead>
                    {/* body of the table */}
                    <tbody>
                        {data &&
                            data.map((item, index) => (
                                <>
                                    <tr key={index}>
                                        {/* data in table */}
                                        <td>{index + 1}</td>

                                        {
                                            <td>
                                                <h6>{item.student.name}</h6>
                                            </td>
                                        }
                                        <td>{item.scholarship.title}</td>
                                        <td
                                            style={{
                                                display: "flex",

                                                justifyContent: "center"
                                            }}
                                        >
                                            {/* conditional rendering */}
                                            {!item.isApproved && <Button onClick={() => this.handleApprove(item._id)} color="success" title="Approve" />}
                                            {item.isApproved && <p style={{ color: "green" }}>Approved</p>}
                                        </td>
                                        {!item.isApproved && (
                                            <td>
                                                <Button onClick={() => this.handleReject(item._id)} color="danger" title="Reject" />
                                            </td>
                                        )}
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>
                                                <h4 style={{ textDecoration: "underline" }}>Criteria:</h4>
                                                <p>Category: {item.student.criteria.category}</p>
                                                <p>Income: {item.student.criteria.income}</p>
                                                <p>Percentage: {item.student.criteria.percentage}</p>
                                                <p>Religion: {item.student.criteria.relegion}</p>
                                                <p>Residence: {item.student.criteria.residence}</p>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ))}
                    </tbody>
                </table>
            </>
        );
    }
}

export default AppliedScholarship;
