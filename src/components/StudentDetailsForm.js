import React from "react";
import Form from "../util/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Input from "../util/Input";
import { Row, Col } from "react-bootstrap";
import DropDown from "../util/Dropdown";
import scholar from "../services/scholarshipService";

class StudentDetailsForm extends Form {
    state = {
        data: {
            religion: "",
            category: "",
            percentage: "",
            income: "",
            residence: "",
            caste: "",
            aadhaar: "",
            address: "",
            fatherName: "",
            fatherOccupation: ""
        },
        errors: {
            religion: "",
            category: "",
            percentage: "",
            income: "",
            residence: "",
            caste: "",
            aadhaar: "",
            address: "",
            fatherName: "",
            fatherOccupation: ""
        },
        religion: [
            { id: "muslim", name: "Muslim" },
            { id: "hindu", name: "Hindu" },
            { id: "christian", name: "christian" },
            { id: "budhist", name: "Budhist" },
            { id: "jain", name: "Jain" }
        ],
        category: [
            { id: "obc", name: "OBC" },
            { id: "oec", name: "OEC" },
            { id: "sc/st", name: "SC/ST" }
        ],
        caste: [
            { id: "pentacostal", name: "Pentacostal" },
            { id: "latin", name: "Latin" },
            { id: "viswakarma", name: "Viswakarma" },
            { id: "dheevara", name: "Dheevara" }
        ],
        residence: [
            { id: "kerala", name: "Kerala" },
            { id: "Tamil Nadu", name: "Tamil Nadu" }
        ]
    };

    schema = {
        religion: Joi.required().label("religion"),
        category: Joi.required().label("category"),
        percentage: Joi.string().required().label("percentage"),
        income: Joi.string().required().label("income"),
        residence: Joi.required().label("residence"),
        caste: Joi.required().label("cast"),
        aadhaar: Joi.required().label("Aadhaar"),
        address: Joi.required().label("Address"),
        fatherName: Joi.required().label("Father's Name"),
        fatherOccupation: Joi.required().label("Father's Occupation")
    };
    doSubmit = async () => {
        const { data } = this.state;
        const studentId = localStorage.getItem("userId");
        const details = {
            student: studentId,
            relegion: data.religion,
            category: data.category,
            percentage: data.percentage,
            income: data.income,
            residence: data.residence,
            aadharNo: data.aadhaar,
            address: data.address,
            caste: data.caste,
            fathersName: data.fatherName,
            fathersOccupation: data.fatherName
        };

        this.setState({ isProcessing: true });

        try {
            const response = await scholar.studentDetail(details);
            if (response.status === 200) {
                this.setState({ isProcessing: false });
                toast.success("Successfully Created");
                this.props.handleStudentLogin();
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
        const { data, errors, religion, caste, category, residence } = this.state;
        return (
            <form className="sign-up__form" onSubmit={this.handleSubmit}>
                <Row>
                    <Col md={6}>
                        <div className="mb-3">
                            <Input onChange={this.handleChange} value={data.aadhaar} name="aadhaar" error={errors.aadhaar} label="Aadhaar Number" placeHolder="Enter Aadhaar" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <Input onChange={this.handleChange} value={data.address} name="address" error={errors.address} label="Address" placeHolder="Enter Address" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <Input onChange={this.handleChange} value={data.fatherName} name="fatherName" error={errors.fatherName} label="Father's Name" placeHolder="Enter Father's Name" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <Input
                                onChange={this.handleChange}
                                value={data.fatherOccupation}
                                name="fatherOccupation"
                                error={errors.fatherOccupation}
                                label="Father's Occupation"
                                placeHolder="Enter Father's Occupation"
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="religion" className="form-label">
                                Religion
                            </label>
                            <DropDown name="religion" data={religion} onChange={this.handleChange} displayName="name" value="id" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="Caste" className="form-label">
                                Caste
                            </label>
                            <DropDown name="caste" data={caste} onChange={this.handleChange} displayName="name" value="id" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Category
                            </label>
                            <DropDown name="category" data={category} onChange={this.handleChange} displayName="name" value="id" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <Input onChange={this.handleChange} value={data.percentage} name="percentage" error={errors.percentage} label="Percentage" placeHolder="Enter mark percentage" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <Input onChange={this.handleChange} value={data.income} name="income" error={errors.income} label="Income" placeHolder="Enter income" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="residence" className="form-label">
                                Residence
                            </label>
                            <DropDown name="residence" data={residence} onChange={this.handleChange} displayName="name" value="id" />
                        </div>
                    </Col>
                </Row>

                <button type="submit" className="custom-button">
                    <div className="sign-up__button">
                        <p>Submit</p>
                    </div>
                </button>
            </form>
        );
    }
}

export default StudentDetailsForm;
