import React from "react";

/**
 * Create bootstrap form input along with different attributes
 * @param name, label, value, onChange func, placeHolder, error
 * @returns HTML
 */
const Input = ({
  name,
  maxLength,
  label,
  value,
  onChange,
  defaultValue,
  placeHolder,
  error,
  autofocus = false,
  type = "text",
  className = "",
  infoText = "",
  ...rest
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        name={name}
        id={name}
        maxLength={maxLength}
        defaultValue={defaultValue}
        placeholder={placeHolder}
        autoComplete="off"
        onChange={onChange}
        value={value}
        autoFocus={autofocus}
        {...rest}
      />
      {infoText && <span className="info-text text-muted">{infoText}</span>}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Input;
