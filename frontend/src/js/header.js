import React from "react";
import Cookies from "./cookie";
import axios from "axios";
import { getUrl } from "./functions";
// import accountImg from "../imgs/icons/accountImg.png";
// import logo from "../imgs/icons/logoPlaceholder.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: Cookies.getCookie("username"),
      userPic: Cookies.getCookie("myImg") || "profPlaceholder_xsmall",
      host: getUrl(),
    };
  }

  componentDidMount() {
    let currentUser = Cookies.getCookie("username");

    axios
      .post(`${this.state.host}/account`, { username: currentUser })
      .then((data) => {
        console.log(data.data.profPic);
        this.setState({ userPic: data.data.profPic });
      });
  }

  render() {

    return (
      <>
        <header id="top">
          <div className="headerContent">
            <div className="imgDiv">
              <img
                src="../imgs/icons/logoOfficial_xsmall.webp"
                alt="stormwatchers: kids logo"
                width="100"
                height="100"
              />
            </div>
            <h1>Stormwatchers: Kids</h1>
            <div className="imgDiv">
              <a href="/account">
                <img
                  src={`../imgs/profPics/${this.state.userPic}.webp`}
                  alt="account"
                  width="100"
                  height="100"
                />
              </a>
            </div>
            <button
              onClick={(e) => {
                document.querySelector("nav").classList.toggle("on");
                e.target.classList.toggle("on");
              }}
            ></button>
          </div>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/weather">Weather Types</a>
              </li>
              <li>
                <a href="/stormprep">Storm Prep</a>
              </li>
              <li>
                <a href="/pastweather">Past Weather Data</a>
              </li>
              <li>
                <a href="/legendarystorms">Legendary Storms</a>
              </li>
              <li>
                <a href="/stormwatch">Report a Storm</a>
              </li>
              <li>
                <a href="/printables">Printable Activities</a>
              </li>
              <li className="smallNav">
                <a href="/account">Account</a>
              </li>
            </ul>
          </nav>
        </header>
      </>
    );
  }
}

export default Header;
