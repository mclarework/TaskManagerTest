import React, { Component } from "react";
import Task from "./task.js"
import "./app.css";

class App extends Component {
  state = {
    currentName: null,
    name: "",
    email: "",
    password: "",
    loginEmail: "",
    loginPassword: "",
    token: null
  };

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

  addUser = e => {
    if (
      this.state.name !== "" &&
      this.state.email !== "" &&
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
    };
  };

  login = e => {
    if (
      this.state.logEmail !== "" &&
      this.state.logPassword !== ""
    ) {
      e.preventDefault();
      let databody = {
        email: this.state.loginEmail,
        password: this.state.loginPassword
      };
      console.log(databody)
      fetch("http://localhost:3010/users/login", {
        method: "POST",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem("token",data.token)
        })
      
    } else {
      console.log("Please enter required details");
    }
  };

  logout() {
    localStorage.clear()
  }

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
          <button id="logout" onClick={this.logout}>Logout</button>
        </div>
        <Task/>
      </div>
    );
  }
}

export default App;
