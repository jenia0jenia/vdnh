import Highcharts, { SeriesAreaOptions } from "highcharts";
import geojson from "data/spb-district.json";
// import { libs } from "./libs";

export const Regions: Highcharts.Options = {
  credits: { enabled: false },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom",
    },
  },

  legend: {
    enabled: false,
  },

  colorAxis: {
    min: 0,
    stops: [
      [0, "#EFEFFF"],
      [0.67, "#4444FF"],
      [1, "#000022"],
    ],
  },
};
