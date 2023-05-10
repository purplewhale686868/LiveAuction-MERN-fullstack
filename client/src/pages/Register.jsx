import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { requestMethod } from "../requestMethods";

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  username: "",
  email: "",
  password: "",
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://image.invaluable.com/static/category/SG2BIX3JPJ.png") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
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
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  font-size: 20px;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
  ${mobile({ width: "50%" })}
`;

const Register = () => {
  const navigate = useNavigate();

  const handleClick = async (values, onSubmitProps) => {
    // e.preventDefault();

    // const savedUserResponse = await fetch(
    //   "https://live-auction-app-server.onrender.com/auth/register",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(values),
    //   }
    // );
    // const savedUser = await savedUserResponse.json();

    const response = await requestMethod.post("/auth/register", values, {
      headers: { "Content-Type": "application/json" },
    });

    if (response) {
      navigate("/login");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await handleClick(values, onSubmitProps);
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Input
                name="username"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                // onChange={(e) => setUsername(e.target.value)}
                error={Boolean(touched.username) && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                placeholder="Username"
              />

              <Input
                name="email"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <Input
                name="password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                // onChange={(e) => setaPassword(e.target.value)}
                placeholder="Password"
              />
              {/* <Input placeholder="Confirm Password" /> */}
              <Agreement>
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b>PRIVACY POLICY.</b>
              </Agreement>
              <Button
                type="submit"
                // onClick={handleClick}
              >
                CREATE
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Register;
