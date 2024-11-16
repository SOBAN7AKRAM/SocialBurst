import React from "react";
import AltNavbar from "../components/AltNavbar";
import SideBar from "../components/SideBar";
import { Flex } from "@chakra-ui/react";
import CalendarComponent from "../components/Calender";


const WorkSpace = () => {
  return (
    <div>
      <AltNavbar />
      <Flex justifyContent="space-between">
        <SideBar />
        <CalendarComponent />
      </Flex>
    </div>
  );
}

export default WorkSpace
