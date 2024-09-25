import CurrentWeather from "../components/CurrentWeather";
import DetailWeather from "../components/DetailWeather";
import Forecast from "../components/Forecast";
import SelectBox from "../components/SelectBox";

const Page = () => {
  return (
    <>
      <div className="flex flex-wrap flex-col w-full h-full p-7 max-sm:p-3 space-y-5 bg-blue-300">
        <SelectBox />
        <CurrentWeather />
        <Forecast />
        {/* <DetailWeather /> */}
      </div>
    </>
  );
};

export { Page };
