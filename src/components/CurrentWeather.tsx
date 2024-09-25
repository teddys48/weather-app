import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import * as context from "../helper/Context";
import Card from "./Card";
import CardTitle from "./CardTitle";
import ListCurrentWeather from "./ListCurrentWeather";

const CurrentWeather = () => {
  let { location }: any = useContext(context.location);
  let apiKey = useContext(context.weatherAPIKey);
  let stateApiKey = useContext(context.stateAPIKey);
  let [data, setData]: any = useState(null);
  const [time, setTime]: any = useState(null);
  const [image, setImage]: any = useState(null);

  const getCurrentWeather = async () => {
    if (location.latitude !== undefined) {
      // await axios
      //   .get(`https://api.countrystatecity.in/v1/countries`, {
      //     headers: { "X-CSCAPI-KEY": stateApiKey },
      //   })
      //   .then((res) => {
      //     console.log("country", res.data);
      //   });
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric&mode=json`
        )
        .then(async (data) => {
          setData(data.data);
          setImage(
            "https://openweathermap.org/img/wn/" +
              data.data.weather[0].icon +
              "@4x.png"
          );
          // await getState(data.data.name);
          // return (result = data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getState = async (city: string) => {
    await axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=73d50daa62ff9ab6a412d4f16d0d6499`
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    getCurrentWeather();
    let date = moment().format("HH:mm");
    setTime(date.toLocaleString());
  }, [location]);

  return (
    <>
      <Card>
        {/* <CardTitle>
          <span className="flex">Current Weather</span>
          <span className="flex">{time}</span>
        </CardTitle> */}
        <div className="flex flex-row max-sm:flex-col w-full p-2 space-y-10">
          <div className="flex flex-row w-full justify-evenly">
            <div className="flex">
              <span className="flex flex-row justify-center items-center">
                <span className="flex flex-col justify-center items-center">
                  <img
                    width="150px"
                    className="max-sm:w-20"
                    src={image}
                    alt="icon"
                  ></img>
                  {/* <span>{data?.weather[0].description}</span> */}
                </span>
                <span className="flex flex-col text-xl">
                  <span>{parseInt(data?.main.temp)}°C</span>
                </span>
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="w-full justify-center flex max-sm:text-xl text-4xl pl-1">
                <span>{data?.name}</span>
              </span>
            </div>
          </div>
          {/* <span className="flex w-full border-b-2"></span> */}
          {/* <div className="flex flex-row max-sm:flex-wrap max-sm:space-y-5 max-sm:space-x-0 space-x-5  w-full p-2">
            <div className="flex flex-col font-thin items-center space-y-3 text-2xl max-sm:text-sm w-full justify-center">
              <ListCurrentWeather
                name="Cloudiness"
                data={data?.clouds.all + "%"}
                icon={"fa fa-cloud "}
              />
              <ListCurrentWeather
                name="Feels Like"
                data={Math.round(data?.main.feels_like) + "°C"}
                icon="fa-solid fa-temperature-low"
              />
              <ListCurrentWeather
                name="Humidity"
                data={Math.round(data?.main.humidity) + "%"}
                icon={"fa-solid fa-droplet"}
              />
              <ListCurrentWeather
                name="Pressure"
                data={Math.round(data?.main.pressure) + " hPa"}
                icon={"fa-solid fa-arrows-to-circle"}
              />
              <ListCurrentWeather
                name="Max Temperature"
                data={Math.round(data?.main.temp_max) + "°C"}
                icon={"fa-solid fa-temperature-arrow-up"}
              />
              <ListCurrentWeather
                name="Min Temperature"
                data={Math.round(data?.main.temp_min) + "°C"}
                icon={"fa-solid fa-temperature-arrow-down"}
              />
              <ListCurrentWeather
                name="Visibility"
                data={Math.round(data?.visibility) + "m"}
                icon={"fa-regular fa-eye"}
              />
              <ListCurrentWeather
                name="Wind Speed"
                data={Math.round(data?.wind.speed) + "m/s"}
                icon={"fa-solid fa-wind"}
              />
              <ListCurrentWeather
                name="Wind Direction"
                data={Math.round(data?.wind.deg) + "°"}
                icon={"fa-solid fa-location-arrow"}
              />
            </div>
          </div> */}
        </div>
      </Card>
    </>
  );
};

export default CurrentWeather;
