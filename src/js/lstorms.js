import React from "react";
import Header from "./header";
import Footer from "./footer";
import lJson from "../json/lstorms.json";
import { stormType, toTitleCase } from "./functions";

class Lstorms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stormType: "Choose a storm type!",
    };
  }

  stormType = () => {
    let type = document.querySelector("select").value;

    this.setState({ stormType: type });
  };

  storm() {
    return Object.keys(lJson.lstorms[this.state.stormType.toLowerCase()]).map(
      (sName, i) => {
        let json = lJson.lstorms[this.state.stormType.toLowerCase()];
        let landfallDeets = json[sName].details; //landfall info
        let maxDeets = json[sName].max; //max info
        let impactDeets = json[sName].impact; //impact info

        console.log(json[sName], landfallDeets);

        function stormDeets(deets) {
          return Object.keys(deets).map((i) => {
            return (
              <li key={i}>
                {toTitleCase(i)}: {deets[i]}
              </li>
            );
          });
        }

        return (
          <div className="hurricanes" key={sName}>
            <h3>{sName}</h3>
            <div className="landfall">
              <h4>Storm Details</h4>
              <ul>{stormDeets(landfallDeets)}</ul>
            </div>

            {this.state.stormType === "Hurricanes" && (
              <div className="max">
                <h4>Storm Data at Maximum Strength</h4>
                <ul>{stormDeets(maxDeets)}</ul>
              </div>
            )}

            <div className="impact">
              <h4>Impact on People</h4>
              <ul>{stormDeets(impactDeets)}</ul>
            </div>
            <div className="facts">
              <h4>Facts about the Storm</h4>
              <div
                dangerouslySetInnerHTML={{ __html: json[sName].facts }}
              ></div>
            </div>
          </div>
        );
      }
    );
  }

  // tornadoes() {
  //   return Object.keys(lJson.lstorms.tornadoes).map((i) => {
  //     let json = lJson.lstorms.tornadoes[i]; //single storm
  //     let stormName = i; // name of storm

  //     console.log(json);

  //     return (
  //       <div className="tornadoes">
  //         <h3>{i}</h3>
  //         <div className="stormDeets">
  //           <h4>Storm Details</h4>
  //           <ul>{}</ul>
  //         </div>
  //         <div className="impact">
  //           <h4>Impact</h4>
  //         </div>
  //       </div>
  //     );
  //   });
  // }

  // snowstorms() {}

  stormChoice() {
    console.log("💩");
    console.log(this.state.stormType);

    // if (this.state.stormType === "Hurricanes") {
    //   return <>{this.hurricanes()}</>;
    // } else if (this.state.stormType === "Tornadoes") {
    //   return <>{this.tornadoes()}</>;
    // } else if (this.state.stormType === "Blizzards") {
    //   return <>{this.snowstorms()}</>;
    if (this.state.stormType !== "Choose a storm type!") {
      return <>{this.storm()}</>;
    } else {
      return (
        <p className="noType">
          No storm type selected! Choose one to see some of the legendary storms
          of that type. These are some of the strongest, deadliest, most
          well-known storms. Some of them even hold records!
        </p>
      );
    }
  }

  render() {
    return (
      <>
        <Header />
        <main className="lstorms">
          <h2>Legendary Storms</h2>
          <label>
            Select a type to see its legendary storms:
            <select className="select" onChange={this.stormType}>
              <option>Choose a Storm Type!</option>
              {stormType(lJson, "lstorms")}
            </select>
          </label>
          {this.stormChoice()}
        </main>
        <Footer />
      </>
    );
  }
}

export default Lstorms;
