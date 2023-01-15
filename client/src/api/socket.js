import io from "socket.io-client";
const apiUrl = process.env.REACT_APP_API_URL;

export const socket = io.connect(apiUrl);
