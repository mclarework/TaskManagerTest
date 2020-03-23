import React, { Component } from "react";
import Task from "./task.js";
import "./app.css";

class App extends Component {
  state = {
    currentName: null,
    name: "",
    email: "",
    password: "",
    loginEmail: "",
    loginPassword: "",
    newTask: "",
    token: null,
    userTasks: []
  };

  //Input boxes
  changeName = event => {
    this.setState({ name: event.target.value });
  };

  changeEmail = event => {
    this.setState({ email: event.target.value });
  };

  changePassword = event => {
    this.setState({ password: event.target.value });
  };

  logEmail = event => {
    this.setState({ loginEmail: event.target.value });
  };

  logPassword = event => {
    this.setState({ loginPassword: event.target.value });
  };

  taskInput = event => {
    this.setState({ newTask: event.target.value });
  };

  //To add a user to the database
  addUser = e => {
    if (
      this.state.name !== "" ||
      this.state.email !== "" ||
      this.state.password !== ""
    ) {
      e.preventDefault();
      let databody = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };
      fetch("http://localhost:3010/users", {
        method: "POST",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => console.log(data));
    } else {
      console.log("Please enter required details");
    }
  };

  //To log an existing user to the database and store their token in local storage.
  login = e => {
    if (this.state.logEmail !== "" || this.state.logPassword !== "") {
      e.preventDefault();
      let databody = {
        email: this.state.loginEmail,
        password: this.state.loginPassword
      };
      fetch("http://localhost:3010/users/login", {
        method: "POST",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem("token", data.token);
        });
    } else {
      console.log("Please enter required details");
    }
  };

  //Logs the current user out and removes their toekn from local storage
  logout() {
    localStorage.clear();
  }

  //Adds a task to the current user's list
  addTask = e => {
    if (this.state.newTask !== "") {
      const tempHeader = new Headers();
      const headerToken = localStorage.token;
      tempHeader.append("Authorization", `${headerToken}`);
      tempHeader.append("Content-Type", `application/json`);
      e.preventDefault();
      let databody = {
        task: this.state.newTask
      };
      fetch("http://localhost:3010/tasks", {
        headers: tempHeader,
        method: "POST",
        body: JSON.stringify(databody)
      }).then(res => res.json());
    } else {
      console.log("Please enter required details");
    }
  };

  showTasks = e => {
    const tempHeader = new Headers();
    const headerToken = localStorage.token;
    tempHeader.append("Authorization", `${headerToken}`);
    e.preventDefault();
    fetch("http://localhost:3010/tasks", {
      headers: tempHeader,
      method: "GET"
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  render() {
    return (
      <div className="app">
        <div>
          <input id="name" onChange={this.changeName}></input>
        </div>
        <div>
          <input id="email" onChange={this.changeEmail}></input>
        </div>
        <div>
          <input id="password" onChange={this.changePassword}></input>
        </div>
        <div>
          <button onClick={this.addUser}>Submit</button>
        </div>
        <div>
          <input id="loginEmail" onChange={this.logEmail}></input>
        </div>
        <div>
          <input id="loginPassword" onChange={this.logPassword}></input>
        </div>
        <div>
          <button onClick={this.login}>Login</button>
        </div>
        <div>
          <button id="logout" onClick={this.logout}>
            Logout
          </button>
        </div>
        <Task input={this.taskInput} submit={this.addTask} />
        <div>
          <button onClick={this.showTasks}>Show Tasks</button>
        </div>
      </div>
    );
  }
}

export default App;
