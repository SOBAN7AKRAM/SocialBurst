import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Input, Button, Text, Alert, AlertIcon, AlertDescription, Link } from "@chakra-ui/react";
import Login1 from "../Pictures/Login1.jpg";  // Image for the right side
import { Link as RouterLink } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('signup'); // 'signup' or 'otp'
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Handle sending OTP
  const handleSendOtp = async () => {
    if (email && password === confirmPassword) {
      try {
        const response = await fetch('/api/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setStep('otp');
          setOtpSent(true); // OTP has been sent
        } else {
          const errorData = await response.json();
          setAlertMessage(errorData.message || 'Failed to send OTP.');
          setShowAlert(true);
        }
      } catch (error) {
        setAlertMessage('An error occurred while sending OTP.');
        setShowAlert(true);
      }
    } else {
      setAlertMessage('Ensure your passwords match and try again.');
      setShowAlert(true);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        // After OTP verification, send email and password to sign up the user
        const signUpResponse = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }), // Send credentials to backend
        });

        if (signUpResponse.ok) {
          navigate('/WorkSpace', { replace: true }); // Navigate to workspace on successful sign-up
        } else {
          const errorData = await signUpResponse.json();
          setAlertMessage(errorData.message || 'Sign-up failed.');
          setShowAlert(true);
        }
      } else {
        const errorData = await response.json();
        setAlertMessage(errorData.message || 'Invalid OTP.');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('An error occurred while verifying OTP.');
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert status='error' mb={4}>
          <AlertIcon />
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}
      <Box display="flex" width="100%" height="100vh">
        {/* SignUp Panel (Left side) with Scrollbar */}
        <Box
          width={{ base: '100%', md: '50%', xl: '33%' }}
          overflowY="auto" // Adds scrolling
          paddingLeft="4%"
          paddingRight="4%"
          paddingTop="6vh"
          style={{ maxHeight: '100vh' }} // Ensure it stays within viewport height
        >
          <Link to={"/"}>
            <img style={{ width: "35%" }} src="https://static.buffer.com/login/public/img/buffer-logo.svg" alt="Buffer Logo" />
          </Link>

          {/* Sign Up Form */}
          {step === 'signup' ? (
            <>
              <Heading mt="6vh" color="rgba(71,71,71,255)">Sign Up</Heading>
              <Heading color="rgba(71,71,71,255)" mt="5vh" fontSize="15px">Email Address</Heading>
              <Input
                mt="2vh"
                type="email"
                height="7vh"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Heading color="rgba(71,71,71,255)" mt="5vh" fontSize="15px">Password</Heading>
              <Input
                mt="2vh"
                height="7vh"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Heading color="rgba(71,71,71,255)" mt="5vh" fontSize="15px">Confirm Password</Heading>
              <Input
                mt="2vh"
                height="7vh"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                onClick={handleSendOtp}
                mt="5vh"
                backgroundColor="rgb(44,75,255)"
                color="white"
                width="100%"
                height="7vh"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              {/* OTP Verification Form */}
              <Heading mt="6vh" color="rgba(71,71,71,255)">Verify OTP</Heading>
              <Heading color="rgba(71,71,71,255)" mt="5vh" fontSize="15px">
                Enter the OTP sent to your email
              </Heading>
              <Input
                mt="2vh"
                type="text"
                height="7vh"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                onClick={handleVerifyOtp}
                mt="5vh"
                backgroundColor="rgb(44,75,255)"
                color="white"
                width="100%"
                height="7vh"
              >
                Verify OTP
              </Button>
              {otpSent && (
                <Text mt="2vh" fontSize="14px" color="gray.500">
                  Didn't receive an OTP?{" "}
                  <Button variant="link" onClick={handleSendOtp}>Resend OTP</Button>
                </Text>
              )}
            </>
          )}

          {/* Footer for already having an account */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Heading color="grey" mt="5vh" fontSize="15px">Already have an account?</Heading>
            <RouterLink to="/login">
              <Heading color="grey" mt="5vh" fontSize="15px">Log In</Heading>
            </RouterLink>
          </Box>
        </Box>

        {/* Static Image Panel (Right side) */}
        <Box
          width={{ base: '0%', md: '50%', xl: '67%' }}
          height="100vh"
          position="relative"
        >
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            border="1px solid black"
            src={Login1}
            alt="Login Background"
          />
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
