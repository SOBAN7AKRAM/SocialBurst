import { Box, Icon } from '@chakra-ui/react';
import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { BiDotsVerticalRounded } from "react-icons/bi";

export const Channeldelete = ({ id, onDelete }) => {
  const handleDelete = () => {
    
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Box>
      <Menu>
        <MenuButton
          aria-label="Options"
          variant="outline"
        >
          <Icon h={19} w={19} as={BiDotsVerticalRounded} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleDelete}>
            Remove Channel
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
