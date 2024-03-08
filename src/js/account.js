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
      dataUsername: "",
      dataEmail: "",
      runMe: true,
      picClicked: false,
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

    axios
      .post("http://localhost:2024/account", { username: currentUser })
      .then((accountData) => {
        console.log(Object.keys(accountData.data));

        this.setState({
          dataUsername: accountData.data.username,
          dataEmail: accountData.data.email,
          runMe: false,
        }); //username values

        // for (let i = 1; i < Object.keys(accountData.data).length; i++) {
        //   let dataNames = Object.keys(accountData.data)[i]; //data names
        // }
      });
  }

  changePic() {
    let profImgs = ["logoOfficial", "Snow", "waterIcon", "listImgRainbow"];

    return (
      <div className="selectPic">
        {profImgs.map((img) => {
          console.log(img);
          return (
            <div key={img} className="singleImg">
              <img
                src={`../imgs/icons/${img}.png`}
                alt={img}
                width={100}
                height={100}
              />
            </div>
          );
        })}
      </div>
    );
  }

  setPicClicked(value) {
    this.setState({ picClicked: value });
  }

  myaccount() {
    if (this.state.runMe) {
      let userData = this.fetchUserData();
    }

    return (
      <div className="myaccount">
        <h2>My Account {this.state.picClicked.toString()}</h2>
        {this.state.picClicked && this.changePic()}
        <button
          className="pic"
          onClick={() => {
            this.setPicClicked(true);
          }}
        >
          <div className="profPic">
            <img
              src="../imgs/icons/listImgRainbow.png"
              alt="profile"
              width={25}
              height={25}
            />
          </div>
        </button>
        <div className="info">
          <p>
            <strong>Username: </strong>
            {this.state.dataUsername}
          </p>
          <p>
            <strong>Password: </strong>********
          </p>
          <p>
            <strong>Email: </strong>
            {this.state.dataEmail}
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
