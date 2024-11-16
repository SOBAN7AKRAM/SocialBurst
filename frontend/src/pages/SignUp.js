import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Heading, Input, Button, Text } from "@chakra-ui/react";
import Login1 from "../Pictures/Login1.jpg";
import { Link } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const comingfrom = location.state?.from?.pathname || '/WorkSpace';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword && email) {
      // Dummy success check for demo purposes
      navigate(comingfrom, { replace: true });
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert status='error'>
          <AlertIcon />
          <AlertDescription>Ensure your passwords match and try again.</AlertDescription>
        </Alert>
      )}
      <Box display="flex" width={"100%"} height="100vh">
        {/* SignUp Panel (Left side) */}
        <Box 
          width={{ base: '100%', md: '50%', xl: '33%' }} 
          overflowY="auto" // Enable scrolling only on this side
          paddingLeft={"4%"} 
          paddingRight="4%" 
          paddingTop="6vh"
        >
          <Link to={"/"}> 
            <img style={{ width: "35%" }} src="https://static.buffer.com/login/public/img/buffer-logo.svg" alt="" />
          </Link>
          <Heading mt="6vh" color={"rgba(71,71,71,255)"}>Sign Up</Heading>
          <Heading color={"rgba(71,71,71,255)"} mt="5vh" fontSize="15px">Email Address</Heading>
          <Input mt="2vh" type={"email"} height="7vh"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <Heading color={"rgba(71,71,71,255)"} mt="5vh" fontSize="15px">Password</Heading>
          <Input mt="2vh" height="7vh"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <Heading color={"rgba(71,71,71,255)"} mt="5vh" fontSize="15px">Confirm Password</Heading>
          <Input mt="2vh" height="7vh"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button onClick={handleSubmit} mt="5vh" backgroundColor={"rgb(44,75,255)"} color="white" width={"100%"} height="7vh">Sign Up</Button>
          <Box display="flex" justifyContent={"space-between"} alignItems="center">
            <Heading color={"grey"} mt="5vh" fontSize="15px">Already have an account?</Heading>
            <Link to="/login">
              <Heading color={"grey"} mt="5vh" fontSize="15px">Log In</Heading>
            </Link>
          </Box>
          <Text mt="7vh" fontSize="14px" textAlign={"center"}>
            We no longer support social sign-on. Please create your account with an email address.
          </Text>
          <Box display="flex" justifyContent={"center"} alignItems="center" paddingBottom={"4"}>
            <Heading color={"grey"} mt="6vh" fontSize="13px">Terms of Service&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Privacy Policy&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Security</Heading>
          </Box>
        </Box>

        {/* Static Image Panel (Right side) */}
        <Box width={{ base: '0%', md: '50%', xl: '67%' }} height="100vh" position="relative">
          <img style={{ width: "100%", height: "100%", objectFit: "cover" }} border="1px solid black" src={Login1} alt="" />
        </Box>
      </Box> 
    </>
  );
};

export default SignUp;
