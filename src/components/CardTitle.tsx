const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex text-2xl px-5 max-sm:px-0 max-sm:text-base justify-between border-b-2 pb-1">
        {children}
      </div>
    </>
  );
};

export default CardTitle;
