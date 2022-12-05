import axios from "axios";

const baseUrl: string = process.env.REACT_APP_API_URL || "";

export const getAllAccounts = (): Promise<any> => {
  return axios
    .get(`${baseUrl}/accounts`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

