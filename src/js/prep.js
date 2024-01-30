import React from "react";
import Header from "./header";
import Footer from "./footer";
import PrepJSON from "../json/prep.json";
import { toTitleCase } from "./functions";

class Prep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stormType: "Select a Storm!",
    };
  }

  prepType = () => {
    console.log(document.querySelector("select").value);

    let selectValue = document.querySelector("select").value;

    this.setState({ stormType: selectValue });
  };

  prepPage(prepType) {
    let stormType = this.state.stormType;

    if (this.state.stormType !== "Select a Storm!") {
      console.log(this.state.stormType, PrepJSON.prep[stormType][prepType]);
      return (
        <div className={prepType}>
          <h3>{toTitleCase(prepType)} the Storm</h3>
          <div
            className="prepTypeContent"
            dangerouslySetInnerHTML={{
              __html: PrepJSON.prep[this.state.stormType][prepType],
            }}
          ></div>
        </div>
      );
    } else if (prepType === "before") {
      return (
        <div className="noType">
          <p>
            No Storm Selected! Choose a storm type to see what you should do
            before, during, and after the chosen storm.
          </p>
        </div>
      );
    }
  }

  render() {
    let prepBefore = this.prepPage("before");
    let prepDuring = this.prepPage("during");
    let prepAfter = this.prepPage("after");
    console.log(this.state.stormType);

    return (
      <>
        <Header />
        <main className="prep">
          <h2>Weather Preparation</h2>
          <label>
            Choose a Storm Type:{" "}
            <select onChange={this.prepType}>
              <option>Select a Storm!</option>
              <option>Hurricanes</option>
              <option>Thunderstorms</option>
              <option>Tornadoes</option>
            </select>
          </label>
          <div className="prepContent">
            {prepBefore}
            {prepDuring}
            {prepAfter}
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

export default Prep;
