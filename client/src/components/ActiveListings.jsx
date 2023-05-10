// category listings
import styled from "styled-components";

import Listing from "./Listing";
import { useEffect } from "react";
import { useState } from "react";
import { requestMethod } from "../requestMethods";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ActiveListings = ({ category }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getAllListings = async () => {
      // const response = await fetch(
      //   `https://live-auction-app-server.onrender.com/listings/listings/${category}`,
      //   {
      //     method: "GET",
      //   }
      // );
      // const data = await response.json();

      const response = await requestMethod.get(
        `/listings/listings/${category}`
      );

      const data = response.data;
      setListings(data);
    };
    getAllListings();
  }, [category]);
  return (
    <Container>
      {listings?.map((listing) => (
        <Listing listing={listing} key={listing._id} />
      ))}
    </Container>
  );
};

export default ActiveListings;
