import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./CategoryPage.css";

const CategoryPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [updateCard, setupdateCard] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [id, setId] = useState(-1);

  const token = localStorage.getItem("auth");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(API + "/list", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        console.log(response);
        setCategory(response.data.showCategoryByUser);
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 400 || 404 || 500) {
        toast.error(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const updateCategory = (id) => {
    setId(id);
    const idx = category.findIndex((item) => item.id == id);
    setupdateCard(true);
    setCategoryName(category[idx].categoryname);
  };

  const changeCategoryName = async () => {
    try {
      const response = await axios.patch(
        API + `/updateCategory/${id}`,
        {
          updateCategoryName: categoryName,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setupdateCard(false);
        setCategoryName("");
        toast.success(response.data.msg);
        fetchCategory();
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 400 || 404 || 500) {
        toast.error(error.response.data.error);
      }
    }
  };

  const addCategory = () => {
    setCategoryName("");
    setAddCard(true);
  };

  const addCategoryName = async () => {
    try {
      const response = await axios.post(
        API + "/addCategory",
        {
          categoryName,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        setAddCard(false);
        toast.success(response.data.msg);
        fetchCategory();
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 400 || 404 || 500 || 409) {
        toast.error(error.response.data.error);
      }
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(API + `/deleteCategory/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        fetchCategory();
      }
    } catch (error) {
      const errorCode = error.response.status;
      if (errorCode == 400 || 404 || 500 || 409) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div>
      {token && (
        <>
          {/* Update Card */}
          {updateCard && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Rename Category</h5>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Category"
                    aria-label="Enter Category"
                    aria-describedby="basic-addon2"
                    name="updatedCategory"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <button
                    className="btn btn-success "
                    type="button"
                    onClickCapture={changeCategoryName}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => {
                      setupdateCard(false);
                    }}
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          )}

          {addCard && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Add Category</h5>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Category"
                    aria-label="Enter Category"
                    aria-describedby="basic-addon2"
                    name="updatedCategory"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <button
                    className="btn btn-success "
                    type="button"
                    onClickCapture={addCategoryName}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => {
                      setCategoryName("");
                      setAddCard(false);
                    }}
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="m-2">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" style={{ width: "100%" }}>
                    Your Category
                  </th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {category.map((cat) => {
                  const { id, categoryname } = cat;

                  return (
                    <tr key={id}>
                      <th scope="row">{id}</th>
                      <td>{categoryname}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => updateCategory(id)}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => deleteCategory(id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addCategory}
                    >
                      Add Category
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
