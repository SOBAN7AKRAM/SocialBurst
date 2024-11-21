import React, { createContext, useContext, useState } from 'react';


const ChannelContext = createContext();


export const ChannelProvider = ({ children }) => {
  const [channels, setChannels] = useState([
    {
      id: 1,
      
      accountName: "John Doe",
      platformName: "Facebook",
      profilePic: "https://via.placeholder.com/40",
      
    },
    {
      id: 2,
      
      accountName: "Jane Smith",
      platformName: "Twitter",
      profilePic: "https://via.placeholder.com/40",
      
    },
  ]);

  
  const addChannel = (newChannel) => {
    setChannels((prevChannels) => [...prevChannels, newChannel]);
  };

  
  const deleteChannel = (id) => {
    setChannels((prevChannels) => prevChannels.filter((channel) => channel.id !== id));
  };

  return (
    <ChannelContext.Provider value={{ channels, addChannel, deleteChannel }}>
      {children}
    </ChannelContext.Provider>
  );
};


export const useChannels = () => useContext(ChannelContext);
