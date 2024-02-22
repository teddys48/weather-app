import CurrentWeather from "../components/CurrentWeather";
import SelectBox from "../components/SelectBox";

const Page = () => {
  return (
    <>
      <div className="flex flex-wrap flex-row w-full h-full p-7 space-y-5 bg-blue-300">
        <SelectBox />
        <CurrentWeather />
      </div>
    </>
  );
};

export { Page };
