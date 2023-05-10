import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/authSlice";
import { Formik } from "formik";
import * as yup from "yup";
import { requestMethod } from "../requestMethods";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
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
  width: 25%;
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

const Button = styled.button`
  width: 40%;
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
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Login = () => {
  // const [username, setUsername] = useState("");
  // const [password, setaPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (values, onSubmitProps) => {
    // const loggedInResponse = await fetch(
    //   "https://live-auction-app-server.onrender.com/auth/login",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(values),
    //   }
    // );

    const response = await requestMethod.post("/auth/login", values, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);

    const loggedIn = response.data;

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await handleClick(values, onSubmitProps);
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
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

              <Button
                type="submit"
                // onClick={handleClick}
              >
                LOG IN
              </Button>
              <Link>DON'T REMEMBER THE PASSWORD?</Link>
              <Link onClick={() => navigate("/register")}>
                CREATE A NEW ACCOUNT
              </Link>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Login;
