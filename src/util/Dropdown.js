import React from "react";

/**
 * Create bootstrap form input along with different attributes
 * @param name, label, value, onChange func, placeHolder, error
 * @returns HTML
 */
const DropDown = ({
  name,
  label,
  data,
  onChange,
  selected,
  error,
  value,
  displayName,
  tailName = null,
  initialValue = "Please Select",
  className = "",
  ...rest
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <select
        className="form-select"
        name={name}
        id={name}
        value={selected}
        onChange={onChange}
        {...rest}
      >
        <option value="">{initialValue}</option>
        {data.map((option, index) => (
          <option key={index} value={option[value]}>
            {option[displayName]} {tailName ? option[tailName] : ""}
          </option>
        ))}
      </select>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default DropDown;
