import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import * as context from "../helper/Context";

const CurrentWeather = () => {
  let { location }: any = useContext(context.location);
  let [data, setData]: any = useState(null);
  const [time, setTime]: any = useState(null);
  const [image, setImage]: any = useState(null);
  const [sun, setSun]: any = useState({});

  const getCurrentWeather = async () => {
    if (location.latitude !== undefined) {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=73d50daa62ff9ab6a412d4f16d0d6499&units=metric&mode=json`
        )
        .then(async (data) => {
          console.log(data.data);
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
    let date = new Date();
    setTime(date.toLocaleString());
    let sunrise = moment(1708600473).format("HH:mm:ss");
    setSun(sunrise);
  }, [location]);
  console.log(sun);
  return (
    <>
      <div className="flex flex-col border border-zinc-100 w-full p-2 space-y-2 bg-white rounded-md">
        <div className="flex text-2xl max-sm:text-base font-thin justify-between border-b-2 pb-1">
          <span className="flex">Current Weather</span>
          <span className="flex">{time}</span>
        </div>
        <div className="flex flex-col w-full p-2 space-y-10">
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
                  <span>{data?.weather[0].description}</span>
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
          <div className="flex flex-row max-sm:flex-wrap max-sm:space-y-5 max-sm:space-x-0 space-x-5  w-full p-2">
            <div className="flex flex-col items-center space-y-3 text-2xl max-sm:text-base w-full justify-center">
              <div className="flex max-sm:w-full w-1/2 justify-between border-b-4">
                <span className="w-full">
                  Cloudiness{" "}
                  <i className="fa fa-cloud text-xl max-sm:text-base"></i>
                </span>
                <span>{data?.clouds.all}%</span>
              </div>
              <div className="flex max-sm:w-full w-1/2 justify-between border-b-4">
                <span className="">
                  {" "}
                  <span>Feels Like </span>
                  <i className=" fa-solid fa-temperature-low text-xl max-sm:text-base"></i>
                </span>
                <span>{Math.round(data?.main.feels_like)}°C</span>
              </div>
              <div className="flex max-sm:w-full w-1/2 justify-between border-b-4">
                <span>
                  Humidity{" "}
                  <i className="fa-solid fa-droplet text-xl max-sm:text-base"></i>
                </span>
                <span>{Math.round(data?.main.humidity)}%</span>
              </div>
              <div className="flex max-sm:w-full w-1/2 justify-between border-b-4">
                <span>
                  Pressure{" "}
                  <i className="fa-solid fa-arrows-to-circle text-xl max-sm:text-base"></i>
                </span>
                <span>{Math.round(data?.main.pressure)} hPa</span>
              </div>
              <div className="flex max-sm:w-full w-1/2 justify-between border-b-4">
                <span>
                  Max Temperature{" "}
                  <i className="fa-solid fa-temperature-arrow-up text-xl max-sm:text-base"></i>
                </span>
                <span>{Math.round(data?.main.temp_max)}°C</span>
              </div>
              <div className="flex max-sm:w-full w-1/2 justify-between border-b-4">
                <span>
                  Min Temperature{" "}
                  <i className="fa-solid fa-temperature-arrow-down text-xl max-sm:text-base"></i>
                </span>
                <span>{Math.round(data?.main.temp_min)}°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
