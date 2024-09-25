import { useContext } from "react";
import * as context from "../helper/Context";
import Card from "./Card";

const DetailWeather = () => {
  let data = useContext(context.dataDetailWeather);
  console.log("xxxx", data);
  return (
    <>
      <Card>
        <span>asaas</span>
      </Card>
    </>
  );
};

export default DetailWeather;
