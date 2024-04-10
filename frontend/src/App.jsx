import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./Pages/HomePage/HomePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

function App() {
  return (
    <>
      <div>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

