import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./Navbar.css";
import API from "../axios";

const Navbar = () => {
  const token = localStorage.getItem("auth");
  const { setStr } = useContext(UserContext);
  const navigate = useNavigate();
  const [allCategory, setAllCategory] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const getAllCategory = async () => {
    try {
      const response = await axios(API + "/getCategories", {
        headers: {
          authorization: `afdonf ${token}`,
        },
      });

      if (response.status == 200) {
        // console.log(response);
        setAllCategory(response.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (allCategory == "") {
      getAllCategory();
    }
  });

  const { setFilter } = useContext(UserContext);

  const onFilterClick = (e) => {
    setFilter(e.target.value);
  };

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
          <div className="col">
            <a className="nav-link" href="/support">
              Support
            </a>
          </div>
        </div>
        <div>
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
            {/* SQL for all categorys - select DISTINCT categories.categoryname from categories 
            RIGHT JOIN products on categories.id = products.categoryId; */}
            {/* SQL for filter on particula category - select DISTINCT * from categories 
          RIGHT JOIN products on categories.id = products.categoryId WHERE categories.categoryname = "mouse"; */}
            <div className="dropdown">
              <select onChange={onFilterClick}>
                <option value="" defaultChecked>
                  Filter
                </option>
                {allCategory.map((item) => {
                  const cat = item.categoryname;
                  return (
                    <option value={cat} key={cat}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            </div>
          </form>
        </div>
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={() => {
            const result = confirm("Do you want to logout for sure..?");
            if (result) {
              localStorage.removeItem("auth");
              navigate("/login");
            }
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
