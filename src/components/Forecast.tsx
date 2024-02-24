import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import * as context from "../helper/Context";
import Card from "./Card";
import CardTitle from "./CardTitle";

const Forecast = () => {
  let apiKey = useContext(context.weatherAPIKey);
  let { location }: any = useContext(context.location);
  let [data, setData]: any = useState(null);

  const getForecastData = async () => {
    if (location.latitude !== undefined) {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`
        )
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getForecastData();
  }, [location]);

  return (
    <>
      <Card>
        <CardTitle>
          <span className="flex">Forecast</span>
        </CardTitle>
        <div className="flex space-x-10 w-full flex-row overflow-x-scroll">
          {data?.list.map((val: any) => {
            return (
              <>
                <span className="flex w-full text-xs">
                  {moment(val.dt_txt.slice(0, -3)).format("YYYY-MM-D")}
                </span>
              </>
            );
          })}
        </div>
      </Card>
    </>
  );
};

export default Forecast;
