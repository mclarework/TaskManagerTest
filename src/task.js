import React from "react";
import TaskList from "./addTask"
import "./app.css";


const Task = (props) => {
  return (
    <div>
      {localStorage.length !== 0 ? (
        <div className="active">
          <TaskList input={props.input} submit = {props.submit}/>
        </div>
      ) : (
        <div className="inactive">
          <p>Logged out</p>
        </div>
      )}
    </div>
  );
};

export default Task;
