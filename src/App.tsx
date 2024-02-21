import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Page } from "./page/Home";

function App() {
  return (
    <div className="flex w-full h-full font-serif">
      <Router>
        <Routes>
          <Route path="/" element={<Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
