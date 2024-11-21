import { Box, Flex, Text, Icon, SimpleGrid, Img } from "@chakra-ui/react";
import React from "react";

import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import AltNavbar from "../components/AltNavbar";
import AltSideBar from "../components/AltSideBar";
import { ChannelModal } from "../components/Channelmodal";

export const AddChannel = () => {
  const channelData = [
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
      name: "YouTube",
      connect: "connect",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      name: "Facebook",
      connect: "connect",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
      name: "Instagram",
      connect: "connect",
    },
  ];

  return (
    <Box>
      <AltNavbar />
      <Box>
        <Flex m="auto" w="100%" h="85vh">
          {/* Sidebar */}
          <AltSideBar/>

          {/* Main Content */}
          <Flex ml="450px"  // Sidebar width
            mt="88px" w={["90%", "90%", "50%"]} h="100%" justifyContent="center">
            <Box w="100%">
              <Text fontSize={["xl", "xl", "4xl"]} textAlign={["center", "center", "left"]} as="b">
                Connect a new channel
              </Text>
              <Text mb="25px" textAlign={["center", "center", "left"]}>
                Looking for step-by-step instructions? Visit our Help Center to read our Getting Started guides and
                learn about supported channel types.
              </Text>
              <SimpleGrid columns={[2, 2, 3]} gap={6} justifyContent="center">
                {channelData.map((item, index) => (
                  <Flex
                    _hover={{ border: "1px solid blue" }}
                    h="25vh"
                    flexDirection="column"
                    alignItems="center"
                    key={index}
                    shadow="rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;"
                    textAlign="center"
                    p="20px"
                  >
                    <Img w={["30px", "30px", "50px"]} h={["30px", "30px", "50px"]} src={item.image} alt={item.name} />
                    <Text mt="5px">{item.name}</Text>
                    <ChannelModal selectedChannel={item.name} />
                  </Flex>
                ))}
              </SimpleGrid>
              <Box>
                <Link to={"/Channels"}>
                  <Flex cursor="pointer" alignItems="center" gap={3} mt="10px">
                    <Icon h={19} w={19} as={BiLeftArrowAlt} />
                    <Text as="b">Back to channels</Text>
                  </Flex>
                </Link>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
