import React, { Component } from "react";
import Form from "../util/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Input from "../util/Input";
import { Row, Col } from "react-bootstrap";
import auth from "../services/auth.service";
import DropDown from "../util/Dropdown";
import scholar from "../services/scholarshipService";
import MultiSelect from "./../util/MultiSelect";
class CreateScholarship extends Form {
    state = {
        data: {
            title: "",
            description: "",
            religion: [],
            category: [],
            percentage: "",
            income: "",
            residence: [],
            caste: []
        },
        errors: {
            title: "",
            description: "",
            religion: "",
            category: "",
            percentage: "",
            income: "",
            residence: "",
            caste: ""
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
        title: Joi.string().min(8).max(75).required().label("title"),
        description: Joi.string().min(23).max(1000).required().label("description"),
        religion: Joi.required().label("religion"),
        category: Joi.required().label("category"),
        percentage: Joi.string().required().label("percentage"),
        income: Joi.string().required().label("income"),
        residence: Joi.required().label("residence"),
        caste: Joi.required().label("cast")
    };
    doSubmit = async () => {
        const { data } = this.state;
        const details = {
            title: data.title,
            description: data.description,
            criteria: {
                relegion: data.religion,
                category: data.category,
                percentage: data.percentage,
                caste: data.caste,
                income: data.income,
                residence: data.residence
            }
        };

        this.setState({ isProcessing: true });

        try {
            const response = await scholar.createScholarship(details);
            if (response.status === 200) {
                this.setState({ isProcessing: false });
                toast.success("Successfully Created");
                this.props.handleScholarshipModal();
            } else {
                toast.error("Sorry, Something went wrong");
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };
    handleReligionMultiSelect = (e) => {
        const { data } = this.state;
        data.religion = Array.isArray(e) ? e.map((x) => x.value) : [];
        this.setState({ data });
    };
    handleCasteMultiSelect = (e) => {
        const { data } = this.state;
        data.caste = Array.isArray(e) ? e.map((x) => x.value) : [];
        this.setState({ data });
    };
    handleCategoryMultiSelect = (e) => {
        const { data } = this.state;
        data.category = Array.isArray(e) ? e.map((x) => x.value) : [];
        this.setState({ data });
    };
    handleResidenceMultiSelect = (e) => {
        const { data } = this.state;
        data.residence = Array.isArray(e) ? e.map((x) => x.value) : [];
        this.setState({ data });
    };
    render() {
        const { data, errors, religion, caste, category, residence } = this.state;
        return (
            <form className="sign-up__form" onSubmit={this.handleSubmit}>
                <div className="mb-3">
                    <Input onChange={this.handleChange} value={data.title} name="title" error={errors.title} label="Title" placeHolder="Enter title" />
                </div>
                <div className="mb-3">
                    <Input onChange={this.handleChange} value={data.description} name="description" error={errors.description} label="Description" placeHolder="Enter description" />
                </div>
                <Row>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="religion" className="form-label">
                                Religion
                            </label>
                            <MultiSelect name="religion" data={religion} onChange={this.handleReligionMultiSelect} displayName="name" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="Caste" className="form-label">
                                Caste
                            </label>
                            <MultiSelect name="caste" data={caste} onChange={this.handleCasteMultiSelect} displayName="name" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Category
                            </label>
                            <MultiSelect name="category" data={category} onChange={this.handleCategoryMultiSelect} displayName="name" />
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
                            <MultiSelect name="residence" data={residence} onChange={this.handleResidenceMultiSelect} displayName="name" />
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

export default CreateScholarship;
