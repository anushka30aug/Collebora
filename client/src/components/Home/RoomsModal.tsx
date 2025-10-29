import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { AppDispatch } from "../../states/Store";
import {
  editShowDeleteModal,
  editShowLeaveModal,
  editShowRenameModal,
  setClassroomDetail,
} from "../../states/UserInterface";
import { Ellipsis } from "../helper/icons";
import { useAppSelector } from "../../states/Hooks";
import LeaveRoom from "../modal/LeaveRoom";
import { ArchiveRoom } from "../../states/Room";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import style from "../../CSS/Home/RoomsModal.module.css";

interface Classroom {
  _id: string;
  name: string;
  adminName: string;
  adminId: string;
  classId: string;
  theme?: string;
}

const RoomsModal = (prop: Classroom): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isAdmin = useAppSelector((state) => state.userInterface.isAdmin);
  const isActive = useAppSelector((state) => state.userInterface.isActive);
  const leaveRoom = useAppSelector(
    (state) => state.userInterface.showLeaveModal
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    dispatch(setClassroomDetail(prop));
    navigate(`/room`);
  };

  const archiveRoom = () => {
    dispatch(ArchiveRoom(prop._id)).then((result) => {
      if (result.payload.success) {
        window.location.reload();
      }
    });
  };

  return (
    <>
      {leaveRoom && <LeaveRoom id={prop._id} />}
      <Card
        className={style.room_modal}
        sx={{
          width: "90%",
          maxWidth: 300,
          borderRadius: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          overflow: "hidden",
          transition: "0.3s",
          "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.18)" },
          backgroundColor: "#fff",
        }}
      >
        {/* Top Image Section */}
        <Box
          sx={{
            height: "6em",
            backgroundImage: `url(${
              prop.theme ||
              "https://gstatic.com/classroom/themes/img_graduation.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            color: "white",
          }}
        >
          {/* Ellipsis Menu */}
          <IconButton
            onClick={handleMenuClick}
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.3)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.45)" },
            }}
          >
            <Ellipsis />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                borderRadius: 2,
                mt: 1,
                minWidth: 150,
                "& .MuiMenuItem-root:hover": {
                  color: "#0057ee",
                  backgroundColor: "#f3f6ff",
                },
              },
            }}
          >
            {isAdmin ? (
              <>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClose();
                    dispatch(editShowRenameModal());
                  }}
                >
                  Change name
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClose();
                    dispatch(editShowDeleteModal());
                  }}
                >
                  Delete Room
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClose();
                    archiveRoom();
                  }}
                >
                  {isActive ? "Archive Room" : "Unarchive Room"}
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuClose();
                  dispatch(editShowLeaveModal());
                }}
              >
                Leave Room
              </MenuItem>
            )}
          </Menu>

          {/* Title Centered */}
          <Box
            sx={{
              position: "absolute",
              bottom: "0.5em",
              width: "100%",
              textAlign: "center",
              // background: "rgba(0, 0, 0, 0.3)",
              py: 0.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                letterSpacing: 0.5,
                color: "white",
                textShadow: "0 0 4px rgba(0,0,0,0.5)",
              }}
              onClick={handleClick}
            >
              {prop.name}
            </Typography>
          </Box>
        </Box>

        {/* Bottom Section */}
        <CardActionArea onClick={handleClick}>
          <CardContent sx={{ textAlign: "center", py: 1.5 }}>
            <Typography variant="body2" color="text.secondary">
              {prop.adminName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default RoomsModal;
