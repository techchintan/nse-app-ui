import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:9000/api/v1",
  withCredentials: true,
});

export const getAllUserAddedSymbols = (params) =>
  axios.get("/getSymbol", { headers: { Authorization: params } });
