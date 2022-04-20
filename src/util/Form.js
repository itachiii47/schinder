import { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  /**
   * Validate whole form once submitted
   * @returns error object with proper messages for each fields if any
   */
  validate = () => {
    const errors = {};
    const options = { abortEarly: false };

    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    // replace double quotes in error message
    const search = '"';
    const replaceWith = "";

    for (let item of error.details) {
      try {
        let message =
          String(item.message) && String(item.message).includes("pattern")
            ? "Invalid format"
            : String(item.message);
        errors[item.path[0]] = String(message).split(search).join(replaceWith);
      } catch (err) {
        console.log("Caught error :", err.message);
      }
    }
    return errors;
  };

  /**
   * Validate each field when any changes detected
   * @param name of field, value of field
   * @returns error message or null
   */
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };

    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    var message = "";
    if (error) {
      message =
        error.details && error.details[0].message.includes("pattern")
          ? "Invalid format"
          : error.details[0].message;
    }

    return error ? message : null;
  };

  /**
   * While any changes happened to any field, this function will be triggered,
   * validation and other required actions can be performed from here
   * @param event
   * @returns state will be updated according to the action
   */
  handleChange = ({ currentTarget: input, target }) => {
    // spread the error object
    const errors = { ...this.state.errors };
    // validate the field
    const errorMessage = this.validateProperty(input);

    // replace double quotes in error message
    const search = '"';
    const replaceWith = "";

    // update or delete property according to error
    if (errorMessage)
      errors[input.name] = String(errorMessage).split(search).join(replaceWith);
    else delete errors[input.name];

    // set data and state
    const data = { ...this.state.data };
    data[input.name] =
      input.type === "file"
        ? target.files[0].name
        : input.type === "checkbox"
        ? input.checked
        : input.value;

    this.setState({ data, errors });
  };

  /**
   * Once the user submitted form, validation and rest of the part will be triggered from here
   * API Call, Other actions can be written in doSubmit function inside each of the component
   * @param event
   * @returns
   */
  handleSubmit = (e) => {
    e.preventDefault();

    // validate form
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    // rest of the action
    this.doSubmit();
  };
}

export default Form;
