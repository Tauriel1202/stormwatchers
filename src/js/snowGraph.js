import React from "react";
import Plot from "react-plotly.js";
import Past from "../json/alaskaPast.json";

class SnowGraph extends React.Component {
  snowfallByMonth(month, year) {
    let days = Past[year].locations["Anchorage, AK, USA"].values;
    let oneMonth = days.filter(
      (x) => new Date(x.datetimeStr).getMonth() === month
    );

    let snowfalls = oneMonth.map((x) => x.snowdepth);

    const snowsReady = Math.round(
      snowfalls.reduce((sum, curr) => sum + curr) / snowfalls.length,
      1
    );

    return snowsReady;
  }

  graphline(years, color) {
    let monthNames = {
      January: 0,
      February: 1,
      March: 2,
      November: 10,
      December: 11,
    };

    let snows = [];
    for (let i of Object.keys(monthNames)) {
      snows.push(this.snowfallByMonth(monthNames[i], years));
    }

    return {
      x: Object.keys(monthNames),
      y: snows,
      type: "bar",
      marker: { color: color },
      name: years,
    };
  }

  render() {
    let years = [];

    for (let i = 0; i < Object.keys(Past).length; i++) {
      let pastJson = Object.keys(Past)[i];
      years.push(pastJson);
    }

    let graphlines = [];
    let colors = ["#007a54", "#0ac6ff", "orange", "#65e77f", "#f764b7"];

    for (let i = 0; i < years.length; i++) {
      graphlines.push(this.graphline(years[i], colors[i]));
    }

    return (
      <Plot
        className="plot"
        data={[... graphlines]}
        layout={{ width: 500, height: 400, title: "Snowfall per Month (inches)" }}
      />
    );
  }
}

export default SnowGraph;
