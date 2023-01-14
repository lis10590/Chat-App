import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const addNewUser = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/users/newUser`, user);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getUsers = async () => {
  try {
    const res = await axios.get(`${apiUrl}/users/getUsers`, {
      // headers: {
      //   Authorization: "Bearer".concat(" ", sessionStorage.getItem("token")),
      // },
    });
    console.log(res.data);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (username) => {
  try {
    const res = await axios.delete(`${apiUrl}/users/deleteUser`, {
      data: { username },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addToBlocked = async (user) => {
  try {
    const res = await axios.put(`${apiUrl}/users/addBlocked`, user);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const removeFromBlocked = async (user) => {
  try {
    const res = await axios.put(`${apiUrl}/users/removeBlocked`, user);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addContact = async (user) => {
  try {
    const res = await axios.put(`${apiUrl}/users/addContact`, user);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addGroup = async (user) => {
  try {
    const res = await axios.put(`${apiUrl}/users/addGroup`, user);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
