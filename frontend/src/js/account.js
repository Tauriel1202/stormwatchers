import React from "react";
import Header from "./header";
import Footer from "./footer";
import Cookies from "./cookie";
import axios from "axios";
import { getUrl } from "./functions";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "",
      signedIn: Cookies.getCookie("username"),
      dataUsername: "",
      dataEmail: "",
      profPic: "logoOfficial_xsmall",
      runMe: true,
      picClicked: false,
      host: getUrl() //localStorage.getItem("host") || "http://localhost:2024"
    };
  }

  buttons() {
    return (
      <div className="buttons">
        <h2>Account</h2>
        <div>
          <a href="/account/form?formType=login">Log in!</a>
          <a
            href={`/account/form?formType=create&profPic=${this.state.profPic}`}
          >
            Create an Account!
          </a>
        </div>
      </div>
    );
  }

  deleteAccount() {
    let si = Cookies.getCookie("username");
    axios
      .post(`${this.state.host}/account/delete`, { username: si })
      .then(() => {
        Cookies.setCookie("username", "");
        Cookies.setCookie("myImg", "logoOfficial_xsmall");
        let a = document.createElement("a");
        a.href = "/account";
        a.click();
      });
  }

  fetchUserData() {
    let currentUser = Cookies.getCookie("username");

    axios
      .post(`${this.state.host}/account`, { username: currentUser })
      .then((accountData) => {
        Cookies.setCookie('myImg', accountData.data.profPic)

        this.setState({
          dataUsername: accountData.data.username,
          dataEmail: accountData.data.email,
          profPic: accountData.data.profPic,
          runMe: false,
        }); //username values
      });
  }

  updateImg(img) {
    axios
      .post(`${this.state.host}/account/updateImg`, {
        profPic: img,
        oldPic: this.state.profPic,
      })
      .then(() => {
        Cookies.setCookie("myImg", img);
        this.setState({ profPic: img, picClicked: false });
      });
  }

  changePic() {
    let profImgs = [
      "logoOfficial_xsmall",
      "Binoculars_xsmall",
      "Cloud_xsmall",
      "Hurricane_xsmall",
      "Lightning_xsmall",
      "Rainbow_xsmall",
      "Raindrop2_xsmall",
      "Snowflake2_xsmall",
      "Sun_xsmall",
      "Tornado_xsmall",
    ];

    return (
      <div className="selectPic">
        <h3>Choose an Avatar</h3>
        {profImgs.map((img) => {
          return (
            <button
              key={img}
              className="singleImg"
              onClick={() => {
                this.updateImg(img);
              }}
            >
              <img
                src={`../imgs/profPics/${img}.webp`}
                alt={img}
                width={100}
                height={100}
              />
            </button>
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
        <h2>My Account</h2>
        {this.state.picClicked && this.changePic()}
        <button
          className="pic"
          onClick={() => {
            this.setPicClicked(true);
            
          }}
        >
          <div className="profPic">
            <img
              src={`../imgs/profPics/${this.state.profPic}.webp`}
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

        <a
          href={`/account/form?formType=edit&profPic=${this.state.profPic}`}
          className="edit"
        >
          Edit Account
        </a>
        {/* <button>Change Password</button> */}
        {/* <button>Change Email</button> */}
        <span></span>
        <button
          className="leave"
          onClick={() => {
            Cookies.deleteCookie("myImg");
            Cookies.deleteCookie("username");
          }}
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
