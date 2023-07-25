import React, { useState } from "react";
import AppBarComponent from "./AppBar";
import LeftSidebar from "./LeftSidebar";
import MainChat from "./MainChat";
import RightSidebar from "./RightSidebar";
import { Box } from "@mui/material";
import { MessageProvider } from "../Contexts/MessageContext"; // Import the MessageProvider here

const ChatUiPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <MessageProvider>
      {" "}
      {/* Wrap the components with MessageProvider */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBarComponent />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr",
            gridTemplateRows: "auto",
            height: "91vh",
            overflow: "hidden",
          }}
        >
          <LeftSidebar onSelectChat={handleChatSelection} />
          <MainChat selectedChat={selectedChat} />
          <RightSidebar selectedChat={selectedChat} />
        </Box>
      </Box>
    </MessageProvider>
  );
};

export default ChatUiPage;
