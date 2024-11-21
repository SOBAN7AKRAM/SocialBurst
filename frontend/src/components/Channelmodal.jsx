import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useChannels } from "../context"; // Import the custom hook

export function ChannelModal({ selectedChannel }) {
  const { addChannel } = useChannels(); // Use context
  const [data, setData] = useState({
    page: selectedChannel || "", // Use selectedChannel name directly
    ids: "", // Empty by default, adjust if needed
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    // If selectedChannel prop changes, update the local state
    if (selectedChannel) {
      setData({
        page: selectedChannel, // Set platform name from the selected channel
        ids: "", // You can modify this logic as needed
      });
    }
  }, [selectedChannel]);

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new channel object
    const newChannel = {
      id: Date.now(), // Using current timestamp as unique ID
      
      accountName: data.ids, // You can set this dynamically
      platformName: data.page,
      profilePic: "https://via.placeholder.com/40", // Placeholder profile pic
      
    };

    // Pass the new channel to the context provider
    addChannel(newChannel);

    alert("Channel added successfully");

    onClose();
  };

  return (
    <>
      <Text cursor="pointer" color="blue.500" as="b" mt="12px" onClick={onOpen}>
        Connect
      </Text>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Connect your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {/* Replace Select with Input */}
              <Input
                ref={initialRef}
                name="page"
                value={data.page}
                onChange={handleData}
                placeholder="Platform"
                disabled={true} // Make it read-only if you don't want it editable
              />

              <Input
                mt="10px"
                name="ids"
                value={data.ids}
                onChange={handleData}
                placeholder="Account ID"
              />
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
