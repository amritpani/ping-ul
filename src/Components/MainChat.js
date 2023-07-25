import React, { useContext, useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Stack from "@mui/material/Stack";
import { MessageContext } from "../Contexts/MessageContext";
import { AuthContext } from "../Contexts/AuthContext";

const MainChat = ({ selectedChat }) => {
  const [messageInput, setMessageInput] = useState("");
  const messageContainerRef = useRef(null);
  const { messages, fetchMessages, sendMessageToServer, isSocketActive } =
    useContext(MessageContext);
  const [showMessages, setShowMessages] = useState([]);
  const { loggedInUser } = useContext(AuthContext);
  console.log(loggedInUser);
  const loggedInUserId = loggedInUser?._id;
  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      setShowMessages(messages[selectedChat._id]?.messages || []);
    }
  }, [messages, selectedChat]);

  const handleSend = () => {
    if (isSocketActive && selectedChat) {
      sendMessageToServer(selectedChat._id, messageInput);
    } else {
      sendMessageToServer(selectedChat._id, messageInput);
    }
    setMessageInput("");
  };

  return (
    <Stack sx={{ maxHeight: "85vh" }}>
      <Grid direction="column" sx={{ height: "100%" }}>
        <Grid item sx={{ overflowY: "auto", height: "100%" }}>
          <div ref={messageContainerRef} className="message-container">
            {showMessages.map((message) => {
              console.log("message.sender_id", message.sender_id);
              console.log("loggedInUserId", loggedInUserId);
              return (
                <div
                  key={message._id}
                  style={{
                    display: "flex",
                    justifyContent:
                      message.sender_id === loggedInUserId
                        ? "flex-start"
                        : "flex-end",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor:
                        message.sender_id === loggedInUserId
                          ? "#0066cc"
                          : "#f0f0f0",
                      borderRadius: "8px",
                      padding: "8px",
                      maxWidth: "70%",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                      margin: "8px",
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              );
            })}
          </div>
        </Grid>
      </Grid>
      <TextField
        variant="outlined"
        fullWidth
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
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
    </Stack>
  );
};

export default MainChat;
