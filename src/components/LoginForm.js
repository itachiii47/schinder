import React, { Component } from "react";
import Form from "../util/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Input from "../util/Input";
class LoginForm extends Form {
    state = {
        data: {
            userName: "",
            password: ""
        },
        errors: {
            userName: "",
            password: ""
        }
    };

    schema = {
        userName: Joi.string().min(3).max(75).required().label("User Name"),
        password: Joi.string().min(3).max(75).required().label("Password")
    };
    doSubmit = async () => {
        const data = { ...this.state.data };
        const bank = {
            accountName: data.accountName,
            accountNumber: data.accountNumber,
            ifscCode: data.ifscCode,
            email: data.email
        };

        // try {
        //     // const response = await .add(bank);
        //     if (response.status === 200) {
        //         this.setState({ isProcessing: false });
        //         toast.success("Added");
        //     } else {
        //         toast.error("Sorry, Something went wrong");
        //     }
        // } catch (ex) {
        //     this.setState({ isProcessing: false });
        // }
    };
    render() {
        const { data, errors } = this.state;
        return (
            <form className="sign-up__form" onSubmit={this.handleSubmit}>
                <div className="mb-3">
                    <Input onChange={this.handleChange} value={data.userName} name="userName" error={errors.userName} label="User Name" placeHolder="Enter Username" />
                </div>
                <div className="mb-3">
                    <Input onChange={this.handleChange} type="password" value={data.password} name="password" error={errors.password} label=" Password" placeHolder="Enter Password" />
                </div>

                <button type="submit" className="custom-button">
                    <div className="login__button">
                        <p>Login</p>
                    </div>
                </button>
            </form>
        );
    }
}

export default LoginForm;
