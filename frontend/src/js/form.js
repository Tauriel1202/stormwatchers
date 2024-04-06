import Cookies from "./cookie";
import React from "react";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { getUrl } from "./functions";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: new URLSearchParams(window.location.search).get("formType"),
      profPic: "profPlaceholder_xsmall",
      signedIn: false,
      error: false,
      host:getUrl()//localStorage.getItem("host") || "http://localhost:2024"

    };
  }

  accountForm() {
    if (this.state.formType === "login") {
      return (
        <>
          <h2>Login</h2>
          {this.state.error && <p>Username or Password incorrect.</p>}
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
              Password:
              <input type="password" name="pwd" className="pwd" required />
            </label>
            <button
              onClick={(e) => {
                this.postForm(e, "login");
              }}
              id="login"
            >
              Log in!
            </button>
            <a href="../account" className="leave">
              Cancel
            </a>
          </form>
        </>
      );
    } else if (this.state.formType === "create") {
      return (
        <>
          <h2>Create an Account</h2>
          {this.state.error && (
            <p className="wrong">Username or Email already exists.</p>
          )}
          <form className="create" method="POST">
            <label>
              Create Username: *
              <input
                type="text"
                name="username"
                className="username"
                placeholder="myusername123"
                required="required"
              />
            </label>
            <label>
              Create a password using a mix of lowercase letters, UPPERCASE
              letters and numbers: *
              <input
                type="password"
                name="pwd"
                className="pwd"
                required
                // pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,16})$"
              />
            </label>
            <label>
              Recovery Email:
              <input type="email" name="email" className="email" />
            </label>
            <input
              type="hidden"
              name="profPic"
              className="pic"
              value={this.state.profPic}
            />

            <button
              onClick={(e) => {
                this.postForm(e, "create");
              }}
            >
              Create Account!
            </button>
            <a href="../account" className="leave">
              Cancel
            </a>
          </form>
        </>
      );
    } else if (this.state.formType === "edit") {
      return (
        <>
          <h2>Edit Account</h2>
          {this.state.error && (
            <p className="wrong">Username or Email already exists.</p>
          )}
          <form className="create" method="POST">
            <label>
              Username: *
              <input
                type="text"
                name="username"
                className="username"
                placeholder="myusername123"
                required="required"
              />
            </label>
            <label>
              Password using a mix of lowercase letters, UPPERCASE letters and
              numbers: *
              <input
                type="password"
                name="pwd"
                className="pwd"
                required
                // pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,16})$"
              />
            </label>
            <label>
              Recovery Email:
              <input type="email" name="email" className="email" />
            </label>
            <label>
              Retype Old Username to approve these changes:
              <input
                type="text"
                name="oldName"
                className="oldName"
                placeholder="myOldUserName"
              />
            </label>
            <input
              type="hidden"
              name="profPic"
              className="pic"
              value={Cookies.getCookie('myImg')}
            />
            <button
              onClick={(e) => {
                this.postForm(e, "edit");
              }}
            >
              Update Account!
            </button>
            <a href="../account" className="leave">
              Cancel
            </a>
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

    if (method === "create" && data.username !== "" && data.pwd !== "") {
      axios.post(`${this.state.host}/account/create`, data).then((e) => {
        if (e.data.includes("username")) {
          this.setState({ error: true });
        } else {
          Cookies.setCookie("myImg", data.profPic);
          Cookies.setCookie("username", data.username);
          let a = document.createElement("a");
          a.href = "/account";
          a.click();
        }
      });
    } else if (method === "login" && data.username !== "" && data.pwd !== "") {
      axios.post(`${this.state.host}/account/login`, data).then((e) => {
        if (e.data.includes("username") || e.data.includes("password")) {
          this.setState({ error: true });
        } else {
          Cookies.setCookie('myImg', data.profPic)
          Cookies.setCookie("username", data.username);
          let a = document.createElement("a");
          a.href = "/account";
          a.click();
        }
      });
    } else if (method === "edit" && data.username !== "" && data.pwd !== "") {
      axios.post(`${this.state.host}/account/edit`, data).then((e) => {
        if (e.data.includes("username")) {
          this.setState({ error: true });
        } else {
          Cookies.setCookie('myImg', data.profPic)
          Cookies.setCookie("username", data.username);
          let a = document.createElement("a");
          a.href = "/account";
          a.click();
        }
      });
    }
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
