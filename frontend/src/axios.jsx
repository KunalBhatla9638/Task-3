import axios from "axios";

const API = "http://localhost:4000/api";

const BASEURL = axios.create({
  baseURL: API,
});

export default BASEURL;
