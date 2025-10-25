import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../states/Store";
import { useAppSelector } from "../../states/Hooks";
import { editShowCreateModal, editShowMenu } from "../../states/UserInterface";
import { Add, Hamburger } from "./icons";
import img from "../helper/image.png";
import {
  Menu,
  MenuItem,
  IconButton,
  Popover,
  Typography,
  Avatar,
  Box,
  useMediaQuery,
} from "@mui/material";
import style from "../../CSS/Navbar.module.css";

const Navbar = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const image = useAppSelector((state) => state.user.profilePicture);
  const name = useAppSelector((state) => state.user.name);
  const email = useAppSelector((state) => state.user.emailAddress);
  const menu = useAppSelector((state) => state.userInterface.showMenu);

  // --- Responsive breakpoint ---
  const showProfile = useMediaQuery("(min-width:500px)");

  // --- MUI Menu for Add Button ---
  const [addAnchor, setAddAnchor] = useState<null | HTMLElement>(null);
  const openAddMenu = Boolean(addAnchor);
  const handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
    setAddAnchor(event.currentTarget);
  };
  const handleAddClose = () => setAddAnchor(null);

  // --- MUI Popover for Profile ---
  const [profileAnchor, setProfileAnchor] = useState<HTMLElement | null>(null);
  const openProfile = Boolean(profileAnchor);
  const handleProfileEnter = (e: React.MouseEvent<HTMLElement>) =>
    setProfileAnchor(e.currentTarget);
  const handleProfileLeave = () => setProfileAnchor(null);

  return (
    <div className={style.nav_container}>
      {/* LEFT */}
      <div className={style.nav_left}>
        <div
          className={style.nav_left_menu}
          onClick={() => dispatch(editShowMenu(!menu))}
        >
          <Hamburger />
        </div>
        <div className={style.nav_left_logo}>
          <h3>
            <b>COLLEBORA</b>
          </h3>
        </div>
      </div>

      {/* RIGHT */}
      <div className={style.nav_right}>
        {/* Add / Join Menu */}
        <IconButton
          aria-controls={openAddMenu ? "add-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openAddMenu ? "true" : undefined}
          onClick={handleAddClick}
          sx={{
            color: "#0057ee",
            transition: "0.2s ease",
            "&:hover": { backgroundColor: "#eaf1ff" },
          }}
        >
          <Add />
        </IconButton>

        <Menu
          id="add-menu"
          anchorEl={addAnchor}
          open={openAddMenu}
          onClose={handleAddClose}
          PaperProps={{
            elevation: 3,
            sx: {
              borderRadius: 2,
              mt: 1,
              minWidth: 160,
              "& .MuiMenuItem-root:hover": {
                color: "#0057ee",
                backgroundColor: "#f3f6ff",
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleAddClose();
              dispatch(editShowCreateModal());
            }}
          >
            Create Room
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleAddClose();
              navigate("/joinRoom");
            }}
          >
            Join Room
          </MenuItem>
        </Menu>

        {/* Profile Avatar (visible only ≥500px) */}
        {showProfile && (
          <Box
            onMouseEnter={handleProfileEnter}
            onMouseLeave={handleProfileLeave}
            sx={{ ml: 1, cursor: "pointer" }}
          >
            <Avatar
              src={image || img}
              alt="name"
              sx={{
                width: 38,
                height: 38,
                border: "1px solid #dcdcdc",
                transition: "0.3s",
                "&:hover": { boxShadow: "0 0 8px rgba(0,0,0,0.2)" },
              }}
            />
          </Box>
        )}

        <Popover
          id="profile-popover"
          open={openProfile}
          anchorEl={profileAnchor}
          onClose={handleProfileLeave}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{ pointerEvents: "none" }}
          disableRestoreFocus
        >
          <Box sx={{ p: 1.5 }}>
            <Typography sx={{ fontWeight: 600 }}>{name}</Typography>
            <Typography sx={{ fontSize: 14, color: "gray" }}>{email}</Typography>
          </Box>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
