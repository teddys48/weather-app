const ListCurrentWeather = ({ name, data, icon }: any) => {
  return (
    <>
      <div className="flex max-sm:w-full w-3/4 justify-between border-b-2">
        <span>
          {name} <i className={`${icon} text-xl max-sm:text-base`}></i>
        </span>
        <span>{data}</span>
      </div>
    </>
  );
};

export default ListCurrentWeather;
