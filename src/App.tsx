import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Page } from "./page/Home";
import * as context from "./helper/Context";
import { useEffect, useState } from "react";

function App() {
  const [location, setLocation] = useState({});

  // setLocation({ latitude, longitude });

  useEffect(() => {
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
  }, []);

  return (
    <div className="flex w-full h-full font-normal bg-slate-200">
      <context.location.Provider value={{ location, setLocation }}>
        <Router>
          <Routes>
            <Route path="/" element={<Page />} />
          </Routes>
        </Router>
      </context.location.Provider>
    </div>
  );
}

export default App;
