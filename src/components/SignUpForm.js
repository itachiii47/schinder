import React, { Component } from "react";
import Form from "../util/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Input from "../util/Input";
import { Row, Col } from "react-bootstrap";
import auth from "../services/auth.service";
import { schinderDecode } from "./../services/jwt";
class SignUpForm extends Form {
    state = {
        data: {
            name: "",
            phone: "",
            email: "",
            password: "",
            isAdmin: false
        },
        errors: {
            name: "",
            phone: "",
            email: "",
            password: "",
            isAdmin: ""
        }
    };

    schema = {
        name: Joi.string().min(3).max(75).required().label("Name"),
        password: Joi.string().min(3).max(75).required().label("Password"),
        phone: Joi.string()
            .length(10)
            .regex(/^[0-9]+$/)
            .required()
            .label("Phone Number"),
        email: Joi.string().email().required().label("Email"),
        isAdmin: Joi.boolean().required()
    };

    doSubmit = async () => {
        const { data } = this.state;

        this.setState({ isProcessing: true });

        try {
            const response = await auth.signup(data);
            if (response.status === 200) {
                const token = response.data.data.token;
                this.setState({ isProcessing: false });
                localStorage.setItem("access_token", token);
                toast.success("Signed Up");
                schinderDecode();
                const admin = localStorage.getItem("isAdmin");
                console.log(admin);
                if (admin === "true") {
                    this.props.handleAdminLogin();
                } else {
                    this.props.handleSignUpModal();
                    this.props.handleStudentDetailModal();
                }
            } else {
                toast.error("Sorry, Something went wrong");
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };
    //for displaying anything you want to show on the screen
    render() {
        //data and error are taken from state.
        const { data, errors } = this.state;
        return (
            <>
                <form className="sign-up__form" onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        {/* value is filled inside data.variable */}
                        {/* error is filled inside error.variable */}
                        <Input onChange={this.handleChange} value={data.name} name="name" error={errors.name} label="Name" placeHolder="Enter Name" />
                    </div>
                    <div className="mb-3">
                        <Input type="password" onChange={this.handleChange} value={data.password} name="password" error={errors.password} label="Password" placeHolder="Enter Password" />
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

                    <button type="submit" className="custom-button">
                        <div className="sign-up__button">
                            <p>Sign Up</p>
                        </div>
                    </button>
                </form>
            </>
        );
    }
}

export default SignUpForm;
