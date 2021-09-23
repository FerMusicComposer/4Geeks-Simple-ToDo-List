import React, { useEffect, useState } from 'react';
import DuplicatedTask from './components/warnings/DuplicatedTask';
import NoTaskWarning from './components/warnings/NoTaskWarning';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';

const ToDoList = () => {
    const [newTask, setNewTask] = useState({ label: '', done: false });
    const [taskList, setTaskList] = useState([]);
    const [taskExists, setTaskExists] = useState(false);
    const [editTask, setEditTask] = useState('');
    const [updatedTask, setUpdatedTask] = useState({ label: '', done: false });

    /////////////////////////////////////////////
    ////HELPER FUNCTIONS
    /////////////////////////////////////////////

    const takeInputValue = event => {
        setNewTask({ label: event.target.value, done: false });
    };

    const addTask = event => {
        if (event.key.toLowerCase() === 'enter' && !taskExists && newTask.label !== '') {
            setTaskList([...taskList, newTask]);

            setNewTask({ label: '', done: false });
        }
    };

    const removeTask = removableIndex => {
        let newTasklist = [...taskList];
        newTasklist.splice(removableIndex, 1);
        setTaskList(newTasklist);
    };

    const taskEditing = event => {
        setUpdatedTask({ label: event.target.value, done: false });
    };

    const updateTask = (event, index) => {
        if (event.key.toLowerCase() === 'enter' && taskExists === false) {
            taskList.splice(index, 1, updatedTask);
            setEditTask(null);
            setUpdatedTask({ label: '', done: false });
        }
    };

    const toggleCompleted = (completedTask, task) => {
        if (task === completedTask) {
            const updatedTasks = taskList.map(aTask => {
                if (completedTask === aTask.label) {
                    return {
                        ...aTask,
                        done: !aTask.done,
                    };
                } else {
                    return aTask;
                }
            });
            setTaskList(updatedTasks);
        }
    };

    /////////////////////////////////////////////
    ////FETCH/API FUNCTIONS
    /////////////////////////////////////////////

    const createUserList = async () => {
        const createList = await fetch('https://assets.breatheco.de/apis/fake/todos/user/fersalamanca', {
            method: 'POST',
            body: [],
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response = await createList.json();
        console.log('from createList: ', response);
    };

    const refreshTasks = async () => {
        const updateTask = await fetch('https://assets.breatheco.de/apis/fake/todos/user/fersalamanca', {
            method: 'PUT',
            body: JSON.stringify(taskList),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response = await updateTask.json();
        console.log('response:', response);
        //setTaskList(response);
        console.log('from refreshTasks: ', taskList);
    };

    const fetchData = async () => {
        const dataRequest = await fetch('https://assets.breatheco.de/apis/fake/todos/user/fersalamanca', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const dataResponse = await dataRequest.json();
        console.log('from fetchData: ', dataResponse);
    };

    /////////////////////////////////////////////
    ////USE EFFECTS
    /////////////////////////////////////////////

    //CHECKS IF ALREADY IN TASKLIST
    useEffect(() => {
        let alreadyInTasklist = taskList.findIndex(
            task => task.label.toLowerCase() === newTask.label.toLowerCase(),
        );
        if (alreadyInTasklist === -1) {
            setTaskExists(false);
        } else {
            setTaskExists(true);
        }
    }, [newTask, taskList]);

    //CREATES USER LIST
    useEffect(() => {
        createUserList();
    }, []);

    //GETS DATA FROM API AND UPDATES TASKLIST
    useEffect(() => {
        fetchData();
        refreshTasks();
    }, [taskList]);

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
                            //CONDITIONAL RENDERING OF EITHER THE INPUT FOR EDITING OR THE TASK.

                            if (editTask === task.label) {
                                return (
                                    <input
                                        key={index}
                                        className="form-control lead Task-muted mb-3 font-monospace"
                                        type="text"
                                        placeholder={task.label}
                                        onKeyDown={event => updateTask(event, index)}
                                        onChange={event => taskEditing(event)}
                                        value={updatedTask.label}
                                    ></input>
                                );
                            }
                            return (
                                <TaskItem
                                    key={index}
                                    task={task.label}
                                    index={index}
                                    setEditTask={setEditTask}
                                    removeTask={removeTask}
                                    toggleCompleted={toggleCompleted}
                                    taskDone={task.done}
                                    updatedTaskDone={updatedTask.done}
                                />
                            );
                        })}

                        {taskList.length === 0 ? <NoTaskWarning /> : null}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;
