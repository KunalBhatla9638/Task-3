import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./Pages/HomePage/HomePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import Navbar from "./components/Navbar";
import { UserContextProvider } from "../context/UserContext";
import ProductPage from "./Pages/ProductPage/ProductPage";
import SupportPage from "./Pages/SupportPage/SupportPage";

function App() {
  return (
    <>
      <div>
        <UserContextProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                <>
                  <Navbar /> <SearchPage />
                </>
              }
            />
            <Route
              path="/category"
              element={
                <>
                  <Navbar />
                  <CategoryPage />
                </>
              }
            />
            <Route
              path="/products"
              element={
                <>
                  <Navbar /> <ProductPage />
                </>
              }
            />

            <Route
              path="/support"
              element={
                <>
                  <Navbar /> <SupportPage />
                </>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </UserContextProvider>
      </div>
    </>
  );
}

export default App;
