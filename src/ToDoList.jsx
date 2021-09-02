import React, { useEffect, useState } from 'react';
import DuplicatedTask from './components/warnings/DuplicatedTask';
import NoTaskWarning from './components/warnings/NoTaskWarning';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';

const ToDoList = () => {
    const [newTask, setNewTask] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [taskExists, setTaskExists] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [editedTask, setEditedTask] = useState('');

    /////////////////////////////////////////////
    ////HELPER FUNCTIONS
    /////////////////////////////////////////////

    const takeInputValue = event => {
        setNewTask(event.target.value);
    };

    const addTask = event => {
        if (event.key.toLowerCase() === 'enter' && !taskExists && newTask !== '') {
            setTaskList([...taskList, newTask]);

            setNewTask('');
        }
    };

    const removeTask = removableIndex => {
        let newTasklist = [...taskList];
        newTasklist.splice(removableIndex, 1);
        setTaskList(newTasklist);
    };

    const taskEditing = event => {
        setEditedTask(event.target.value);
    };

    /////////////////////////////////////////////
    ////USE EFFECTS
    /////////////////////////////////////////////

    useEffect(() => {
        let alreadyInTasklist = taskList.findIndex(task => task === newTask);
        if (alreadyInTasklist === -1) {
            setTaskExists(false);
        } else {
            setTaskExists(true);
        }
    }, [newTask, taskList]);

    //RETRIEVES THE TODOS ON FIRST RENDER(PAGE REFRESH). HAS TO GO BEFORE SAVING TO LOCALSTORAGE OTHERWISE
    //IT DOESN'T WORK
    useEffect(() => {
        const getData = localStorage.getItem('taskList');
        const loadedData = JSON.parse(getData);

        if (loadedData) {
            setTaskList(loadedData);
        }
    }, []);

    //SAVES TODOS INTO LOCALSTORAGE EVERYTIME THE LIST IS UPDATED
    useEffect(() => {
        const toJSON = JSON.stringify(taskList);
        localStorage.setItem('taskList', toJSON);
    }, [taskList]);

    //////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className="container w-50 border border-secondary bg-light text-dark min-vh-100">
            <div className="row">
                <div className="col-12">
                    <h1 className="h1 display-2 text-center mt-3 font-monospace">To-Do List</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="list-group my-2">{taskExists ? <DuplicatedTask /> : null}</ul>
                    <TaskInput newTask={newTask} takeInputValue={takeInputValue} addTask={addTask} />
                    <ul className="list-group">
                        {taskList.map((task, index) => {
                            //THIS HELPER FUNCTION IS HERE BECAUSE IT DEPENDS ON THE TASK INDEX
                            const updateTask = event => {
                                if (event.key.toLowerCase() === 'enter' && !taskExists) {
                                    taskList.splice(index, 1, editedTask);
                                    setEditTask(null);
                                    setEditedTask('');
                                }
                            };
                            //CONDITIONAL RENDERING OF EITHER THE INPUT FOR EDITING OR THE TASK.
                            if (editTask === task) {
                                return (
                                    <input
                                        key={index}
                                        className="form-control lead Task-muted mb-3 font-monospace"
                                        type="Task"
                                        placeholder="Edit task"
                                        onKeyDown={updateTask}
                                        onChange={taskEditing}
                                        value={editedTask}
                                    ></input>
                                );
                            } else {
                                return (
                                    <TaskItem
                                        key={index}
                                        task={task}
                                        index={index}
                                        setEditTask={setEditTask}
                                        removeTask={removeTask}
                                    />
                                );
                            }
                        })}

                        {taskList.length === 0 ? <NoTaskWarning /> : null}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;
