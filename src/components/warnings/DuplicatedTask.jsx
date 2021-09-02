import React from 'react';

const DuplicatedTask = () => {
    return (
        <li className="list-group-item list-group-item-danger inline-block font-monospace">
            <i className="bi-patch-exclamation fs-4 ms-2 align-middle"></i>
            <span className="ms-2 align-middle">This task is already on the list!</span>
        </li>
    );
};

export default DuplicatedTask;
