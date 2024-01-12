import React from "react";
import accountImg from "../imgs/icons/accountImg.png";
import logo from "../imgs/icons/logoPlaceholder.png";

function Header() {
  return (
    <>
      <header>
        <div className="headerContent">
          <div className="imgDiv">
            <img
              src={logo}
              alt="Stormwatchers: Kids logo"
              width="100"
              height="100"
            />
          </div>
          <h1>Stormwatchers: Kids</h1>
          <div className="imgDiv">
            <a href="/account">
              <img src={accountImg} alt="account" width="100" height="100" />
            </a>
          </div>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/weather">Weather Types</a>
          <a href="/prep">Storm Prep</a>
          <a href="/past">Past Weather Data</a>
          <a href="/lstorms">Legendary Storms</a>
          <a href="/watch">Report a Storm</a>
          <a href="/printables">Printable Activities</a>
        </nav>
      </header>
    </>
  );
}

export default Header;
