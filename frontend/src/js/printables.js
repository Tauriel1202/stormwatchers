import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";

class Printables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      print: false,
      printImg: "",
      printImgs: [
        "snowflakeTypesAnagrams",
        "weatherTypeAnagrams",
        "weatherColoringPage",
        "cloudCrossword",
        "weatherTypeCrossword",
        "winterPrepCrossword",
        "lstormsWordSearch",
        "stormPrepWordSearch",
      ],
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

  displayPrints(i) {
    // return this.state.printImgs.map((img) => {
    return (
      <div
        className="onePrint"
        key={i}
        onClick={() => {
          this.setState({ print: true, printImg: i });
        }}
      >
        <div className={`imgDiv`}>
          <img
            src={`../imgs/prints/${i}.png`}
            alt={`${i}`}
            height={100}
            width={100}
          />
        </div>
      </div>
    );
    // });
  }

  catTitles() {
    let cats = ["Anagrams", "Coloring", "Crossword", "WordSearch"];

    return cats.map((i) => {
      return (
        <div className="catTitle" id={i} key={i}>
          <h2>{i}</h2>
          {
            /* {this.state.printImgs.search(i) ? this.displayPrints() : ""} */
            this.state.printImgs.map((img) =>
              img.includes(i) ? this.displayPrints(img) : ""
            )
          }
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
            {this.catTitles()}
            {/* {this.displayPrints()} */}
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

export default Printables;
