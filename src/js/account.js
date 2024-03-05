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
    // return <div className="popup">
    //   <h4>Are you sure you want to delete your account?</h4>
    //   <button>Cancel</button>
    //   <form method="post">
    //     <label>Type your username here: <input</label>
    //   </form>
    // </div>
    let si = Cookies.getCookie('username');
    console.log(si)
    axios.delete("http://localhost:2024/account/delete", si).then(() => {
      Cookies.setCookie('username', '');
      let a = document.createElement("a");
      a.href = "/account";
      a.click();
    });
  }

  myaccount() {
    return (
      <div className="myaccount">
        <h2>My Account</h2>
        <p>
          <strong>Username: </strong>Galadriel
        </p>
        <p>
          <strong>Password: </strong> ********
        </p>
        <p>
          <strong>Email: </strong>ladyoflight@lorien.elf
        </p>
        <button>Change Username</button>
        <button>Change Password</button>
        <button>Change Email</button>
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
