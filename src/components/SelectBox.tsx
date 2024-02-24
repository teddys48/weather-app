import axios from "axios";
import { useContext, useEffect } from "react";
import Select from "react-select";
import { location, weatherAPIKey } from "../helper/Context";
import Card from "./Card";

const SelectBox = () => {
  console.log("select box");
  let apiKey = useContext(weatherAPIKey);
  let { setLocation }: any = useContext(location);
  const optionList = [
    { value: "Bogor", label: "Bogor" },
    { value: "Jakarta", label: "Jakarta" },
    { value: "Depok", label: "Depok" },
  ];

  const setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos.coords.latitude);
        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;
        setLocation({ latitude, longitude });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    setCurrentLocation();
  }, []);

  const onChange = async (val: any) => {
    if (val === undefined) {
      setCurrentLocation();
    } else {
      await axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${val}&limit=1&appid=${apiKey}`
        )
        .then((res) => {
          console.log(res.data);
          let latitude = res.data[0].lat;
          let longitude = res.data[0].lon;
          setLocation({ latitude, longitude });
        });
    }
  };

  return (
    <>
      <Card>
        <Select
          isClearable
          options={optionList}
          onChange={(val: any) => onChange(val?.value)}
        />
      </Card>
    </>
  );
};

export default SelectBox;
