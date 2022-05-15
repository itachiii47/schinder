import React from "react";
import CreatableSelect from "react-select/creatable";
const MultiSelect = ({ name, label, data, onChange, selected, error, value, displayName, tailName = null, initialValue = "Please Select", className = "", ...rest }) => {
    var options = [];
    data.forEach((element) => {
        options.push({
            value: element.id,
            label: element.name
        });
    });

    return (
        <div>
            <CreatableSelect
                className="mb-3"
                closeMenuOnSelect={false}
                name={name}
                isMulti
                id={name}
                value={selected}
                options={options}
                placeholder="Please Select"
                multiValue={selected}
                onChange={onChange}
                {...rest}
            />
            {error && <span className="mb-3 form__form-group-error">{error}</span>}
        </div>
    );
};

export default MultiSelect;
