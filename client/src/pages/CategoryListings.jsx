import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ActiveListings from "../components/ActiveListings";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;

  justify-content: flex-end;
`;
const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const CategoryListings = () => {
  const location = useLocation();

  const category = location.pathname.split("/")[2];

  return (
    <Container>
      <Navbar />
      <Title>{category}</Title>

      <FilterContainer>
        <Filter>
          <FilterText>Sort by:</FilterText>

          <Select>
            <Option value="newest">Newest</Option>
            <Option value="lowest">Lowest bid</Option>
            <Option value="highest">Highest bid</Option>
          </Select>
        </Filter>
      </FilterContainer>

      <ActiveListings category={category} />

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default CategoryListings;
