import axios from "axios";

const apiUrl = "http://localhost:5000";

export const addNewRegUser = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/registered/newRegUser`, user);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getRegUsers = async () => {
  try {
    const res = await axios.get(`${apiUrl}/registered/getRegUsers`, {
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

export const deleteRegUser = async (username) => {
  try {
    const res = await axios.delete(`${apiUrl}/registered/deleteRegUser`, {
      data: { username },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
