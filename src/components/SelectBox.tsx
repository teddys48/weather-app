import axios from "axios";
import { useContext } from "react";
import Select from "react-select";
import { location, weatherAPIKey } from "../helper/Context";

const SelectBox = () => {
  console.log("select box");
  let apiKey = useContext(weatherAPIKey);
  let { setLocation }: any = useContext(location);
  const optionList = [
    { value: "Bogor", label: "Bogor" },
    { value: "Jakarta", label: "Jakarta" },
    { value: "Depok", label: "Depok" },
  ];

  const onChange = async (val: any) => {
    await axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${val}&limit=1&appid=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        let latitude = res.data[0].lat;
        let longitude = res.data[0].lon;
        setLocation({ latitude, longitude });
      });
  };

  return (
    <>
      <div className="flex flex-col border border-zinc-100 w-full p-2 space-y-2 bg-white rounded-md">
        <Select
          options={optionList}
          onChange={(val: any) => onChange(val.value)}
        />
      </div>
    </>
  );
};

export default SelectBox;
