import { useContext, useEffect, useState } from "react";
import axios from "axios";
import API from "../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./ProductPage.css";
import { UserContext } from "../../../context/UserContext";

const ProductPage = () => {
  const token = localStorage.getItem("auth");
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();
  const [id, setId] = useState(-1);
  const { str, setAllCategory } = useContext(UserContext);

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
    productImages: null,
  });
  const [notFound, setNotFound] = useState(false);

  const [pimg, setPimg] = useState("");
  // const [prevImagees, setPrevImages] = useState("");

  const handleFileChange = (e) => {
    setPimg(e.target.files);
    console.log(e.target.files);
    // setProductData({ ...productData, productImages: e.target.files });
  };

  const handleChanges = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    document.title = "Product Page";
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
      if (errorCode == 204 || 400 || 200 || 500) {
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
        setLoader(false);
        setUserProducts(response.data.result);
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

  console.log(userID);

  const getAllUsersCategories = async () => {
    try {
      const response = await axios(API + `/getUserCategories/${userID}`, {
        headers: {
          authorization: `afdonf ${token}`,
        },
      });

      if (response.status == 200) {
        console.log(response.data.result);
        setAllCategory(response.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (str == "") {
      fetchProducts();
      setNotFound(true);
    }
    getAllUsersCategories();
    fetchSearchProducts();
  }, [str]);

  const handleCategoryChange = (selectedCategory) => {
    setProductData({ ...productData, categoryId: selectedCategory });
    console.log(productData.categoryId);
  };

  const updateProduct = (id) => {
    window.scrollTo(0, 0);
    setId(id);
    const idx = userProducts.findIndex((item) => item.id == id);
    const productCurrentCategory = userCategory.find(
      (item) => item.id == userProducts[idx].categoryId
    );
    // setPrevImages(userProducts[idx].images);
    setProductData({
      name: userProducts[idx].name,
      description: userProducts[idx].description,
      categoryId: userProducts[idx].categoryId,
      price: userProducts[idx].price,
      productImages: null,
    });
    setUpdateProductCard(true);
  };

  const onClickUpdateProduct = async (e) => {
    const form = new FormData();
    try {
      e.preventDefault();
      form.append("categoryName", productData.name);
      form.append("description", productData.description);
      form.append("categoryId", productData.categoryId);
      form.append("price", productData.price);

      console.log(pimg);
      if (pimg.length != 0) {
        for (let i = 0; i < pimg.length; i++) {
          console.log(pimg[i]);
          form.append(`productImages`, pimg[i]);
        }
      }
      // else {
      //   form.append("images", JSON.stringify(prevImagees));
      // }

      const response = await axios.patch(API + `/updateProduct/${id}`, form, {
        headers: {
          authorization: `svs ${token}`,
        },
      });
      if (response.status == 200) {
        setUpdateProductCard(false);
        fetchProducts();
        console.log(response);
        toast.success(response.data.status);
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 400 || 404 || 500) {
        console.log(form);
        toast.error(error.response.data.error);
      }
    }
  };

  const onClickAddProduct = async () => {
    window.scrollTo(0, 0);
    setAddProductCard(true);
  };

  const AddProduct = async (e) => {
    e.preventDefault();
    const form = new FormData();
    try {
      form.append("categoryName", productData.name);
      form.append("description", productData.description);
      form.append("categoryId", productData.categoryId);
      form.append("price", productData.price);
      //* When you are dealing with the mulitiple images it will give you the filelist object that can not be send through formdata so you need to iterate it one by one like below.
      for (let i = 0; i < pimg.length; i++) {
        form.append(`productImages`, pimg[i]);
      }

      const response = await axios.post(API + `/addProducts`, form, {
        headers: {
          authorization: `svs ${token}`,
        },
      });
      if (response.status == 200) {
        setAddProductCard(false);
        fetchProducts();
        console.log(response);
        toast.success(response.data.status);
        setProductData({
          name: "",
          description: "",
          categoryId: "",
          price: "",
          productImages: null,
        });
      }
    } catch (error) {
      console.log(response);
      const errorCode = error.response.status;
      if (errorCode === 400 || errorCode === 404 || errorCode === 500) {
        console.log(form);
        console.log(productData);
        toast.error(error.response.data.error);
      }
    }
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

  const scrollToTop = () => window.scrollTo(0, 0);

  const imageBaseurl = "http://localhost:4000/api/public/";

  const handleCancel = async (imageToDelete, id) => {
    console.log(id, imageToDelete);
    try {
      const response = await axios.patch(
        API + `/deleteImage/${id}`,
        {
          imageToDelete,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        console.log(response);
        fetchProducts();
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.log("Error");
    }
  };

  return (
    <div>
      {token ? (
        <div>
          {/* <h1>Loading</h1> */}
          {updateProductCard && (
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Update Product</h4>
                <form
                  onSubmit={onClickUpdateProduct}
                  encType="multipart/form-data"
                >
                  <div className="mb-3">
                    {/* Name */}
                    <label htmlFor="nameInput" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
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
                      name="description"
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
                      name="categoryId"
                      value={productData.categoryId}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                      {userCategory.map((item) => (
                        <option key={item.categoryname} value={item.id}>
                          {item.categoryname}
                        </option>
                      ))}
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
                      name="price"
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
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                  <button type="submit" className="btn btn-primary me-2">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setUpdateProductCard(false);
                      setProductData({
                        name: "",
                        description: "",
                        categoryId: "",
                        price: "",
                        productImages: null,
                      });
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
                <form onSubmit={AddProduct} encType="multipart/form-data">
                  <div className="mb-3">
                    {/* Name */}
                    <label htmlFor="nameInput" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
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
                      name="description"
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
                      name="categoryId"
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                      <option value="" defaultChecked>
                        --select--
                      </option>
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
                      name="price"
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
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                  <button type="submit" className="btn btn-primary me-2">
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setAddProductCard(false);
                    }}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          )}

          {notFound ? (
            <div>
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
                        <th scope="col">Description</th>
                        <th scope="col">CategoryId</th>
                        <th scope="col">Price</th>
                        <th scope="col" style={{ width: "100%" }}>
                          Images
                        </th>
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
                      {userProducts.map((item, idx) => {
                        const {
                          id,
                          name,
                          description,
                          categoryId,
                          price,
                          images,
                        } = item;
                        const img = JSON.parse(images);
                        return (
                          <tr key={idx}>
                            <th scope="row">{id}</th>
                            <td style={{ fontSize: "12px" }}>{name}</td>
                            <td style={{ fontSize: "12px" }}>{description}</td>
                            <td>{categoryId}</td>
                            <td>{price}</td>
                            {/* <td>{images}</td> */}
                            {/* <td>
                          <div className="img-container">
                            {img.map((item) => {
                              return (
                                <div className="custom-img" key={item}>
                                  <img
                                    src={imageBaseurl + item}
                                    className="card-img-top"
                                    alt="Product Image"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </td> */}
                            <td>
                              <div className="img-container">
                                {img.map((item) => {
                                  return (
                                    <div
                                      className="custom-img-container"
                                      key={item}
                                    >
                                      <div className="custom-img">
                                        <button
                                          className="cancel-button"
                                          onClick={() => handleCancel(item, id)}
                                        >
                                          &#x2716;{" "}
                                          {/* Unicode character for 'multiplication x' symbol */}
                                        </button>
                                        <img
                                          src={imageBaseurl + item}
                                          className="card-img-top"
                                          alt="Product Image"
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </td>
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
              {/* ScrolToTop */}
              <button
                type="button"
                className="btn btn-dark top-arrow-button"
                onClick={scrollToTop}
              >
                Go to top
              </button>
            </div>
          ) : (
            <h1>Not Found</h1>
          )}
        </div>
      ) : (
        <h1>Authentication Failed</h1>
      )}
    </div>
  );
};

export default ProductPage;
