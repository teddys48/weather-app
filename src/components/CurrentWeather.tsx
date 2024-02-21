import axios from "axios";
import { useEffect, useState } from "react";

const CurrentWeather = ({ latitude, longitude }: any) => {
  console.log(latitude, longitude);
  let [location, setLocation]: any = useState({});

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          const { latitude, longitude } = success.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log("Does not support geolocation");
    }
  };

  const getCurrentWeather = async () => {
    console.log("location", location);
    return await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=73d50daa62ff9ab6a412d4f16d0d6499&units=metric`
      )
      .then((data) => {
        console.log(data.data);
        // return (result = data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLocation();
    getCurrentWeather();
    // console.log("result");
  }, []);

  return (
    <>
      <div className="flex border border-zinc-200 w-full p-2">
        <span className="">Current Weather</span>
      </div>
    </>
  );
};

export default CurrentWeather;
