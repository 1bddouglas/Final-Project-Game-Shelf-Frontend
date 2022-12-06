import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { getTopRatedGames } from "./services/boardGameAPIService";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Main from "./components/Main";
import MyShelf from "./components/MyShelf";
import Profile from "./components/Profile";
import SearchResults from "./components/SearchResults";
import SingleGame from "./components/SingleGame";
import Wishlist from "./components/Wishlist";
import Header from "./components/Header";
import SingleGameResult from "./components/SingleGameResult";
import { getAllAccounts } from "./services/accountAPIService";

function App() {
  getAllAccounts().then((res) => {
    console.log(res);
  });
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<Main />} />
          <Route path="*" element={<Navigate to={"/home"} />}></Route>
          <Route path="/searchResults" element={<SearchResults />} />
          <Route path="/singleGame/:id" element={<SingleGame />} />
          <Route path="/profile/:uid" element={<Profile />} />
          <Route path="/wishlist/:uid" element={<Wishlist />} />
          <Route path="/myShelf/:uid" element={<MyShelf />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
