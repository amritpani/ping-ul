import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../Contexts/AuthContext";
import { searchUsers } from "../Services/UsersService";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const RightSidebar = ({ selectedChat }) => {
  const { loggedInUser, handleSearchUsers } = useContext(AuthContext); // Update prop name here
  const [searchValue, setSearchValue] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);

  const handleSearch = async () => {
    try {
      const result = await searchUsers(searchValue);
      setSearchedUser(result);
      setSearchValue("");
    } catch (error) {
      console.log("Search users failed:", error);
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchedUser(null);
  };

  const handleAddUser = () => {
    if (searchedUser) {
      handleSearchUsers(searchedUser);
      setSearchedUser(null);
    }
  };

  return (
    <Box sx={{ flexBasis: 400, bgcolor: "#f0f0f0" }}>
      <div style={{ padding: "16px" }}>
        <TextField
          label="Search Ping ID"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          variant="outlined"
          size="small"
          style={{ marginBottom: "8px" }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {searchedUser && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "10px",
            padding: "16px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Avatar
            alt="Avatar"
            src={searchedUser.avatar}
            sx={{
              bgcolor: "#0066cc",
            }}
          >
            {searchedUser.name.charAt(0)}
          </Avatar>
          <span style={{ marginLeft: "8px" }}>{searchedUser.name}</span>
          <div style={{ marginLeft: "auto" }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddUser}
            >
              Add
            </Button>
          </div>
        </div>
      )}

      {selectedChat && !searchedUser && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "10px",
            padding: "16px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Avatar
            alt="Avatar"
            src={selectedChat.users[0].avatar}
            sx={{
              bgcolor: "#0066cc",
            }}
          >
            {selectedChat.users[0].name.charAt(0)}
          </Avatar>
          <span style={{ marginLeft: "8px" }}>
            {selectedChat.users[0].name}
          </span>
          <div style={{ marginLeft: "auto" }}>
            <CallIcon style={{ marginRight: "8px", cursor: "pointer" }} />
            <VideocamIcon style={{ cursor: "pointer" }} />
          </div>
        </div>
      )}

      {!searchedUser && !selectedChat && (
        <div style={{ padding: "16px" }}>
          <Avatar alt="Avatar" src={loggedInUser?.avatar} />
          <span style={{ marginLeft: "8px" }}>{loggedInUser?.name}</span>
        </div>
      )}

      {searchedUser && (
        <Button variant="outlined" onClick={handleClearSearch}>
          Clear Search
        </Button>
      )}
    </Box>
  );
};

export default RightSidebar;
