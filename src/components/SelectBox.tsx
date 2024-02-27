import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { location, stateAPIKey, weatherAPIKey } from "../helper/Context";
import Card from "./Card";

const SelectBox = () => {
  console.log("select box");
  let apiKey = useContext(weatherAPIKey);
  let stateApiKey = useContext(stateAPIKey);
  let { setLocation }: any = useContext(location);
  const [countryList, setCountryList]: any = useState(null);
  const [cityList, setCityList]: any = useState(null);
  const [selectCountryVal, setSelectCountryVal]: any = useState(undefined);
  const [cityName, setCityName]: any = useState(null);

  const getCountryList = async () => {
    await axios
      .get(`https://api.countrystatecity.in/v1/countries`, {
        headers: { "X-CSCAPI-KEY": stateApiKey },
      })
      .then((res) => {
        console.log("country", res.data);
        const data: any = [];
        res.data?.map((val: any) => {
          let obj = {
            value: val.iso2,
            label: val.name,
          };
          data.push(obj);
        });
        setCountryList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const getCityList = async (country: string) => {
    if (country === undefined) {
    } else {
      await axios
        .get(`https://api.countrystatecity.in/v1/countries/${country}/cities`, {
          headers: { "X-CSCAPI-KEY": stateApiKey },
        })
        .then((res) => {
          console.log("country", res.data);
          const data: any = [];
          res.data?.map((val: any) => {
            let obj = {
              value: val.name,
              label: val.name,
            };
            data.push(obj);
          });
          setCityList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setCurrentLocation();
    getCountryList();
  }, []);

  const onChangeCountry = async (val: any) => {
    if (val === undefined) {
      setCityList(null);
      onChangeCity(val);
    } else {
      getCityList(val);
    }

    // setValueToNull(val);
    setSelectCountryVal(val);
  };

  const onChangeCity = async (val: string) => {
    setCityName(val);
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
        <div className="flex space-x-2 max-sm:space-x-0 max-sm:text-xs max-sm:flex-col w-full max-sm:space-y-1 max-sm:justify-evenly">
          <Select
            className="w-full"
            isClearable
            placeholder="SELECT COUNTRY"
            options={countryList}
            onChange={(val: any) => onChangeCountry(val?.value)}
          />
          <Select
            className="w-full"
            isDisabled={selectCountryVal === undefined ? true : false}
            isClearable
            tabSelectsValue
            value={cityName === undefined ? null : "alksdnskladnaslkndlska"}
            defaultValue={cityName}
            placeholder="SELECT CITY"
            options={cityList}
            onChange={(val: any) => onChangeCity(val?.value)}
          />
        </div>
      </Card>
    </>
  );
};

export default SelectBox;
