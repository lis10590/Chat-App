import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const registerUser = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/register`, user);
    sessionStorage.setItem("token", res.data.token);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, user);
    sessionStorage.setItem("token", res.data.token);
    sessionStorage.setItem("user", user.username);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};
