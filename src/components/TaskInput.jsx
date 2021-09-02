import React from 'react';
import PropTypes from 'prop-types';

const TaskInput = ({ addTask, takeInputValue, newTask }) => {
    return (
        <div>
            <input
                className="form-control lead text-muted mb-3 font-monospace"
                type="text"
                placeholder="Add a task"
                onChange={takeInputValue}
                onKeyDown={addTask}
                value={newTask}
            ></input>
        </div>
    );
};

TaskInput.propTypes = {
    addTask: PropTypes.func,
    takeInputValue: PropTypes.func,
    newTask: PropTypes.string,
};

export default TaskInput;
