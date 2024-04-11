import { useContext, useEffect, useState } from "react";
import axios from "axios";
import API from "../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./SearchPage.css";
import { UserContext } from "../../../context/UserContext";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const { str } = useContext(UserContext);
  const [notFound, setNotFound] = useState(false);

  const token = localStorage.getItem("auth");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API + "/products", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 400) {
        toast.error(error.response.data.error);
      }
    }
  };

  const fetchSearchProducts = async () => {
    try {
      const response = await axios.post(
        `${API}/searchProducts`,
        {
          searchStr: str,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        setNotFound(true);
        setProducts(response.data.result);
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 400 || 404 || 500) {
        if (error.response.data.error == "Item not found") {
          setNotFound(false);
        }
        toast.error(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    if (str == "") {
      fetchProducts();
      setNotFound(true);
    }
    fetchSearchProducts();
  }, [str]);

  const imageBaseurl = "http://localhost:4000/api/public/";

  return (
    <>
      {token && (
        <div>
          {notFound ? (
            <div className="product-wrapper">
              {products.map((item) => {
                const { id, name, description, price, images } = item;
                const oneImage = JSON.parse(images)[0];
                return (
                  <div className="card" key={id}>
                    <img
                      // src="src\assets\imgPlaceholder.png"
                      src={imageBaseurl + oneImage}
                      className="card-img-top"
                      alt="Product Image"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                      <p className="card-text">{description}</p>
                      <div className="last">
                        <p className="card-text">
                          <b>${price}</b>
                        </p>
                        <button>Buy Now</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>Not Found</h1>
          )}
        </div>
      )}
    </>
  );
};

export default SearchPage;
