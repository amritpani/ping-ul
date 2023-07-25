import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { getConversations } from "../Services/ConversationsService";
import { AuthContext } from "../Contexts/AuthContext";

const LeftSidebar = ({ onSelectChat }) => {
  const { loggedInUser, selectedUser, setSelectedUser } =
    useContext(AuthContext);
  const loggedInUserId = loggedInUser?._id;
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const newConversation = {
        _id: selectedUser._id,
        users: [loggedInUser, selectedUser],
      };

      setConversations((prevConversations) => [
        ...prevConversations,
        newConversation,
      ]);

      setSelectedUser(null);
    }
  }, [selectedUser, loggedInUser, setSelectedUser]);

  const fetchConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data.conversations);
    } catch (error) {
      console.log("Fetch conversations failed:", error);
    }
  };

  const handleChatSelection = (conversation) => {
    onSelectChat(conversation);
  };

  return (
    <Box sx={{ flexBasis: 400, bgcolor: "#f0f0f0", height: "100vh" }}>
      {conversations.length > 0 ? (
        conversations.map((conversation) => {
          const otherUser = conversation.users.find(
            (user) => user._id !== loggedInUserId
          );

          if (!otherUser) return null;

          return (
            <div
              key={conversation._id}
              style={{ cursor: "pointer" }}
              onClick={() => handleChatSelection(conversation)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px",
                  padding: "5px",
                  borderRadius: 5,
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Avatar
                  alt="Avatar"
                  src={otherUser.avatar}
                  sx={{
                    bgcolor: "#0066cc",
                  }}
                >
                  {otherUser.name.charAt(0)}
                </Avatar>
                <span style={{ marginLeft: "8px" }}>{otherUser.name}</span>
              </div>
            </div>
          );
        })
      ) : (
        <div>No conversations available</div>
      )}
    </Box>
  );
};

export default LeftSidebar;
