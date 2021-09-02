import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RemoveButton from './buttons/RemoveButton';
import CompletedButton from './buttons/CompletedButton';
import EditButton from './buttons/EditButton';

const TaskItem = ({ task, index, setEditTask, removeTask }) => {
    const [completed, setCompleted] = useState(false);

    //HELPER VARIABLES
    const listItemStyle = 'list-group-item inline-block font-monospace';
    const completedListItemStyle = 'list-group-item list-group-item-success inline-block font-monospace';

    //HELPER FUNCTION
    const toggleCompleted = completedTask => {
        if (task === completedTask) {
            setCompleted(true);
        } else {
            setCompleted(false);
        }
        return task;
    };

    return (
        <li className={completed ? completedListItemStyle : listItemStyle}>
            <span className="lead">{task}</span>
            <RemoveButton removeTask={removeTask} index={index} />
            <CompletedButton toggleCompleted={toggleCompleted} index={index} completedTask={task} />
            <EditButton setEditTask={setEditTask} task={task} />
        </li>
    );
};

TaskItem.propTypes = {
    task: PropTypes.string,
    completedTask: PropTypes.string,
    index: PropTypes.number,
    setEditTask: PropTypes.func,
    removeTask: PropTypes.func,
};

export default TaskItem;
