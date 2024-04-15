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
  const [userProfile, setUserProfile] = useState("");

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

  // setUserProfile("profileImagePlaceholder.png");

  const getUserProfile = async () => {
    try {
      const response = await axios.get(API + "/getProfile", {
        headers: {
          authorization: `asdf ${token}`,
        },
      });
      if (response.status == 200) {
        setUserProfile(response.data.profile_pic);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (allCategory == "") {
      getAllCategory();
    }
    if (userProfile == "") {
      getUserProfile();
    }
  });

  const { setFilter } = useContext(UserContext);

  const onFilterClick = (e) => {
    setFilter(e.target.value);
  };

  const imageBaseurl = "http://localhost:4000/api/public/";

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

            {/* <div style={{ "border-radius": "50%", overflow: "hidden" }}>
              <img
                src="src/assets/react.svg"
                style={{ width: "100%", height: "35px", display: "block" }}
              />
            </div> */}
            <div
              class="rounded-circle overflow-hidden"
              style={{ width: "7rem", height: "40px", marginLeft: "10px" }}
            >
              <img
                src={imageBaseurl + userProfile}
                class="img-fluid"
                // alt="src/assets/profileImagePlaceholder.png"
              />
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
