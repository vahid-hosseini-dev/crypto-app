import { useEffect, useState } from "react";
import { convertData } from "../../helpers/convertData";
import { RotatingLines } from "react-loader-spinner";

import styles from "./Chart.module.css";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  Line,
  YAxis,
  XAxis,
  Legend,
  Tooltip,
} from "recharts";

function Chart({ chart, setChart, currency }) {
  const [type, setType] = useState("prices");
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    if (chart) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [chart, type]);

  const typeHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      const type = event.target.innerText.toLowerCase().replace(" ", "_");
      setType(type);
    }
  };

  return (
    <div className={styles.container} onClick={() => setChart(null)}>
      <span className={styles.cross} onClick={() => setChart(null)}>
        X
      </span>
      <div
        className={styles.chart}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.graph}>
          {isloading ? (
            <div className={styles.loading}>
              <RotatingLines
                strokeColor="#3874ff"
                strokeWidth="3"
                animationDuration="0.75"
                width="48"
                visible={true}
              />
            </div>
          ) : (
            <ChartComponent data={convertData(chart, type)} type={type} />
          )}
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === "prices" ? styles.selected : null}>
            Prices
          </button>
          <button className={type === "market_caps" ? styles.selected : null}>
            Market Caps
          </button>
          <button className={type === "total_volumes" ? styles.selected : null}>
            Total Volumes
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices:</p>
            <span>
              {currency?.toLowerCase() === "usd" ? "$ " : null}
              {currency?.toLowerCase() === "eur" ? "€ " : null}
              {currency?.toLowerCase() === "jpy" ? "¥ " : null}
              {chart.coin.current_price.toLocaleString()}
            </span>
          </div>
          <div>
            <p>ATH:</p>
            <span>
              {currency?.toLowerCase() === "usd" ? "$ " : null}
              {currency?.toLowerCase() === "eur" ? "€ " : null}
              {currency?.toLowerCase() === "jpy" ? "¥ " : null}
              {chart.coin.ath.toLocaleString()}
            </span>
          </div>
          <div>
            <p>Market Cap::</p>
            <span>{chart.coin.market_cap.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />

        <CartesianGrid stroke="#404042" />
        <YAxis
          dataKey={type}
          domain={["auto", "auto"]}
          fontSize={12}
          width={80}
        />
        <XAxis
          dataKey="date"
          domain={["auto", "auto"]}
          angle={-45}
          textAnchor="end"
          fontSize={12}
          height={50}
        />
        <Legend wrapperStyle={{ paddingTop: 12 }} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
