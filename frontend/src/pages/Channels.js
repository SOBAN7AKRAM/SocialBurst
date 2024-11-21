import React from "react";
import { Box, Button, Flex, Icon, Img, Text } from "@chakra-ui/react";
import { MdAccountCircle, MdCloudDone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import AltSideBar from "../components/AltSideBar";
import AltNavbar from "../components/AltNavbar";
import { Channeldelete } from "../components/Channeldelete";
import { useChannels } from "../context"; 

export const Channels = () => {
  const navigate = useNavigate();
  const { channels, addChannel, deleteChannel } = useChannels();

  return (
    <Box>
      <AltNavbar />
      <Box>
        <Flex>
          
          <AltSideBar />

          
          <Box
            ml="250px" 
            mt="68px" 
            bg="#f5f5f5"
            w="calc(100% - 250px)" 
            h="calc(100vh - 68px)" 
            overflowY="auto" 
            css={{
              
              "&::-webkit-scrollbar": {
                display: "none", 
              },
              "&": {
                scrollbarWidth: "none", 
              },
            }}
          >
            <Flex
              m="auto"
              w={["90%", "90%", "60%", "50%"]}
              h="100%" 
              justifyContent="center"
            >
              <Box w="100%">
                
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
                  <Link to="/channels/addchannel">
                    <Button bg="#2c4bff" color="white">
                      Connect channel
                    </Button>
                  </Link>
                </Flex>

                
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

                
                <Box p="15px">
                  <Text fontSize="xl" as="b">
                    {channels.length} Channels Connected
                  </Text>
                </Box>

                
                {channels.map((item) => (
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
                            onDelete={deleteChannel}
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                ))}

                
                <Flex justifyContent="flex-start" p="10px">
                  <Button
                    bg="#2c4bff"
                    color="white"
                    onClick={() => navigate("/Workspace")}
                  >
                    Back to Workspace
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

