import React, { useEffect, useRef, useState } from "react";
import Highcharts, {
  SeriesOptionsType,
  SeriesAreaOptions,
  PointLabelObject,
  DataLabelsOptions,
  ChartOptions,
  Series,
} from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "./Map.css";
import { apiRequest } from "../../services/API/API";
import { Regions } from "./options";
import geojson from "../../data/spb-district.json";
import { libs } from "./libs";

require("highcharts/modules/map")(Highcharts);

interface IOperationalData {
  id?: string | number;
  libName: string;
  newR: number; // зарегистрированных читателей сегодня
  regR: number; // обновлённых читателей сегодня
  kv: number; // количество выдач сегодня
  pos: number; // что сделал читатель сегодня ??
  nekz: number; // Объём фонда
  kmv?: number; // кол-во мест выдачи (KMV)
  kfil?: number; // кол-во филиалов (точнее - территориально разнесенных подразделений)
}

type mapProp = "newR" | "regR" | "kv" | "pos" | "nekz" | "kmv" | "kfil";

function Map(props: { property: mapProp, title: string }) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [options, setOptions] = useState<SeriesAreaOptions>({
    type: "area",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiRequest("/operational/get")?.then((data: IOperationalData[]) => {
      data = data.map((lib) => ({
        ...lib,
        id: libs[lib.libName.trim()],
      }));

      setOptions({
        ...Regions,
        // chart: {
        // events: {
        // load: function (e: PointerEvent) {
        // console.log(this.series[0].searchPoint(e));
        // console.log(e);

        // this.series = [
        //   {
        //     mapData: formatGeoWithKVToday(data),
        //     data: (function () {
        //       return data.map(({ id, newR }) => [id?.toString(), newR]);
        //     })(),
        //     dataLabels: {
        //       enabled: true,
        //       // format: "{point.properties.KV}",
        //       // this: PointLabelObject, options: DataLabelsOptions
        //       formatter: function (
        //         t: PointLabelObject,
        //         options: DataLabelsOptions
        //       ) {
        //         console.log(this);
        //         return "123";
        //       },
        //       position: "left",
        //       style: {
        //         fontSize: "16px",
        //         color: "white",
        //       },
        //     },
        //   } as any,
        // ];
        // },
        // },
        // } as ChartOptions,
        series: [
          {
            mapData: formatGeoWithKVToday(data, props.property),
            data: (function () {
              return data.map(({ id, newR }) => [id?.toString(), newR]);
            })(),
            dataLabels: {
              enabled: true,
              format: `{point.properties.${props.property}}`,
              position: "left",
              style: {
                fontSize: "16px",
                color: "white",
              },
            },
          },
        ],
        title: {
          text: props.title,
        },
        type: "area",
      } as SeriesAreaOptions);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="Map">
      {!isLoading && (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={"mapChart"}
          allowChartUpdate={true}
          ref={chartComponentRef}
          {...props}
        />
      )}
    </div>
  );
}

function formatGeoWithKVToday(data: IOperationalData[], property: mapProp) {
  geojson.features = geojson.features.map((feature: any) => {
    const f = data.find((lib) => lib.id === feature.properties.id);
    feature.properties[property] = f ? f[property] : "";
    return feature;
  });
  return geojson;
}

export default Map;
