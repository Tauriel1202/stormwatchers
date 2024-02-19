import React from "react";
import Header from "./header";
import Footer from "./footer";
import lJson from "../json/lstorms.json";
import { stormType, toTitleCase } from "./functions";

class Lstorms extends React.Component {
  hurricanes() {
    return Object.keys(lJson.lstorms.hurricanes).map((sName, i) => {
      let json = lJson.lstorms.hurricanes;
      let landfallDeets = json[sName].landfall; //landfall info
      let maxDeets = json[sName].max; //max info
      let impactDeets = json[sName].impact; //impact info

      function stormDeets(deets) {
        return Object.keys(deets).map((i) => {
          return (
            <li>
              {toTitleCase(i)}: {deets[i]}
            </li>
          );
        });
      }

      return (
        <div className="hurricanes">
          <h3>{sName}</h3>
          <div className="landfall">
            <h4>Storm Details</h4>
            <ul>{stormDeets(landfallDeets)}</ul>
          </div>
          <div className="max">
            <h4>Storm Data at Maximum Strength</h4>
            <ul>{stormDeets(maxDeets)}</ul>
          </div>
          <div className="impact">
            <h4>Impact on People</h4>
            <ul>{stormDeets(impactDeets)}</ul>
          </div>
          <div className="facts">
            <h4>Facts about the Storm</h4>
            <div dangerouslySetInnerHTML={{ __html: json[sName].facts }}></div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        <Header />
        <main className="lstorms">
          <h2>Legendary Storms</h2>
          <label>
            Select a type to see its legendary storms: 
            <select className="select">
              <option>Choose a Storm Type!</option>
              {stormType(lJson, "lstorms")}
            </select>
          </label>
          {this.hurricanes()}
        </main>
        <Footer />
      </>
    );
  }
}

export default Lstorms;
