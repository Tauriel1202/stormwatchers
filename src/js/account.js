import React from "react";
import Header from "./header";
import Footer from "./footer";
import Cookies from "./cookie";
import axios from "axios";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "",
      signedIn: Cookies.getCookie("username"),
    };
  }

  buttons() {
    return (
      <div className="buttons">
        <h2>Account</h2>
        <div>
          <a href="/account/form?formType=login">Log in!</a>
          <a href="/account/form?formType=create">Create an Account!</a>
          {/* <button onClick={() => this.setState({ formType: "login" })}>
            Log in!
          </button>
          <button onClick={() => this.setState({ formType: "signup" })}>
            Create an Account!
          </button> */}
        </div>
      </div>
    );
  }

  deleteAccount() {
    let si = Cookies.getCookie("username");
    console.log(si);
    axios
      .post("http://localhost:2024/account/delete", { username: si })
      .then(() => {
        console.log("💩💩💩💩💩");
        Cookies.setCookie("username", "");
        let a = document.createElement("a");
        a.href = "/account";
        a.click();
      });
  }

  fetchUserData() {
    let currentUser = Cookies.getCookie("username");
    console.log(currentUser);
    axios.get("http://localhost:2024/account", currentUser).then((e) => {
      console.log(e.data);
    });
  }

  myaccount() {
    // this.fetchUserData();
    return (
      <div className="myaccount">
        <h2>My Account</h2>
        <div className="profPic">
          <img
            src="../imgs/icons/listImgRainbow.png"
            alt="profile"
            width={25}
            height={25}
          />
        </div>
        <div className="info">
          <p>
            <strong>Username: </strong>Galadriel
          </p>
          <p>
            <strong>Password: </strong> ********
          </p>
          <p>
            <strong>Email: </strong>ladyoflight@lorien.elf
          </p>
        </div>
        <a href="/account/form?formType=edit" className="edit">
          Edit Account
        </a>
        {/* <button>Change Password</button> */}
        {/* <button>Change Email</button> */}
        <span></span>
        <button
          className="leave"
          onClick={() => Cookies.deleteCookie("username")}
        >
          Logout
        </button>
        <button className="hazard" onClick={this.deleteAccount}>
          Delete Account
        </button>
      </div>
    );
  }

  render() {
    return (
      <>
        <Header />
        <main className="account">
          {/* if not signed in */}
          {!this.state.signedIn && this.buttons()}
          {/* {this.state.signedIn === false && this.accountForm()} */}

          {/* if signed in... */}
          {this.state.signedIn && this.myaccount()}
        </main>
        <Footer />
      </>
    );
  }
}

export default Account;
