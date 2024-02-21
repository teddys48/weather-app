import axios from "axios";
import { useState, useEffect } from "react";
import CurrentWeather from "../components/CurrentWeather";
import currentWeather from "../components/CurrentWeather";

const Page = () => {
  const [location, setLocation]: any = useState(null);
  const [currentLocation, setCurrentLocation]: any = useState(null);
  let latitude: any;
  let longitude: any;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        latitude = success.coords.latitude;
        longitude = success.coords.longitude;
      },
      (err) => {
        console.log(err);
      }
    );
  } else {
    console.log("Does not support geolocation");
  }

  return (
    <>
      <div className="flex flex-wrap flex-row w-full h-full p-7">
        <CurrentWeather latitude={latitude} longitude={longitude} />
      </div>
    </>
  );
};

export { Page };
