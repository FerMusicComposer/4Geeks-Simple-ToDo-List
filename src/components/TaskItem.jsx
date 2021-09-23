import React from 'react';
import PropTypes from 'prop-types';
import RemoveButton from './buttons/RemoveButton';
import CompletedButton from './buttons/CompletedButton';
import EditButton from './buttons/EditButton';

const TaskItem = ({ task, index, setEditTask, removeTask, toggleCompleted, taskDone }) => {
    //HELPER VARIABLES
    const listItemStyle = 'list-group-item inline-block font-monospace';
    const completedListItemStyle = 'list-group-item list-group-item-success inline-block font-monospace';
    console.log(task, taskDone);
    return (
        <li className={taskDone ? completedListItemStyle : listItemStyle}>
            <span className="lead">{task}</span>
            <RemoveButton removeTask={removeTask} index={index} />
            <CompletedButton
                toggleCompleted={toggleCompleted}
                index={index}
                completedTask={task}
                task={task}
            />
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
    toggleCompleted: PropTypes.func,
    taskDone: PropTypes.bool,
};

export default TaskItem;
