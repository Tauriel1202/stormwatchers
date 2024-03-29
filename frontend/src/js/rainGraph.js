import React from "react";
import Plot from "react-plotly.js";
import Past from "../json/bostonPast.json";

class RainGraph extends React.Component {
  rainfallByYear(years) {
    let yearRain = [];
    for (let i = 0; i < 365; i++) {
      let dayRain = Past[years].locations["Boston, MA,USA"].values[i].precip;
      yearRain.push(dayRain);
    }

    let rainReady = (yearRain.reduce((sum, curr) => sum + curr) / 365).toFixed(
      2
    );
    return rainReady;
  }

  // for each year run graphline
  graphline(years, colors) {
    return {
      x: [years], //one year
      y: [this.rainfallByYear(years)], //one rainfall value
      type: "bar",
      text: [this.rainfallByYear(years)],
      marker: { color: colors },
      name: years,
    };
  }

  render() {
    // gets years from json
    let colors = ["#007a54", "#0ac6ff", "orange", "#65e77f", "#f764b7"];
    let years = [];

    for (let i = 0; i < Object.keys(Past).length; i++) {
      let pastJson = Object.keys(Past)[i];
      years.push(pastJson);
    }

    let graphlines = [];
    for (let i = 0; i < years.length; i++) {
      graphlines.push(this.graphline(years[i], colors[i]));
    }

    return (
      <Plot
        className="plot"
        data={[...graphlines]}
        layout={{
          width: 500,
          height: 400,
          autosize: true,
          title: "Rainfall by Year for Boston, MA (inches)",
        }}
      />
    );
  }
}

export default RainGraph;
