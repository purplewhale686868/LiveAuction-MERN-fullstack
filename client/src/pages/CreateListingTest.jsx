import React from "react";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { Box, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useState } from "react";
import { requestMethod } from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  height: 80vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 75%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImageBox = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid rgb(118, 118, 118);
`;
const InputBox = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid rgb(118, 118, 118);
`;
const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const Button = styled.button`
  width: 25%;
  font-size: 20px;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  ${mobile({ width: "50%" })}
`;

const CreateListingTest = () => {
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [bid, setBid] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("userId", _id);
    // formData.append("title", title);
    // formData.append("category", category);
    // formData.append("bid", bid);
    // formData.append("description", description);

    if (image) {
      formData.append("picture", image);
    }

    const response = await requestMethod.post("/uploadPic", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    const { url } = response.data;

    const savedListingResponse = await requestMethod.post(
      "/listings/newListing",
      {
        userId: _id,
        title: title,
        category: category,
        bid: bid,
        description: description,
        imagePath: url,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      }
    );
    const savedListing = savedListingResponse.data;

    setImage(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setBid("");
    navigate(`/listing/${savedListing._id}`);
  };

  return (
    <div>
      <Navbar />

      <Container>
        <Wrapper>
          <Title>NEW LISTING</Title>

          <Form>
            <Input
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Title"
            />

            <Input
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <InputBox>
              <Select
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                value={category}
              >
                <Option defaultValue disabled>
                  Category
                </Option>

                <Option value="ART">ART</Option>
                <Option value="JEWELRY">JEWELRY</Option>
                <Option value="FURNITURE">FURNITURE</Option>
              </Select>
            </InputBox>

            <ImageBox>
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border="1px dashed black"
                    p="8px"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <Typography
                        sx={{ fontFamily: "Urbanist", fontSize: "14px" }}
                      >
                        Add Image Here (Only .jpg, .jpeg, .png file)
                      </Typography>
                    ) : (
                      <FlexBetween>
                        <Typography
                          sx={{ fontFamily: "Urbanist", fontSize: "12px" }}
                        >
                          {image.name}
                        </Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </ImageBox>

            <Input
              name="bid"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              placeholder="Starting Bid"
            />

            <Button onClick={handleClick}>CREATE</Button>
          </Form>
        </Wrapper>
      </Container>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default CreateListingTest;
