import React, { createContext, useState, useEffect } from "react";
import { sendMessage, getMessages } from "../Services/MessagesService";

const { io } = require("socket.io-client");
const token = localStorage.getItem("token");
const socket = io("https://ping-ul-amrit-backend.loca.lt", {
  path: "/live",
  auth: {
    token: token,
  },
  transports: ["websocket"],
  upgrade: false,
});

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState({});
  const [isSocketActive, setIsSocketActive] = useState(false);

  useEffect(() => {
    const checkSocketActive = () => {
      setIsSocketActive(socket.connected);
    };

    checkSocketActive();

    socket.on("connect", checkSocketActive);
    socket.on("disconnect", checkSocketActive);
    socket.on("server-messages", (data) => {
      console.log("message received", JSON.parse(data));
      const TempData = JSON.parse(data);
      addMessage(TempData.conversation_group_id, TempData);
    });

    return () => {
      socket.off("connect", checkSocketActive);
      socket.off("disconnect", checkSocketActive);
      socket.off("server-messages");
    };
  }, []);

  const fetchMessages = async (conversationGroupId) => {
    try {
      if (messages[conversationGroupId]) {
        return;
      }
      console.log("Fetching messages using API...");
      const data = await getMessages(conversationGroupId);
      setMessages((prevMessages) => ({
        ...prevMessages,
        [conversationGroupId]: { messages: data.messages },
      }));
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const addMessage = (conversationGroupId, message) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [conversationGroupId]: {
        messages: [
          ...(prevMessages[conversationGroupId]?.messages || []),
          message,
        ],
      },
    }));
  };

  const sendMessageToServer = async (conversationGroupId, text) => {
    try {
      if (!text.trim()) return;

      if (isSocketActive) {
        console.log("Sending message using socket...");
        socket.emit(
          "messages",
          JSON.stringify({ conversationGroupId, text }),
          (data) => {
            addMessage(conversationGroupId, data);
          }
        );
      } else {
        console.log("Sending message using API...");
        const data = await sendMessage(conversationGroupId, text);
        addMessage(conversationGroupId, data);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <MessageContext.Provider
      value={{ messages, fetchMessages, sendMessageToServer, isSocketActive }}
    >
      {children}
    </MessageContext.Provider>
  );
};
