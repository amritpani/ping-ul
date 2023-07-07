import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const ChatUiPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSend = () => {
    if (message.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const yourChatData = [
    {
      name: "Harish",
      avatar: "path_to_avatar_image_1.png",
      messages: [
        { content: "Hi, Whatsup", sender: { avatar: "sender_avatar_1.png" } },
        {
          content: "Are u finish that",
          sender: { avatar: "sender_avatar_2.png" },
        },
      ],
    },
    {
      name: "Ramesh",
      messages: [
        { content: "Hi, Whats'up", sender: { avatar: "sender_avatar_1.png" } },
        {
          content: "Are u going there",
          sender: { avatar: "sender_avatar_2.png" },
        },
      ],
    },
  ];

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={3} sx={{ border: 1 }}>
          <Box height="50vh" overflow="auto">
            {yourChatData.map((chat, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                p={2}
                bgcolor={selectedChat === chat ? "lightgray" : "transparent"}
                onClick={() => handleChatSelect(chat)}
                style={{ cursor: "pointer" }}
              >
                <Avatar>AP</Avatar>
                <Typography variant="body1" ml={2}>
                  {chat.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ border: 1 }}>
          <Box
            height="80vh"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-end"
            p={2}
            bgcolor="lightgray"
            overflow="auto"
          >
            {selectedChat && (
              <>
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar alt="User Avatar" src={selectedChat.avatar} />
                  <Typography
                    variant="body1"
                    ml={2}
                    sx={{ textDecoration: "underline" }}
                  >
                    {selectedChat.name}
                  </Typography>
                </Box>
                {selectedChat.messages.map((msg, index) => (
                  <Box key={index} display="flex" alignItems="center" mb={1}>
                    <Avatar alt="User Avatar" src={msg.sender.avatar} />
                    <Typography variant="body1" ml={2}>
                      {msg.content}
                    </Typography>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ border: 1 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="80vh"
          >
            <Avatar>AL</Avatar>
            <Typography variant="body1" mt={2}>
              User Name
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box mt={3}>
        <TextField
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendRoundedIcon
                  color="primary"
                  onClick={handleSend}
                  style={{ cursor: "pointer" }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Container>
  );
};

export default ChatUiPage;
