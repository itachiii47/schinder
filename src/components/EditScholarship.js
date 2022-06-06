import React, { Component } from "react";
import Form from "../util/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Input from "../util/Input";
import { Row, Col } from "react-bootstrap";
import scholarshipService from "../services/scholarshipService";
import MultiSelect from "./../util/MultiSelect";
import { inputFormatDate } from "./timeFormat";
class EditScholarship extends Form {
    state = {
        data: {
            title: "",
            description: "",
            religion: [],
            category: [],
            percentage: "",
            income: "",
            residence: [],
            caste: [],
            startDate: "",
            endDate: ""
        },
        errors: {
            title: "",
            description: "",
            religion: "",
            category: "",
            percentage: "",
            income: "",
            residence: "",
            caste: "",
            startDate: "",
            endDate: ""
        },
        religion: [
            { id: "muslim", name: "Muslim" },
            { id: "hindu", name: "Hindu" },
            { id: "christian", name: "christian" },
            { id: "budhist", name: "Budhist" },
            { id: "jains", name: "Jain" }
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
        ],
        scholarId: "",
        selectedReligion: [],
        selectedCaste: [],
        selectedCategory: [],
        selectedResidence: []
    };

    schema = {
        title: Joi.string().min(8).max(75).required().label("title"),
        description: Joi.string().min(23).max(1000).required().label("description"),
        religion: Joi.required().label("religion"),
        category: Joi.required().label("category"),
        percentage: Joi.string().required().label("percentage"),
        income: Joi.string().required().label("income"),
        residence: Joi.required().label("residence"),
        caste: Joi.required().label("cast"),
        startDate: Joi.date().required().label(" Start Date"),
        endDate: Joi.date().required().label(" End Date")
    };
    doSubmit = async () => {
        const { data } = this.state;
        var startDate = new Date(data.startDate);
        var endDate = new Date(data.endDate);
        startDate = startDate.getTime();
        endDate = endDate.setHours(23, 59);
        const details = {
            title: data.title,
            description: data.description,
            criteria: {
                relegion: data.religion,
                category: data.category,
                percentage: data.percentage,
                caste: data.caste,
                income: data.income,
                residence: data.residence,
                startDate: startDate,
                endDate: endDate
            }
        };

        this.setState({ isProcessing: true });

        try {
            const id = this.props.scholarId;
            const response = await scholarshipService.editScholarship(id, details);
            if (response.status === 200) {
                this.setState({ isProcessing: false });
                toast.success("Successfully Edited");
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
    componentDidMount() {
        const data = this.props.scholarId;
        this.setState({ scholarId: data });
        this.fetchEditScholarship();
    }
    fetchEditScholarship = async () => {
        const { data, religion, caste, category, residence } = this.state;

        try {
            const id = this.props.scholarId;
            const response = await scholarshipService.viewEdit(id);
            if (response.data.statusCode === 200) {
                const OldData = response.data.data;
                const start = inputFormatDate(new Date(`${OldData.criteria.startDate}`).getTime());
                const end = inputFormatDate(new Date(`${OldData.criteria.endDate}`).getTime());
                data.title = OldData.title;
                data.description = OldData.description;
                data.religion = OldData.criteria.relegion;
                data.category = OldData.criteria.category;
                data.percentage = OldData.criteria.percentage;
                data.income = OldData.criteria.income;
                data.residence = OldData.criteria.residence;
                data.caste = OldData.criteria.caste;
                data.startDate = start;
                data.endDate = end;
                this.setState({ data });

                const selectedReligion = religion.filter((item) => {
                    return OldData.criteria.relegion.find((itemB) => {
                        return item.id === itemB;
                    });
                });
                const selectedCaste = caste.filter((item) => {
                    return OldData.criteria.caste.find((itemB) => {
                        return item.id === itemB;
                    });
                });
                const selectedCategory = category.filter((item) => {
                    return OldData.criteria.category.find((itemB) => {
                        return item.id === itemB;
                    });
                });
                const selectedResidence = residence.filter((item) => {
                    return OldData.criteria.residence.find((itemB) => {
                        return item.id === itemB;
                    });
                });
                this.setState({ selectedReligion, selectedCaste, selectedCategory, selectedResidence });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };
    render() {
        const { data, errors, religion, caste, category, residence, selectedReligion } = this.state;
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
                    <Input type="date" onChange={this.handleChange} label="Start Date" value={data.startDate} name="startDate" error={errors.startDate} className="col-md-6" />
                    <Input type="date" onChange={this.handleChange} label="End Date" value={data.endDate} name="endDate" error={errors.endDate} className="col-md-6" />
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

export default EditScholarship;
