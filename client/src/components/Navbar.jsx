import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import {
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const Container = styled.div``;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ flex: 1 })}
`;
const Logo = styled.h1`
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }

  ${mobile({ fontSize: "30px", paddingLeft: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1 })}
`;
const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginRight: "10px" })}
`;
const MenuContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({ padding: "10px 5px" })}
`;
const MenuText = styled.div`
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 2px;

  ${mobile({ fontSize: "14px", letterSpacing: "1px" })};
`;
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={() => navigate("/")}>LiveAuction</Logo>
        </Center>

        {user === null ? (
          <Right>
            <MenuItems onClick={() => navigate("/register")}>
              REGISTER
            </MenuItems>
            <MenuItems onClick={() => navigate("/login")}>SIGN IN</MenuItems>
          </Right>
        ) : (
          <Right>
            <FormControl variant="standard" value={user.username}>
              <Select
                value={user.username}
                sx={{
                  backgroundColor: "white",
                  fontFamily: "Urbanist",
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: "white",
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={user.username}>
                  <Typography
                    sx={{ fontFamily: "Urbanist" }}
                    onClick={() => navigate(`/profile/${user._id}`)}
                  >
                    {user.username}
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{ fontFamily: "Urbanist" }}
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/");
                  }}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </Right>
        )}
      </Wrapper>
      <Hr />
      <MenuContainer>
        <MenuText onClick={() => navigate("/listings/ART")}>ART</MenuText>

        <MenuText onClick={() => navigate("/listings/JEWELRY")}>
          JEWELRY
        </MenuText>

        <MenuText onClick={() => navigate("/listings/FURNITURE")}>
          FURNITURE
        </MenuText>

        <MenuText onClick={() => navigate("/createListingTest")}>
          Create Your Auction
        </MenuText>
      </MenuContainer>
      <Hr />
    </Container>
  );
};

export default Navbar;
