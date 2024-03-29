import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const addNewGroup = async (group) => {
  try {
    const res = await axios.post(`${apiUrl}/groups/newGroup`, group);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addNewMemberToGroup = async (obj) => {
  try {
    const res = await axios.put(`${apiUrl}/groups/addMember`, obj);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getGroups = async () => {
  try {
    const res = await axios.get(`${apiUrl}/groups/getGroups`, {
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

export const getMembersOfGroup = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}/groups/getMembers`, {
      data: { id },
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

export const deleteGroup = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}/groups/deleteGroup`, {
      data: { id },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
