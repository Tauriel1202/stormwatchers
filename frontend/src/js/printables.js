import "../css/print.css";
import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";

class Printables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      print: false,
      printImg: "",
    };
  }

  printPopup() {
    document.querySelector(".prints").style.display = "none";
    document.querySelector("header").style.display = "none";
    document.querySelector("footer").style.display = "none";

    return (
      <div className="popup">
        <div className="popupHead">
          <h2>Print Preview</h2>
          <div id="buttons">
            <button
              className="button"
              onClick={() => {
                {
                  window.print()
                    ? this.setState({ print: false })
                    : this.setState({ print: false });
                }
              }}
            >
              Print
            </button>
            <a href="./printables" className="leave">
              Cancel
            </a>
          </div>
        </div>
        <div className="thePrint">
          <h3>
            <img
              src="../imgs/icons/logoOfficial_xsmall.webp"
              alt="logo"
              width={100}
              height={100}
            />
            <span>Stormwatchers: Kids</span>
          </h3>
          <div className="imgDiv">
            <img
              src={`../imgs/prints/${this.state.printImg}.png`}
              alt={`${this.state.printImg}`}
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    );
  }

  displayPrints() {
    let printImgs = [
      "weatherTypeAnagrams",
      "snowflakeTypesUnscramble",
      "cloudCrossword",
      "weatherTypeCrossword",
      "lstormsWordSearch",
      "stormPrepWordSearch",
      "weatherColoringPage",
    ];

    return printImgs.map((img) => {
      return (
        <div
          className="onePrint"
          key={img}
          onClick={() => {
            this.setState({ print: true, printImg: img });
          }}
        >
          <div className={`imgDiv`}>
            <img
              src={`../imgs/prints/${img}.png`}
              alt={`${img}`}
              height={100}
              width={100}
            />
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        <Header />
        <main className="printables">
          {this.state.print && this.printPopup()}
          <div className="prints">
            <div className="printHead">
              <h2>Printable Activites</h2>
              <p>Click an Image to see the Print Preview!</p>
            </div>
            {this.displayPrints()}
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

export default Printables;
