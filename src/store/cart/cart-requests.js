import axios from "../../api/axios";
import { getToken } from "../../utils/auth";

export const requestCartAll = (token) => {
  const decodedToken = atob(token); //giải mã base64
  if (!decodedToken) return;
  return axios.get("/api/cart", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${decodedToken}`,
    },
  });
};

export const requestCartAddnew = (data) => {
  const decodedToken = atob(data.token); //giải mã base64
  if (!decodedToken) return;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${decodedToken}`,
    },
  };

  return axios.post("/api/cartItem", data, config);
};

export const requestCartDelete = (id) => {
  const decodedToken = atob(getToken()); //giải mã base64
  if (!decodedToken) return;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${decodedToken}`,
    },
  };

  return axios.delete(`/api/cartItem/${id}`, config);
};