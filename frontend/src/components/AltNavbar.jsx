import React, { useState } from "react";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { BsCaretDownFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { HamburgerIcon } from "@chakra-ui/icons";
import InnerModal from "./InnerModel";
import Logo from './Logo.png'

const AltNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Flex
        position="fixed"
        top="0"
        left="0"
        width="100%"
        zIndex="1000"
        
        bg="white"
        boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      >
        <HamburgerIcon
          fontSize={30}
          display={["block", "block", "block", "block", "none"]}
          onClick={() => {
            setShowModal(true);
          }}
        />
        <Flex
          alignItems="center"
          display={["none", "none", "none", "none", "flex"]}
          width={["0%", "0%", "0%", "0%", "50%"]}
        >
          <NavLink to="/">
            <Flex pr="10px" pl="10px" gap="1">
            <Text fontSize="lg" fontWeight="bold">
                Social Burst
            </Text>
              
            </Flex>
          </NavLink>
          <Flex>
            <NavLink to="/Workspace">
              <Box
                p="1.2rem"
                pl="28px"
                pr="28px"
                color="rgb(99, 99, 99)"
                _hover={{ backgroundColor: "#F5F5F5", color: "#2C4BFF" }}
              >
                <Text fontSize="md" fontWeight="bold">
                  Publishing
                </Text>
              </Box>
            </NavLink>
            <NavLink to="/analytics">
              <Box
                p="1.2rem"
                pl="28px"
                pr="28px"
                color="rgb(99, 99, 99)"
                _hover={{ backgroundColor: "#F5F5F5", color: "#2C4BFF" }}
              >
                <Text fontSize="md" fontWeight="bold">
                  Analytics
                </Text>
              </Box>
            </NavLink>
            <NavLink to="/engagement">
              <Box
                p="1.2rem"
                pl="28px"
                pr="28px"
                color="rgb(99, 99, 99)"
                _hover={{ backgroundColor: "#F5F5F5", color: "#2C4BFF" }}
              >
                <Text fontSize="md" fontWeight="bold">
                  Engagement
                </Text>
              </Box>
            </NavLink>
            <NavLink to="#">
              <Box
                p="1.2rem"
                pl="28px"
                pr="28px"
                color="rgb(99, 99, 99)"
                _hover={{ backgroundColor: "#F5F5F5", color: "#2C4BFF" }}
              >
                <Text fontSize="md" fontWeight="bold">
                  Start Page
                </Text>
              </Box>
            </NavLink>
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          display={["none", "none", "flex", "flex", "flex"]}
          width={["50%", "50%", "80%", "80%", "50%"]}
        >
          <NavLink to="#">
            <Flex
              alignItems="center"
              gap="4px"
              color="#2C4BFF"
              p="1.2rem"
              pl="28px"
              pr="28px"
            >
              <FaUserFriends />
              <Text fontWeight="medium" fontSize="md">
                Invite Your Team
              </Text>
            </Flex>
          </NavLink>
          <NavLink to="#">
            <Flex
              alignItems="center"
              p="1.2rem"
              pl="28px"
              pr="28px"
              color="rgb(99, 99, 99)"
              _hover={{ backgroundColor: "#F5F5F5", color: "#433D3D" }}
              gap="4px"
            >
              <Text fontSize="14px" fontWeight="medium">
                Apps
              </Text>
              <BsCaretDownFill fontSize="12px" />
            </Flex>
          </NavLink>
          <NavLink to="#">
            <Flex
              alignItems="center"
              p="1.2rem"
              pl="28px"
              pr="28px"
              color="rgb(99, 99, 99)"
              _hover={{ backgroundColor: "#F5F5F5", color: "#433D3D" }}
              gap="4px"
            >
              <Text fontSize="14px" fontWeight="medium">
                Help
              </Text>
              <BsCaretDownFill fontSize="12px" />
            </Flex>
          </NavLink>
          <NavLink to="#">
            <Flex
              alignItems="center"
              p="1.2rem"
              pl="28px"
              pr="28px"
              gap="8px"
              _hover={{ backgroundColor: "#F5F5F5" }}
            >
              <Text color="#D5C4BA">SobanAkram@gmail.com</Text>
              <FaUserCircle icon="fa-duotone" size="26px" color="#121E66" />
            </Flex>
          </NavLink>
        </Flex>
        {showModal ? (
          <InnerModal show={showModal} setModal={setShowModal} />
        ) : (
          ""
        )}
      </Flex>
    </>
  );
};

export default AltNavbar;
