import CurrentWeather from "../components/CurrentWeather";

const Page = () => {
  return (
    <>
      <div className="flex flex-wrap flex-row w-full h-full p-7 bg-blue-300">
        <CurrentWeather />
      </div>
    </>
  );
};

export { Page };
