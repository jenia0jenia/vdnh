import Highcharts, {
  Series,
  SeriesAreaOptions,
  SeriesDemaOptions,
  SeriesItemOptions,
  SeriesOptions,
  SeriesSplineOptions,
} from "highcharts";

import { apiRequest } from "services/API/API";

const TIMER = 10;
const today = new Date(),
  day = 1000 * 60 * 60 * 24;

export const BooksPerMinute: Highcharts.Options = {
  title: {
    text: `Книговыдача в минуту (обновление каждые ${TIMER} сек.)`,
  },
  chart: {
    type: "spline",
    marginRight: 10,
    events: {
      load: async function () {
        const series = this.series[0];

        // TODO: remove double code
        const bookPerMinute = await apiRequest("/books/speed") || null;
        const time = new Date().getTime();
        try {
          series.addPoint([time, bookPerMinute], true, true, true);
        } catch (e) {
          console.error("new point adding error");
        }

        setInterval(async () => {
          const bookPerMinute = await apiRequest("/books/speed") || null;
          const time = new Date().getTime();
          try {
            series.addPoint([time, bookPerMinute], true, true, true);
          } catch (e) {
            console.error("new point adding error");
          }
        }, TIMER * 1000);
      },
    },
  },
  // time: {
  //   useUTC: false,
  // },
  accessibility: {
    announceNewData: {
      enabled: true,
      minAnnounceInterval: TIMER * 1000,
      announcementFormatter: function (allSeries, newSeries, newPoint) {
        if (newPoint) {
          return "New point added. Value: " + newPoint.y;
        }
        return false;
      },
    },
  },
  xAxis: {
    type: "datetime",
    tickPixelInterval: 150,
    allowDecimals: false,
    maxRange: 20000,
    minRange: 10000,
    dateTimeLabelFormats: {
      millisecond: "%H:%M:%S",
      second: "%H:%M:%S",
      minute: "%H:%M",
      hour: "%H:%M",
      day: "%e. %b",
      week: "%e. %b",
      month: "%b '%y",
      year: "%Y",
    },
    // softMin
    min: today.getTime(),
    // max: today.getTime() + 1000 * 60 * 5, // длина оси х - 5 минут
  },

  yAxis: {
    max: 600,
    title: {
      text: "Количество",
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: "#800000",
      },
    ],
  },

  tooltip: {
    headerFormat: "<b>{series.name}</b><br/>",
    pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}",
  },

  legend: {
    enabled: false,
  },

  exporting: {
    enabled: false,
  },

  series: [
    {
      name: "-",
      data: (function () {
        const data: object[] = [
          {
            x: today.getTime(),
            y: 0,
          },
        ];
        for (let i = -50; i <= 0; i += 1) {
          data.push({});
        }
        return data;
      })(),
      // type: 'spline',
      // type: "item",
    } as SeriesSplineOptions,
  ],
};

function formatTime(time: Date) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
}
