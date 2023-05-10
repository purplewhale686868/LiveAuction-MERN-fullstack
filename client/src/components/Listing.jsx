import React from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { requestMethod } from "../requestMethods";

const Wrapper = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Info = styled.div`
  opacity: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  min-width: 280px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 85%;
  width: 85%;
  object-fit: cover;
  z-index: 2;
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

  &:hover {
    background-color: white;
    transform: scale(1.1);
  }
`;

const InfoContainer = styled.div`
  padding: 0 10px;
`;
const Title = styled.p`
  font-weight: 600;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    color: #0073e6;
  }
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

const Price = styled.span`
  font-weight: 300;
  font-size: 30px;
  display: flex;
  align-items: center;
  margin: 5px;
`;

const Listing = ({ listing }) => {
  const [updatedListing, setUpdatedListing] = useState({ listing });
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    setUpdatedListing(listing);
  }, [listing]);

  const handleWatchlist = async () => {
    // const response = await fetch(
    //   `https://live-auction-app-server.onrender.com/listings/${updatedListing._id}/watchlist`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ userId: user._id }),
    //   }
    // );

    const response = await requestMethod.patch(
      `/listings/${updatedListing._id}/watchlist`,
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

    setUpdatedListing(data);
  };

  return (
    <Wrapper>
      <Container>
        <Image src={updatedListing.imagePath} />
        <Info>
          <Icon>
            <SearchOutlinedIcon
              onClick={() => navigate(`/listing/${updatedListing._id}`)}
            />
          </Icon>
          <Icon onClick={handleWatchlist}>
            {updatedListing.watchlistOwner?.includes(user?._id) ? (
              <FavoriteIcon sx={{ color: "#ff4d4d" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </Icon>
        </Info>
      </Container>
      <InfoContainer>
        <Price>$ {updatedListing.bid}</Price>

        <TitleContainer>
          {updatedListing.isActive ? (
            <Notice>
              <NoticeText>LIVE</NoticeText>
            </Notice>
          ) : (
            <NoticeEnd>
              <NoticeText>ENDED</NoticeText>
            </NoticeEnd>
          )}

          <Title onClick={() => navigate(`/listing/${updatedListing._id}`)}>
            {updatedListing.title}
          </Title>
        </TitleContainer>
      </InfoContainer>
    </Wrapper>
  );
};

export default Listing;
