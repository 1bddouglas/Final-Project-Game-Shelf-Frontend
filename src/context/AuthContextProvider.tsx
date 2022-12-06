import { ReactNode, useContext, useEffect, useId, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import { log } from "console";
import { createAccount, findAccount } from "../services/accountAPIService";
import Account from "../models/Account";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  console.log(account);
  console.log(user);

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
      if (newUser) {
        findAccount(newUser.uid).then((res) => {
          if (res) {
            setAccount(res);
          } else {
            createAccount({
              uid: newUser.uid,
              wishlist: [],
              myShelf: [],
              myFriends: [],
            }).then((res) => setAccount(res));
          }
        });
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
