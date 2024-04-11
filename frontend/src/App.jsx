import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./Pages/HomePage/HomePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";

function App() {
  return (
    <>
      <div>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<SearchPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
