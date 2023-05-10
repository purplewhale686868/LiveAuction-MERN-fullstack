import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useNavigate } from "react-router-dom";
import { requestMethod } from "../requestMethods";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: scale-down;

  z-index: 2;
  ${mobile({ height: "40vh" })}
`;
const Icon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  z-index: 3;
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid #eee;

  &:hover {
    background-color: white;
    transform: scale(1.1);
  }
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
const Notice = styled.div`
  background-color: green;
  text-align: center;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
const NoticeEnd = styled.div`
  background-color: #ff1a1a;
  text-align: center;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
const NoticeText = styled.p`
  color: white;
  font-weight: 600;
  padding: 5px;
`;
const Title = styled.h1`
  font-weight: 600;
`;
const Desc = styled.p`
  margin: 20px 0;
`;

const Warning = styled.p`
  margin: 20px 0;
  font-weight: 500;
  &:hover {
    cursor: pointer;
    color: #0073e6;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Bid = styled.span`
  display: flex;
  align-items: center;
  margin: 5px 0;
  font-size: 14px;
`;
const Price = styled.span`
  font-weight: 300;
  font-size: 30px;
  display: flex;
  align-items: center;
  margin: 5px;
`;

const InputContainer = styled.div`
  width: 70%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  margin-bottom: 10px;
  ${mobile({ width: "100%" })}
`;
const Input = styled.input`
  border: none;
  flex: 2;
  padding-left: 10px;
`;
const Button = styled.button`
  flex: 2;
  border: none;
  background-color: black;
  color: white;
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
    border: 2px solid black;
  }
`;

const ButtonClose = styled.button`
  width: 35%;
  flex: 2;
  border: none;
  background-color: #ff6666;
  color: white;
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: #ff6666;
    border: 2px solid #ff6666;
  }

  ${mobile({ width: "100%" })}
`;

const Listing = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const navigate = useNavigate();

  const [bid, setBid] = useState("");

  const location = useLocation();
  const listingId = location.pathname.split("/")[2];
  const [listing, setListing] = useState();

  useEffect(() => {
    const getListing = async () => {
      const response = await requestMethod.get(`/listings/find/${listingId}`);

      const data = response.data;
      setListing(data);
    };
    getListing();
  }, [listingId]);

  const handleBid = async () => {
    // const response = await fetch(
    //   `https://live-auction-app-server.onrender.com/listings/${listingId}/bidding`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ userId: user._id, bid: bid }),
    //   }
    // );

    const response = await requestMethod.patch(
      `/listings/${listingId}/bidding`,
      {
        userId: user._id,
        bid: bid,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    setListing(data);
    setBid("");
  };

  const handleClose = async () => {
    // const response = await fetch(
    //   `https://live-auction-app-server.onrender.com/listings/${listing?._id}/closeListing`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const data = await response.json();

    const response = await requestMethod.patch(
      `/listings/${listingId}/closeListing`,
      {
        listingId: listingId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    setListing(data);
  };

  const handleWatchlist = async () => {
    // const response = await fetch(
    //   `https://live-auction-app-server.onrender.com/listings/${listing?._id}/watchlist`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ userId: user._id }),
    //   }
    // );
    // const data = await response.json();

    const response = await requestMethod.patch(
      `/listings/${listing?._id}/watchlist`,
      {
        userId: user._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    setListing(data);
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={listing?.imagePath} />
          <Icon onClick={handleWatchlist}>
            {listing?.watchlistOwner.includes(user?._id) ? (
              <FavoriteIcon sx={{ color: "#ff4d4d" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </Icon>
        </ImgContainer>

        <InfoContainer>
          {/* button LIVE or ENDED here */}
          <TitleContainer>
            {listing?.isActive ? (
              <Notice>
                <NoticeText>LIVE</NoticeText>
              </Notice>
            ) : (
              <NoticeEnd>
                <NoticeText>ENDED</NoticeText>
              </NoticeEnd>
            )}

            <Title>{listing?.title}</Title>
          </TitleContainer>

          <Desc>{listing?.description}</Desc>

          <PriceContainer>
            <Bid>
              Current bid:<Price>$ {listing?.bid}</Price>
            </Bid>
          </PriceContainer>
          {user ? (
            listing?.isActive ? (
              <InputContainer>
                <Input
                  name="bid"
                  value={bid}
                  placeholder="Bid higher than current bid"
                  onChange={(e) => setBid(e.target.value)}
                />
                <Button onClick={handleBid}>Place Bid</Button>
              </InputContainer>
            ) : (
              <InputContainer>
                <Input
                  disabled
                  name="bid"
                  value={bid}
                  placeholder="Bid higher than current bid"
                  onChange={(e) => setBid(e.target.value)}
                />
                <Button disabled>Place Bid</Button>
              </InputContainer>
            )
          ) : (
            <Warning onClick={() => navigate("/login")}>SIGN IN TO BID</Warning>
          )}

          {listing?.ownerId === user?._id && token && (
            <ButtonClose onClick={handleClose}>Close Auction</ButtonClose>
          )}
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Listing;
