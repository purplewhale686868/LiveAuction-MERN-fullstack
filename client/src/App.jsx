import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryListings from "./pages/CategoryListings";
import Listing from "./pages/Listing";

import Profile from "./pages/Profile";
import Success from "./pages/Success";

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateListingTest from "./pages/CreateListingTest";
import AllAuctions from "./pages/AllAuctions";
import WonListings from "./pages/WonListings";

const App = () => {
  // const user = useSelector((state) => state.user.currentUser);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <Login />}
        />

        <Route path="/register" element={<Register />} />

        <Route
          path="/createListingTest"
          element={isAuth ? <CreateListingTest /> : <Navigate to="/login" />}
        />

        <Route path="/listings/:category" element={<CategoryListings />} />

        <Route
          path="/profile/:userId"
          element={isAuth ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="/listing/:id" element={<Listing />} />

        <Route path="/listings/:category" element={<CategoryListings />} />

        <Route path="/allAuctions" element={<AllAuctions />} />

        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/wonListings/:userId" element={<WonListings />} />

        <Route exact path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
