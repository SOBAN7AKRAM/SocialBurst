import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Heading, Input, Button, Text } from "@chakra-ui/react";
import Login1 from "../Pictures/Login1.jpg";
import { Link } from "react-router-dom";
import Logo from '../components/Logo.png'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const comingfrom = location.state?.from?.pathname || '/WorkSpace';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'KhulJaBhai' && password) {
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
          <AlertDescription>Login with this Email id:</AlertDescription>
          <AlertTitle>&nbsp;&nbsp;&nbsp;KhulJaBhai</AlertTitle>
        </Alert>
      )}
      <Box display="flex" width={"100%"} height="100vh">
        {/* SignIn Panel (Left side) with Scroll */}
        <Box 
          width={{ base: '100%', md: '50%', xl: '33%' }} 
          overflowY="auto" // Enable scrolling only on this side
          paddingLeft={"4%"} 
          paddingRight="4%" 
          paddingTop="3vh"
        >
          <Link to={"/"}> 
            <img style={{ width: "40%" }} className='mx-auto' src={Logo} alt="" />
          </Link>
          <Heading mt="1vh" color={"rgba(71,71,71,255)"}>Log in</Heading>
          <Heading color={"rgba(71,71,71,255)"} mt="5vh" fontSize="15px">Email Address</Heading>
          <Input mt="2vh" type={"email"} height="7vh"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <Heading color={"rgba(71,71,71,255)"} mt="5vh" fontSize="15px">Password</Heading>
          <Input mt="2vh" height="7vh"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleSubmit} mt="5vh" backgroundColor={"rgb(44,75,255)"} color="white" width={"100%"} height="7vh">Log In</Button>
          <Box display="flex" justifyContent={"space-between"} alignItems="center">
            <Heading color={"grey"} mt="5vh" fontSize="15px">Create an account</Heading>
            <Heading color={"grey"} mt="5vh" fontSize="15px">Forgot your password?</Heading>
          </Box>
          <Text mt="4vh" fontSize="14px" textAlign={"center"}>
            We no longer support social sign-on. Please click here to set your password and access your account.
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

export default SignIn;
