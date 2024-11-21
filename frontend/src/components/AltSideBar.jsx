import React from "react";
import {Divider,Flex,Icon,Box} from "@chakra-ui/react"
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { TbBox } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";

const AltSideBar = () => {
  return (
    <Box h="100vh" bg="#f5f5f5" w="200px" p="10px">
      <Box pl="10px">Settings</Box>
      <Divider borderColor="black.200" mt="4%" mb="4%" />
      <Flex flexDirection="column" pl="10px">
        <Flex
          p="6px"
          _hover={{ background: "#2c4bff", color: "white" }}
          alignItems="center"
          gap={2}
        >
          <Icon h={19} w={19} as={MdAccountCircle} />
          Account
        </Flex>
        <Flex
          p="6px"
          _hover={{ background: "#2c4bff", color: "white" }}
          alignItems="center"
          gap={2}
        >
          <Icon h={19} w={19} as={RiMoneyDollarBoxLine} />
          Billing
        </Flex>
        <Flex
          p="6px"
          _hover={{ background: "#2c4bff", color: "white" }}
          alignItems="center"
          gap={2}
        >
          <Icon h={19} w={19} as={TbBox} />
          Channels
        </Flex>
        <Flex
          p="6px"
          _hover={{ background: "#2c4bff", color: "white" }}
          alignItems="center"
          gap={2}
        >
          <Icon h={19} w={19} as={GrOrganization} />
          Organization
        </Flex>
      </Flex>
    </Box>
  );
};

export default AltSideBar;
