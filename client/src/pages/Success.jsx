import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  font-size: 24px;
  font-weight: 500;
  padding: 20px;
  margin-top: 20px;
  background-color: black;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
    border: 2px solid black;
  }
`;

const Text = styled.p`
  text-align: center;
`;

const Success = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Text>
        Congratulations! Your order has been created successfully and will be
        shipped soon.
      </Text>

      <Button onClick={() => navigate("/")}>Go to Homepage</Button>
    </Container>
  );
};

export default Success;
