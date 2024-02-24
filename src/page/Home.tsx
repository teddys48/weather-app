import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";
import SelectBox from "../components/SelectBox";

const Page = () => {
  return (
    <>
      <div className="flex flex-wrap flex-row w-full h-full p-7 space-y-5 bg-blue-300">
        <SelectBox />
        <CurrentWeather />
        <Forecast />
      </div>
    </>
  );
};

export { Page };
