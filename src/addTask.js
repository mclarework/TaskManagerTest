import React from "react"

const TaskList =(props)=> {
    return (
        <div>
            <div>
                <input onChange={props.input}></input>
            </div>
            <div className = "addlist">
                <button onClick={props.submit}>Add Task</button>
            </div>
        </div>
    )
}

export default TaskList