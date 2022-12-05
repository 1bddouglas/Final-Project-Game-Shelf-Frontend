import axios from "axios";
import Account from "../models/Account";

const baseUrl: string = process.env.REACT_APP_API_URL || "";

export const getAllAccounts = (): Promise<Account[]> => {
  return axios
    .get(`${baseUrl}/accounts`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const findAccount = (uid: string): Promise<Account> => {
  return axios
    .get(`${baseUrl}/${uid}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
