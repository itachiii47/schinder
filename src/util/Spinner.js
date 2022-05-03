import React from "react";

/**
 * Bootstrap Spinner
 * @returns HTML
 */
const Spinner = ({ loadingText }) => {
    return (
        <React.Fragment>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {loadingText}
        </React.Fragment>
    );
};

export default Spinner;
