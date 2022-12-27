import axios from "axios";

const apiUrl = "http://localhost:5000";

export const registerUser = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/register`, user);
    sessionStorage.setItem("token", res.data.token);
    sessionStorage.setItem("user", res.data.user);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, user);
    sessionStorage.setItem("token", res.data.token);
    sessionStorage.setItem("user", res.data.user);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
