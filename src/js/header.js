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
              src="https://raw.githubusercontent.com/Tauriel1202/stormwatchers/3dd29b403a4b9a9caa68d77c4a89a549510f48bc/public/imgs/icons/logoOffical.png"
              alt='stormwatchers: kids logo'
              width="100"
              height="100"
            />
          </div>
          <h1>Stormwatchers: Kids</h1>
          <div className="imgDiv">
            <a href="/account">
              <img
                src="https://github.com/Tauriel1202/stormwatchers/blob/master/public/imgs/icons/accountImg.png?raw=true"
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
        </nav>
      </header>
    </>
  );
}

export default Header;
