import { useContext, useState } from "react";
import "./Navbar.css";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { setStr } = useContext(UserContext);

  return (
    <nav
      className="navbar navbar-light bg-light sticky-top"
      style={{ backgroundColor: "#f2f2f2", marginBottom: "1rem" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          ProductsWarehouse
        </a>
        <div className="row align-items-center">
          <div className="col">
            <a className="nav-link" href="/category">
              Category
            </a>
          </div>
          <div className="col">
            <a className="nav-link" href="/products">
              Products
            </a>
          </div>
        </div>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setStr(e.target.value);
            }}
          />
          <button className="btn btn-outline-success" type="button">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
