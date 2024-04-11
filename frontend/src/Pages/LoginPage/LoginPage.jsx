import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //   const token = localStorage.getItem("auth");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(API + "/login");
    try {
      const response = await axios.post(API + "/login", formData);
      const code = response.status;
      console.log(response);
      const successMsg = response.data.message;
      if (code == 200) {
        console.log(successMsg);
        toast.success(successMsg);
        localStorage.setItem("auth", response.data.authToken);
        navigate("/home");
      }
    } catch (err) {
      const code = err.response.status;
      setFormData({
        email: "",
        password: "",
      });
      const errorMsg = err.response.data.error;
      if (code == 409 || 500 || 400 || 404) {
        console.log(errorMsg);
        setFormData({
          email: "",
          password: "",
        });
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="wrapper">
      <h1>Login</h1>
      <form
        className="changethis"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-group row">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleChanges}
              placeholder="Email"
              value={formData.email}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChanges}
              placeholder="Password"
              value={formData.password}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mb-2">
          Login
        </button>
      </form>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <p className="text-center">
              Don't have an account?
              <a href="/" className="btn btn-primary">
                Register Now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
