import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Listing from "../components/Listing";
import { addWonListings } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { requestMethod } from "../requestMethods";

const Container = styled.div``;
const Wrapper = styled.div``;
const Title = styled.h1`
  font-weight: 500;
  text-align: center;
`;
const Title1 = styled.h1`
  font-weight: 500;
  text-align: center;
  padding-top: 20px;
`;
const Top = styled.div`
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton1 = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  background-color: white;
  color: black;
  border: 2px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: 2px solid black;
  }
  ${mobile({ flex: 1, fontSize: "12px" })}
`;

const TopButton2 = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  background-color: black;
  color: white;
  border: 2px solid black;

  &:hover {
    background-color: white;
    color: black;
    border: 2px solid black;
  }
  ${mobile({ flex: 1, fontSize: "12px" })}
`;

const Bottom = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 20px 0;
`;

const Profile = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const [userAuctions, setUserAuctions] = useState([]);

  const [watchlist, setWatchlist] = useState([]);

  const [wonListings, setWonListings] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserAuctions = async () => {
      // const response = await fetch(
      //   `https://live-auction-app-server.onrender.com/users/${userId}/listings`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // const data = await response.json();
      const response = await requestMethod.get(`/users/${userId}/listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      });

      const data = response.data;
      setUserAuctions(data);
    };
    getUserAuctions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getUserWatchlist = async () => {
      // const response = await fetch(
      //   `https://live-auction-app-server.onrender.com/users/${userId}/watchlist`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // const data = await response.json();

      const response = await requestMethod.get(`/users/${userId}/watchlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      });

      const data = response.data;
      setWatchlist(data);
    };
    getUserWatchlist();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getWonListings = async () => {
      // const response = await fetch(
      //   `https://live-auction-app-server.onrender.com/users/${userId}/wonListings`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // const data = await response.json();

      const response = await requestMethod.get(`/users/${userId}/wonListings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      });

      const data = response.data;

      setWonListings(data);
      dispatch(addWonListings({ listings: data }));
    };
    getWonListings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title1>MY AUCTIONS</Title1>

        <Bottom>
          {userAuctions?.map((listing) => (
            <Listing listing={listing} key={listing._id} />
          ))}
        </Bottom>
      </Wrapper>

      <Hr />
      <Wrapper>
        <Title>MY WATCHLIST</Title>

        <Bottom>
          {watchlist?.map((listing) => (
            <Listing listing={listing} key={listing._id} />
          ))}
        </Bottom>
      </Wrapper>
      <Hr />
      <Wrapper>
        <Title>MY WON AUCTIONS</Title>

        <Bottom>
          {wonListings?.map((listing) => (
            <Listing listing={listing} key={listing._id} />
          ))}
        </Bottom>
        <Top>
          <TopButton1 onClick={() => navigate("/")}>
            VIEW MORE AUCTIONS
          </TopButton1>

          <TopButton2 onClick={() => navigate(`/wonListings/${user._id}`)}>
            CHECKOUT NOW
          </TopButton2>
        </Top>
      </Wrapper>
      <Hr />
      <Footer />
    </Container>
  );
};

export default Profile;
