import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SearchPage = () => {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("auth");
  console.log(token);
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
        console.log("done");
        setProducts(response.data.data);
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 400) {
        toast.error(error.response.data.error);
        // navigate("/login");
        // window.location.reload();
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <>
      {token && (
        <div>
          <div>Hello </div>
          <h1>Search here</h1>
        </div>
      )}
    </>
  );
};

export default SearchPage;
