import React, { useState } from "react";
import "./HomePage.css";
import axios from "axios";
import BASEURL from "../../axios";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "Male",
    hobbies: "",
    profileImage: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0],
    });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    const updateHobbies = [...formData.hobbies];
    if (checked) {
      updateHobbies.push(value);
    } else {
      const idx = updateHobbies.indexOf(value);
      if (idx !== -1) updateHobbies.splice(idx, 1);
    }

    setFormData({ ...formData, hobbies: updateHobbies });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("firstname", formData.firstname);
      data.append("lastname", formData.lastname);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("gender", formData.gender);
      data.append("hobbies", formData.hobbies);
      data.append("profileImage", formData.profileImage);

      const response = await axios.post(
        "http://localhost:4000/api/addUser",
        data
      );
      const code = response.status;
      console.log(response);
      const successMsg = response.data.message;
      if (code == 201) {
        console.log(successMsg);
        toast.success(successMsg);
      }
    } catch (err) {
      //   const code = err.response.status;
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        gender: "Male",
        hobbies: "",
        profileImage: null,
      });
      const errorMsg = err.response.data.error;
      if (code == 409 || 500 || 400) {
        console.log(errorMsg);
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          gender: "Male",
          hobbies: "",
          profileImage: null,
        });
        toast.error(errorMsg);
      }
    }
  };

  return (
    <>
      <div className="wrapper">
        <h1>Registration</h1>
        <form
          className="changethis"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group row">
            <label htmlFor="firstname" className="col-sm-2 col-form-label">
              First Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={formData.firstname}
                name="firstname"
                onChange={handleChanges}
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastname" className="col-sm-2 col-form-label">
              Last Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="lastname"
                onChange={handleChanges}
                placeholder="Last Name"
                value={formData.lastname}
              />
            </div>
          </div>
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
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Hobbies</label>
            <div className="col-sm-10">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="hobby1"
                  onClick={handleCheckbox}
                  value="Reading"
                />
                <label className="form-check-label" htmlFor="hobby1">
                  Reading
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="hobby2"
                  onClick={handleCheckbox}
                  value="Sports"
                />
                <label className="form-check-label" htmlFor="hobby2">
                  Sports
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="hobby3"
                  onClick={handleCheckbox}
                  value="Music"
                />
                <label className="form-check-label" htmlFor="hobby3">
                  Music
                </label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="gender" className="col-sm-2 col-form-label">
              Gender
            </label>
            <div className="col-sm-10 ">
              <select
                className="form-control"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChanges}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="profileImage" className="col-sm-2 col-form-label">
              Profile Picture
            </label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control-file"
                onChange={handleFileChange}
                id="profileImage"
                name="profileImage"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </div>
          </div>
        </form>
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <p class="text-center">
                Already have an account?{" "}
                <a href="/login" class="btn btn-primary">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
