import React from 'react';
import PropTypes from 'prop-types';

const EditButton = ({ setEditTask, task }) => {
    return (
        <button
            className="btn btn-outline-warning float-end me-1"
            onClick={() => {
                setEditTask(task);
            }}
        >
            <i className="bi-pencil"></i>
        </button>
    );
};

EditButton.propTypes = {
    setEditTask: PropTypes.func,
    task: PropTypes.string,
};

export default EditButton;
