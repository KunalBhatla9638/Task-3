import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CategoryPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("auth");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <div>{token && <h1>Hello</h1>}</div>;
};

export default CategoryPage;
