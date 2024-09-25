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
  const [icon, setIcon] = useState(null);

  const getForecastData = async () => {
    if (location.latitude !== undefined) {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`
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

  const getWeatherIcon = async (icon: string) => {
    return await axios
      .get(`https://openweathermap.org/img/wn/${icon}@4x.png`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getForecastData();
  }, [location]);

  return (
    <>
      <Card>
        {/* <CardTitle>
          <span className="flex" key="key">
            7 Days Forecast
          </span>
        </CardTitle> */}
        <div className="flex items-center justify-center space-x-10 w-full flex-row overflow-x-scroll">
          {data?.list.map((val: any) => {
            return (
              <>
                <div className="w-full flex flex-col space-y-0 max-sm:space-x-10 justify-center items-center">
                  <div className="flex w-full justify-center items-center text-sm max-sm:text-xs space-x-1">
                    <span className="flex w-full justify-center items-center space-x-1">
                      <span className="flex">
                        {moment(val.dt_txt).format("DD")}
                      </span>{" "}
                      <span className="flex">
                        {moment(val.dt_txt).format("MMMM")}
                      </span>
                    </span>
                    ,
                    <span className="flex">
                      {moment(val.dt_txt).format("hh")}
                    </span>
                    <span className="flex">
                      {moment(val.dt_txt).format("A")}
                    </span>
                  </div>
                  <div className="flex text-sm max-sm:text-xs w-full justify-center items-center">
                    <img
                      width="70px"
                      src={
                        "https://openweathermap.org/img/wn/" +
                        val.weather[0].icon +
                        "@2x.png"
                      }
                    ></img>
                    <span className="flex font-medium max-sm:text-xs">
                      {parseInt(val.main.temp)}°C
                    </span>
                  </div>
                  <div className="flex text-sm w-full justify-center items-center max-sm:text-xs">
                    <span className="flex">{val?.weather[0].description}</span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </Card>
    </>
  );
};

export default Forecast;
