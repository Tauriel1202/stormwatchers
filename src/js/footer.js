import React from "react";
// import logo from "../imgs/icons/logoPlaceholder.png";

function Footer() {
  return (
    <>
      <footer>
        <div className="imgDiv">
          <img
              src="https://github.com/Tauriel1202/stormwatchers/blob/master/public/imgs/icons/logoPlaceholder.png?raw=true"
              alt="Stormwatchers: Kids Logo"
            width={100}
            height={100}
          />
        </div>
        <div className="footerText">
          <p><strong>Stormwatchers: Kids</strong></p>
          <p>&copy; 2024 🌀 Stormwatchers: Kids 🌀 Courtney Christensen</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
