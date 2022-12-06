import { User } from "firebase/auth";
import { createContext } from "react";
import Account from "../models/Account";

export interface AuthContextModel {
  account: Account | null;
  user: User | null; // null when not logged in
}
const defaultValue: AuthContextModel = {
  account: null,

  user: null,
};
const AuthContext = createContext(defaultValue);
export default AuthContext;
