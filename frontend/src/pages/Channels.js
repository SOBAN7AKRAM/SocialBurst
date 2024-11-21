import { Box, Button, Flex, Icon, Img, Text } from "@chakra-ui/react";
import { MdAccountCircle } from "react-icons/md";

import AltSideBar from "../components/AltSideBar";
import { MdCloudDone } from "react-icons/md";
import {React,useState} from "react";
import { Link } from "react-router-dom";
import AltNavbar from "../components/AltNavbar";
import { Channeldelete } from "../components/Channeldelete"

export const Channels = () => {
  // Mock data for channels
  const [data, setData] = useState([
    {
      id: 1,
      logo: "https://via.placeholder.com/40", // Replace with actual logos
      accountName: "John Doe",
      platformName: "Facebook",
      profilePic: "https://via.placeholder.com/40", // Replace with actual profile picture
      ids: "john.doe.fb",
    },
    {
      id: 2,
      logo: "https://via.placeholder.com/40",
      accountName: "Jane Smith",
      platformName: "Twitter",
      profilePic: "https://via.placeholder.com/40",
      ids: "jane.smith.tw",
    },
  ]);

  // Handle delete channel
  const handleDelete = (id) => {
    const updatedData = data.filter((channel) => channel.id !== id);
    setData(updatedData);
  };


  return (
    <Box>
      <AltNavbar />
      <Box>
        <Flex>
          {/* Sidebar */}
          <AltSideBar/>

          {/* Main Content */}
          <Box m="auto" w="100%" h="100vh" bg="#f5f5f5">
            <Flex
              m="auto"
              w={["90%", "90%", "60%", "50%"]}
              h="100%"
              justifyContent="center"
            >
              <Box w="100%">
                {/* Header */}
                <Flex
                  w="100%"
                  justifyContent="space-between"
                  flexDirection={["column", "column", "row"]}
                  alignItems="center"
                  p="10px"
                >
                  <Text fontSize="4xl" as="b">
                    Channels
                  </Text>
                  <Link to={"/channels/addchannel"}>
                    <Button bg="#2c4bff" color="white">
                      Connect channel
                    </Button>
                  </Link>
                </Flex>

                {/* Info Box */}
                <Box
                  pl="35px"
                  pr="35px"
                  pt="15px"
                  pb="15px"
                  shadow="rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;"
                  bg="white"
                >
                  <Flex alignItems="center" gap={2}>
                    <Icon h={19} w={19} ml="-10px" as={MdAccountCircle} />
                    Account
                  </Flex>
                  <Text>
                    You’re on a free trial for the Essentials + Team Pack Plan.
                    During your trial, you can connect as many channels as you’d
                    like. If you choose to stay on this plan after your trial,
                    it’ll cost $10 per channel per month billed yearly - Change
                    Plan
                  </Text>
                </Box>

                {/* Channels Connected */}
                <Box p="15px">
                  <Text fontSize="xl" as="b">
                    {data.length} Channels Connected
                  </Text>
                </Box>

                {/* Render Channels */}
                {data.map((item) => (
                  <Box
                    key={item.id}
                    shadow="rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;"
                    bg="white"
                    mb="15px"
                  >
                    <Flex
                      p="20px"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      {/* Left Section */}
                      <Flex gap="10px" alignItems="center">
                        <Img
                          w="40px"
                          h="40px"
                          borderRadius="full"
                          src={item.profilePic}
                          alt={`${item.accountName}-profile-pic`}
                        />
                        <Box>
                          <Text as="b">{item.accountName}</Text>
                          <Text color="gray.500">{item.platformName}</Text>
                          <Text>{item.ids}</Text>
                        </Box>
                      </Flex>
                      {/* Right Section */}
                      <Box>
                        <Flex alignItems="center" gap={5}>
                          <Icon
                            h={19}
                            w={19}
                            color="green.300"
                            as={MdCloudDone}
                          />
                          <Channeldelete
                            id={item.id}
                            onDelete={handleDelete}
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
