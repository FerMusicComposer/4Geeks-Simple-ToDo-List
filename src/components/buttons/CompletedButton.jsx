import React from 'react';
import PropTypes from 'prop-types';

const CompletedButton = ({ toggleCompleted, completedTask, task }) => {
    return (
        <button
            className="btn btn-outline-primary float-end me-1"
            onClick={() => {
                toggleCompleted(completedTask, task);
            }}
        >
            <i className="bi-check-circle fs-6"></i>
        </button>
    );
};

CompletedButton.propTypes = {
    toggleCompleted: PropTypes.func,
    completedTask: PropTypes.string,
    task: PropTypes.string,
};

export default CompletedButton;
