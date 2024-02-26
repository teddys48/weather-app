const ListCurrentWeather = ({ name, data, icon }: any) => {
  return (
    <>
      <div className="flex max-sm:w-full w-2/5 justify-between">
        <span>
          {name}
        </span>
        <span>{data}</span>
      </div>
    </>
  );
};

export default ListCurrentWeather;
