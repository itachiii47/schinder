import React, { Component } from "react";
import Form from "../util/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Input from "../util/Input";
import { Row, Col } from "react-bootstrap";
class AdminForm extends Form {
    state = {
        data: {
            email: "",
            phone: "",
            userName: "",
            password: "",
            isAdmin: ""
        },
        errors: {
            email: "",
            phone: "",
            userName: "",
            password: ""
        }
    };
    handleCheckBox = () => {
        const { isAdmin } = this.state.data;
        var data = { ...this.state.data };
        data.isAdmin = !isAdmin;
        this.setState({ data });
    };
    schema = {
        userName: Joi.string().min(3).max(75).required().label("User Name"),
        password: Joi.string().min(3).max(75).required().label("Password"),
        phone: Joi.string()
            .length(10)
            .regex(/^[0-9]+$/)
            .required()
            .label("Phone Number"),
        email: Joi.string().email().required().label("Email")
    };
    render() {
        const { data, errors } = this.state;
        return (
            <form className="sign-up__form">
                <div className="mb-3">
                    <Input onChange={this.handleChange} value={data.userName} name="userName" error={errors.userName} label="User Name" placeHolder="Enter Username" />
                </div>
                <div className="mb-3">
                    <Input onChange={this.handleChange} value={data.password} name="password" error={errors.password} label="Password" placeHolder="Enter Password" />
                </div>
                <Row>
                    <Col md={6}>
                        <div className="mb-3">
                            <Input onChange={this.handleChange} maxLength="10" value={data.phone} name="phone" error={errors.phone} label="Phone" placeHolder="Enter Phone No." />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <Input onChange={this.handleChange} value={data.email} name="email" error={errors.email} label="Email" placeHolder="Enter Email" />
                        </div>
                    </Col>
                </Row>
                <div className="mb-4">
                    <div className="form-check form-switch switch-layout toggle-tag">
                        <label onClick={this.handleCheckBox} className="form-check-label " for="flexSwitchCheckChecked">
                            Are you an admin ?
                        </label>
                        <input onClick={this.handleCheckBox} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                    </div>
                </div>

                <button type="submit" className="custom-button">
                    <div className="sign-up__button">
                        <p>Sign Up</p>
                    </div>
                </button>
            </form>
        );
    }
}

export default AdminForm;
