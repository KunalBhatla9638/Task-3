import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./ProductPage.css";

const ProductPage = () => {
  const token = localStorage.getItem("auth");
  const navigate = useNavigate();
  const [id, setId] = useState(-1);

  const [loader, setLoader] = useState(false);
  const [updateProductCard, setUpdateProductCard] = useState(false);
  const [addProductCard, setAddProductCard] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [userCategory, setUserCategory] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    categoryId: "",
    price: "",
    images: "",
  });

  //   const handleChanges = (e) => {
  //     const { value, name } = e.target;
  //     setProductData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  const handleChanges = (e) => {
    const { value, name } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchProducts = async () => {
    setLoader(true);
    try {
      const response = await axios.get(API + "/listProductByUser", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        setLoader(false);
        setUserCategory(response.data.userCategories);
        setUserProducts(response.data.userProducts);
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 204 || 200 || 500) {
        toast.error(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateProduct = (id) => {
    setId(id);
    const idx = userProducts.findIndex((item) => item.id == id);
    const productCurrentCategory = userCategory.find(
      (item) => item.id == userProducts[idx].categoryId
    );

    // setProductData((prevData) => ({
    //   ...prevData,
    //   name: userProducts[idx].name,
    //   description: userProducts[idx].description,
    //   categoryId: userProducts[idx].categoryId,
    //   price: userProducts[idx].price,
    //   images: userProducts[idx].images,
    // }));
    setProductData({
      name: userProducts[idx].name,
      description: userProducts[idx].description,
      categoryId: userProducts[idx].categoryId,
      price: userProducts[idx].price,
      images: userProducts[idx].images,
    });
    setUpdateProductCard(true);
  };

  const handleCategoryChange = (selectedCategory) => {
    setProductData({ ...productData, categoryId: selectedCategory });
  };

  const onClickUpdateProduct = async (e) => {
    try {
      e.preventDefault();
      // console.log(productData);
      const response = await axios.patch(
        API + `/updateProduct/${id}`,
        productData,
        {
          headers: {
            authorization: `svs ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setUpdateProductCard(false);
        fetchProducts();
        console.log(response);
        toast.success(response.data.msg);
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 400 || 404 || 500) {
        toast.error(error.response.data.error);
      }
    }
  };

  const onClickAddProduct = () => {
    setAddProductCard(true);
  };

  const AddProduct = (e) => {
    e.preventDefault();
    console.log(productData);
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(API + `/deleteProduct/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        console.log(response);
        fetchProducts();
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 400 || 404 || 500 || 409) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      {/* <h1>Loading</h1> */}
      {updateProductCard && (
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Update Product</h4>
            <form encType="multipart/form-data" onSubmit={onClickUpdateProduct}>
              <div className="mb-3">
                {/* Name */}
                <label htmlFor="nameInput" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameInput"
                  placeholder="Enter Name"
                  value={productData.name}
                  onChange={handleChanges}
                />
              </div>
              <div className="mb-3">
                {/* Description */}
                <label htmlFor="descriptionInput" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="descriptionInput"
                  placeholder="Enter Description"
                  value={productData.description}
                  onChange={handleChanges}
                />
              </div>
              <div className="mb-3">
                {/* CategoryId */}
                <label htmlFor="categoryIdInput" className="form-label">
                  Category ID
                </label>
                <select
                  className="form-select"
                  name="categoryIdInput"
                  value={productData.categoryId}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {userCategory.map((item) => {
                    return (
                      <option key={item.categoryname} value={item.id}>
                        {item.categoryname}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                {/* Price */}
                <label htmlFor="priceInput" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="priceInput"
                  placeholder="Enter Price"
                  value={productData.price}
                  onChange={handleChanges}
                />
              </div>
              <div className="mb-3">
                {/* Images */}
                <label htmlFor="imagesInput" className="form-label">
                  Images
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="productImages"
                  multiple
                />
              </div>
              <button type="submit" className="btn btn-success me-2">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setUpdateProductCard(false);
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {addProductCard && (
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add Product</h4>
            <form encType="multipart/form-data" onSubmit={AddProduct}>
              <div className="mb-3">
                {/* Name */}
                <label htmlFor="nameInput" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameInput"
                  placeholder="Enter Name"
                  value={productData.name}
                  onChange={handleChanges}
                />
              </div>
              <div className="mb-3">
                {/* Description */}
                <label htmlFor="descriptionInput" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="descriptionInput"
                  placeholder="Enter Description"
                  value={productData.description}
                  onChange={handleChanges}
                />
              </div>
              <div className="mb-3">
                {/* CategoryId */}
                <label htmlFor="categoryIdInput" className="form-label">
                  Category ID
                </label>
                <select
                  className="form-select"
                  name="categoryIdInput"
                  value={productData.categoryId}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {userCategory.map((item) => {
                    return (
                      <option key={item.categoryname} value={item.id}>
                        {item.categoryname}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                {/* Price */}
                <label htmlFor="priceInput" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="priceInput"
                  placeholder="Enter Price"
                  value={productData.price}
                  onChange={handleChanges}
                />
              </div>
              <div className="mb-3">
                {/* Images */}
                <label htmlFor="imagesInput" className="form-label">
                  Images
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="productImages"
                  multiple
                />
              </div>
              <button type="submit" className="btn btn-success me-2">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setUpdateProductCard(false);
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div>
        <div className="m-2">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#id</th>
                {/* <th scope="col" style={{ width: "100%" }}>
                  Your Category
                </th> */}
                <th scope="col">Name</th>
                <th scope="col" style={{ width: "100%" }}>
                  Description
                </th>
                <th scope="col">CategoryId</th>
                <th scope="col">Price</th>
                <th scope="col">Images</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
              <td
                colSpan={8}
                className="sticky-top bg-light"
                style={{ textAlign: "center", verticalAlign: "middle" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={onClickAddProduct}
                >
                  Add Products
                </button>
              </td>
            </thead>
            <tbody>
              {userProducts.map((item) => {
                const { id, name, description, categoryId, price, images } =
                  item;
                return (
                  <tr key={id}>
                    <th scope="row">{id}</th>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{categoryId}</td>
                    <td>{price}</td>
                    <td>{images}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => updateProduct(id)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => deleteProduct(id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
