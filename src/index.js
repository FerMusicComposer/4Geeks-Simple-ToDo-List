import 'bootstrap/dist/css/bootstrap.css';
import './styles.scss';
import React from 'react';
import ReactDom from 'react-dom';
import ToDoList from './ToDoList';

const App = () => {
    return (
        <div>
            <ToDoList />
        </div>
    );
};

ReactDom.render(<App />, document.querySelector('#root'));
