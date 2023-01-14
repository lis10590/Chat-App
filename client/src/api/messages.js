import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getMessages = async () => {
  try {
    const res = await axios.get(`${apiUrl}/messages/getMessages`, {
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

export const getMessagesByUsername = async (username) => {
  try {
    const res = await axios.get(`${apiUrl}/messages/getMessagesByUsername`, {
      data: { username },
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

export const addMessage = async (obj) => {
  try {
    const res = await axios.put(`${apiUrl}/messages/addMessage`, obj);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
