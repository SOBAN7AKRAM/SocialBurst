import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  Image,
  useToast,
  Input,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { toZonedTime } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";

const timeZone = "Asia/Karachi";

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

// Convert date to PKT timezone
const toPKT = (date) => toZonedTime(date, timeZone);

const initialEvents = [];

const connectedProfiles = [
  { name: "Facebook", icon: "📘" },
  { name: "Twitter", icon: "🐦" },
  { name: "Instagram", icon: "📸" },
];

const CalendarComponent = () => {
  const toast = useToast();
  const [newEvent, setNewEvent] = useState({ title: "", postDate: new Date(), image: null });
  const [allEvents, setAllEvents] = useState(initialEvents);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imagePreview, setImagePreview] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Handle adding a new event
  const handleAddEvent = () => {
    if (!newEvent.title) {
      toast({
        description: "Please add a description for your post.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!selectedProfiles.length) {
      toast({
        description: "Please select at least one social media platform.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const eventWithPKT = {
      ...newEvent,
      postDate: toPKT(newEvent.postDate),
      platforms: selectedProfiles,
    };
    setAllEvents([...allEvents, eventWithPKT]);
    toast({
      description: "Post added successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose(); // Close modal after success
  };

  // Handle platform selection toggle
  const toggleProfileSelection = (profile) => {
    setSelectedProfiles((prev) =>
      prev.includes(profile)
        ? prev.filter((p) => p !== profile) // Remove if already selected
        : [...prev, profile] // Add if not selected
    );
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewEvent((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Open alert dialog for confirming deletion
  const handleDeleteEvent = () => {
    setAllEvents(allEvents.filter((event) => event !== eventToDelete));
    setIsAlertOpen(false);
    toast({
      description: "Post deleted successfully.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box w="calc(100% - 250px)" mt="30px" ml="250px"> {/* Adjust width to fit remaining space after sidebar */}
        <Button
          variant="solid"
          colorScheme="blue"
          borderRadius="3px"
          size="md"
          position="absolute"
          right="23%"
          mt="50px"
          onClick={onOpen}
        >
          Create Posts
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
              <Flex gap={2} mb={4}>
                {connectedProfiles.map((profile) => (
                  <Button
                    key={profile.name}
                    variant={selectedProfiles.includes(profile.name) ? "solid" : "outline"}
                    colorScheme="blue"
                    onClick={() => toggleProfileSelection(profile.name)}
                  >
                    {profile.icon} {profile.name}
                  </Button>
                ))}
              </Flex>
              <Text>Description</Text>
              <Textarea
                h="100px"
                mt="10px"
                onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="What would you like to add in description of post?"
              />
              <Box mt="10px">
                <Text>Add Image</Text>
                <Input type="file" onChange={handleImageUpload} />
                {imagePreview && <Image src={imagePreview} alt="Preview" mt={2} boxSize="150px" />}
              </Box>
              <Box mt="10px">
                <Text>Post Date</Text>
                <DatePicker
                  selected={newEvent.postDate}
                  onChange={(date) => setNewEvent((prev) => ({ ...prev, postDate: date }))}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MM/dd/yyyy h:mm aa"
                  minDate={new Date()} // Prevent selecting past dates
                  placeholderText="Select post date and time"
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" borderRadius="3px" onClick={handleAddEvent}>
                Schedule Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Calendar component */}
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="postDate"
          endAccessor="postDate"
          style={{
            height: "calc(100vh - 50px)", 
            marginTop: "50px",
            marginLeft: "5px" 
          }}
          onSelectEvent={(event) => {
            setEventToDelete(event);
            setIsAlertOpen(true);
          }}
        />
      </Box>

      {/* AlertDialog for confirming deletion */}
      <AlertDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        leastDestructiveRef={null}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Confirm Deletion</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this post?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsAlertOpen(false)}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDeleteEvent} ml={3}>
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
