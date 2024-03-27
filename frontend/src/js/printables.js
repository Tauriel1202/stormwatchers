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
    let otherPrints = document.querySelector(".prints");
    otherPrints.style.display = "none";

    return (
      <div className="popup">
        <h2>Print Preview</h2>
        <button
          className="button"
          onClick={() => {
            this.printOne();
          }}
        >
          Print
        </button>

        <div className="thePrint">
          <h3>
            <img
              src="../imgs/icons/logoOfficial_xsmall.webp"
              alt="logo"
              width={100}
              height={100}
            />
            Stormwatchers: Kids
          </h3>
          <div className="imgDiv">
            <img
              src={`../imgs/profPics/${this.state.printImg}.webp`}
              alt={`${this.state.printImg}`}
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    );
  }

  printOne() {
    let imgToPrint = document.querySelector(".thePrint").innerHTML;

    //print
    let w;
    w = window.open();
    w.document.write(imgToPrint);
    w.print();
    w.close();

    this.setState({ printImg: false });

    // imgToPrint.addEventListener("click", (e) => {
    //   window.print();
    // }
    // );
  }

  displayPrints() {
    let printImgs = [
      "logoOfficial_small",
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
              src={`../imgs/profPics/${img}.webp`}
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
