import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./SupportPage.css";

const SupportPage = () => {
  const token = localStorage.getItem("auth");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    document.title = "Support Page";
  }, [token, navigate]);

  const [emailData, setEmailData] = useState({
    email: "",
    title: "",
    uploadedFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setEmailData({
      ...emailData,
      uploadedFile: e.target.files[0],
    });
  };
  const onClickSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData();
      data.append("email", emailData.email);
      data.append("title", emailData.title);
      data.append("uploadedFile", emailData.uploadedFile);
      console.log(emailData);
      const response = await axios.post(API + "/sendEmail", data, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status == 200) {
        toast.success(response.data.status);
      }
    } catch (error) {}
  };

  return (
    <div className="m-3">
      <h3 className="mb-3 text-center">Please contact us....!</h3>
      <form onSubmit={onClickSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={emailData.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Title"
            value={emailData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Upload File</label>
          <input
            type="file"
            className="form-control-file"
            name="uploadedFile"
            onChange={handleFileChange}
          />
          <small id="fileHelp" className="form-text text-muted">
            Please upload a file.
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default SupportPage;
