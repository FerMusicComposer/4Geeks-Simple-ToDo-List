import React from 'react';

const NoTaskWarning = () => {
    return (
        <li className="list-group-item list-group-item-warning mt-2 inline-block font-monospace">
            <i className="bi-patch-exclamation fs-5 ms-2 align-baseline"></i>
            <span className="ms-2 ">
                There are no tasks for the moment. Type and press enter on the input to add one.
            </span>
        </li>
    );
};

export default NoTaskWarning;
