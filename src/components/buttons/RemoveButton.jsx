import React from 'react';
import PropTypes from 'prop-types';

const RemoveButton = ({ removeTask, index }) => {
    return (
        <button
            className="btn btn-outline-danger float-end"
            onClick={() => {
                removeTask(index);
            }}
        >
            <i className="bi-trash"></i>
        </button>
    );
};

RemoveButton.propTypes = {
    removeTask: PropTypes.func,
    index: PropTypes.number,
};

export default RemoveButton;
