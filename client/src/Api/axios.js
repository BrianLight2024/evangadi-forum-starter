import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://evangadi-forum-starter.onrender.com/api/",
});

export { axiosInstance };
