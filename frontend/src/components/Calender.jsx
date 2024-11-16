import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaUserCircle } from "react-icons/fa";
import {
  Box,
  Flex,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Textarea,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { toZonedTime } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";

const timeZone = "Asia/Karachi"; // Pakistan Time Zone

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Convert a date to PKT timezone
const toPKT = (date) => toZonedTime(date, timeZone);

// Initial events with PKT timezone applied
const initialEvents = [
  {
    title: "Big Meeting",
    allDay: true,
    start: toPKT(new Date(2022, 9, 26)),
    end: toPKT(new Date(2022, 9, 26)),
  },
  {
    title: "Vacation",
    start: toPKT(new Date(2022, 12, 25)),
    end: toPKT(new Date(2023, 1, 2)),
  },
  {
    title: "Conference",
    start: toPKT(new Date(2022, 10, 1)),
    end: toPKT(new Date(2022, 10, 1)),
  },
];
const CalendarComponent = () => {
  const toast = useToast();
  const [newEvent, setNewEvent] = useState({ title: "", start: new Date(), end: new Date() });
  const [allEvents, setAllEvents] = useState(initialEvents);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Reset the newEvent state to ensure start and end dates are set to current date when modal is opened
  const handleOpenModal = () => {
    setNewEvent({ title: "", start: new Date(), end: new Date() }); // Reset to current date
    onOpen();
  };

  // Handle adding event with PKT timezone
  const handleAddEvent = () => {
    if (newEvent.end <= newEvent.start) {
      toast({
        description: "End date must be greater than start date.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return; // Do not add the event if the end date is not greater than start date
    }
  
    const eventWithPKT = {
      ...newEvent,
      start: toPKT(newEvent.start),
      end: toPKT(newEvent.end),
    };
    setAllEvents([...allEvents, eventWithPKT]);

    toast({
      description: "Great! The post has been added to your queue.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose(); // Close modal after success
  };

  // Handle deleting an event
  const handleDeleteEvent = () => {
    setAllEvents(allEvents.filter(event => event !== eventToDelete));
    setIsAlertOpen(false);
    toast({
      description: "Event deleted successfully.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle event changes for input fields
  const handleEventChange = (field, value) => {
    setNewEvent((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Box w="82.5%" mt="30px">
        <Button
          variant="solid"
          colorScheme="blue"
          borderRadius="3px"
          size="md"
          position="absolute"
          right="23%"
          mt="-2px"
          onClick={handleOpenModal} // Open modal and reset dates
        >
          Create Notification
        </Button>

        {/* Modal for creating a new event */}
        <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader borderBottom="1px solid grey">
              <Flex alignItems="center" ml="5px" mr="5px" justifyContent="space-between">
                <Text fontSize="sm">Campaign</Text>
              </Flex>
            </ModalHeader>
            <ModalBody>
              <FaUserCircle icon="fa-duotone" size="26px" swapOpacity />
              <Textarea
                h="100px"
                mt="10px"
                onChange={(e) => handleEventChange("title", e.target.value)}
                placeholder="What would you like to bookmark?"
              />
              <Box mt="10px">
                <Text>Start Date</Text>
                <DatePicker
                  selected={newEvent.start}
                  onChange={(date) => handleEventChange("start", date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
              </Box>
              <Box mt="10px">
                <Text>End Date</Text>
                <DatePicker
                  selected={newEvent.end}
                  onChange={(date) => handleEventChange("end", date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Flex gap="10px">
                <Button
                  colorScheme="blue"
                  borderRadius="3px"
                  onClick={handleAddEvent} // Call add event only if validation passes
                >
                  Add to Queue
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Calendar component with delete functionality */}
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "83vh" }}
          onSelectEvent={(event) => {
            setEventToDelete(event);
            setIsAlertOpen(true);
          }}
        />
      </Box>

      {/* AlertDialog for confirming deletion */}
      <AlertDialog isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Confirm Deletion</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this event?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsAlertOpen(false)}>Cancel</Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={handleDeleteEvent}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CalendarComponent;
