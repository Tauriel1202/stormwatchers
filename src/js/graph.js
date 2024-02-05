import React from "react";
import Plot from "react-plotly.js";
import Past from "../json/past.json";

class Graph extends React.Component {
  render() {
    return (
      <Plot
        className="plot"
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          {
            x: [1, 2, 3],
            y: [1, 4, 2],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "yellow" },
          },
          {
            x: [1, 2, 3],
            y: [6, 4, 2],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{ width: 800, height: 400, title: "A Fancy Plot" }}
      />
    );
  }
}

export default Graph;
