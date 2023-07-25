import React, { useEffect, useRef } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import { apiRequest } from "../../services/API/API";
import { BooksPerMinute } from "./options";

// import "./PerMinute.css";
// import { Regions } from "./chart/Options";

function PerMinute() {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    
  }, []);

  return (
    <div className="PerMinute">
      <HighchartsReact
        highcharts={Highcharts}
        options={BooksPerMinute}
        // allowChartUpdate={true}
        ref={chartComponentRef}
        // {...props}
      />
    </div>
  );
}

export default PerMinute;
