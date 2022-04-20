import React from "react";
import Spinner from "./Spinner";

const Button = ({ title, reference, type = "submit", dataDismiss, color = "primary", align = "float-end", className = "", isProcessing, disabled = false, onClick, ...rest }) => (
    <button type={type} className={`btn btn-${color} ${align} ${className}`} ref={reference} onClick={onClick} disabled={disabled} data-bs-dismiss={dataDismiss} {...rest}>
        {isProcessing ? <Spinner /> : title}
    </button>
);

export default Button;
