import React from "react";
// import accountImg from "../imgs/icons/accountImg.png";
// import logo from "../imgs/icons/logoPlaceholder.png";

function Header() {
  return (
    <>
      <header>
        <div className="headerContent">
          <div className="imgDiv">
            <img
              src="./imgs/icons/logoPlaceholder.png"
              alt="Stormwatchers: Kids logo"
              width="100"
              height="100"
            />
          </div>
          <h1>Stormwatchers: Kids</h1>
          <div className="imgDiv">
            <a href="/account">
              <img src="./imgs/icons/accountImg.png" alt="account" width="100" height="100" />
            </a>
          </div>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/weather">Weather Types</a>
          <a href="/stormprep">Storm Prep</a>
          <a href="/pastweather">Past Weather Data</a>
          <a href="/legendarystorms">Legendary Storms</a>
          <a href="/stormwatch">Report a Storm</a>
          <a href="/printables">Printable Activities</a>
        </nav>
      </header>
    </>
  );
}

export default Header;
