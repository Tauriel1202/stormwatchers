import Cookies from "./cookie";
import React from "react";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: new URLSearchParams(window.location.search).get("formType"),
      signedIn: false,
    };
  }

  // console.log(props.signedIn);

  accountForm() {
    console.log(this.state.formType);
    if (this.state.formType === "login") {
      return (
        <>
          <h2>Login</h2>
          <form className="login" method="post">
            <label>
              Username:
              <input
                type="text"
                name="username"
                className="username"
                required
              />
            </label>
            <label>
              Password:{" "}
              <input type="password" name="pwd" className="pwd" required />
            </label>
            <button
              onClick={(e) => {
                this.postForm(e, "login");
              }}
            >
              Log in!
            </button>
          </form>
        </>
      );
    } else if (this.state.formType === "create") {
      return (
        <>
          <h2>Create an Account</h2>
          <form className="create" method="post">
            <label>
              Create Username: *
              <input
                type="text"
                name="username"
                className="username"
                placeholder="myusername123"
                required
              />
            </label>
            <label>
              Create a password using letters AND numbers: *
              <input type="password" name="pwd" className="pwd" required />
            </label>
            <label>
              Recovery Email:
              <input type="email" name="email" className="email" />
            </label>
            <button
              onClick={(e) => {
                this.postForm(e, "create");
              }}
            >
              Create Account!
            </button>
          </form>
        </>
      );
    }
  }

  postForm(e, method) {
    e.preventDefault();
    let inputs = document.querySelectorAll("input");
    let data = {};
    // let navigate = useNavigate();

    for (let input of inputs) {
      data[input.getAttribute("name")] = input.value;
    }

    if (method === "create") {
      axios.post(`http://localhost:2024/account/create`, data).then(() => {
        Cookies.setCookie("username", data.username);
      });
    } else {
      Cookies.setCookie("username", data.username);
    }

    let a = document.createElement("a");
    a.href = "/account";
    a.click();
  }

  render() {
    return (
      <>
        <Header />
        <main className="formMain" key={this.state.signedIn}>
          {this.accountForm()}
        </main>
        <Footer />
      </>
    );
  }
}

export default Form;
