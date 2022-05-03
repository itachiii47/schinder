import React, { Component } from "react";
import Form from "../util/Form";
import Joi from "joi-browser";
import Input from "../util/Input";
import auth from "../services/auth.service";
import { toast } from "react-toastify";
class LoginForm extends Form {
    state = {
        data: {
            phone: "",
            password: ""
        },
        errors: {
            phone: "",
            password: ""
        },
        isProcessing: false
    };

    schema = {
        phone: Joi.string()
            .length(10)
            .regex(/^[0-9]+$/)
            .required()
            .label("Phone Number"),
        password: Joi.string().min(3).max(75).required().label("Password")
    };
    doSubmit = async () => {
        const { data } = this.state;

        this.setState({ isProcessing: true });

        try {
            const response = await auth.login(data);
            if (response.status === 200) {
                this.setState({ isProcessing: false });
                toast.success("Success");
                this.props.handleLogin();
            } else {
                toast.error("Sorry, Something went wrong");
            }
        } catch (ex) {
            toast.error("Sorry, Something went wrong");
            this.setState({ isProcessing: false });
        }
    };
    render() {
        const { data, errors, isProcessing } = this.state;
        return (
            <form className="sign-up__form" onSubmit={this.handleSubmit}>
                <div className="mb-3">
                    <Input maxLength="10" onChange={this.handleChange} value={data.phone} name="phone" error={errors.phone} label="Phone" placeHolder="Enter Phone" />
                </div>
                <div className="mb-3">
                    <Input onChange={this.handleChange} type="password" value={data.password} name="password" error={errors.password} label=" Password" placeHolder="Enter Password" />
                </div>

                <button type="submit" className="custom-button" disabled={isProcessing}>
                    <div className="login__button">
                        <p>Login</p>
                    </div>
                </button>
            </form>
        );
    }
}

export default LoginForm;
