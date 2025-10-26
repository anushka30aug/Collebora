import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../states/Hooks";
import RemoveMembers from "../modal/RemoveMember";
import { editShowRemoveModal } from "../../states/UserInterface";
import style from "../../CSS/Members/MembersCard.module.css";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

interface prop {
  name: string;
  profile: string;
  role: string;
  id: string;
  showEllipses: boolean;
}

const MembersCard = ({
  name,
  profile,
  role,
  id,
  showEllipses,
}: prop): React.JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleRemove = () => {
    dispatch(editShowRemoveModal());
    handleClose();
  };

  const showRemoveModal = useAppSelector((state) => state.userInterface.showRemoveModal);
  const isAdmin = useAppSelector((state) => state.userInterface.isAdmin);

  return (
    <div className={style.cardContainer}>
      {showRemoveModal && <RemoveMembers userToRemove={id} />}

      <div className={style.cardContent}>
        {/* Member Info */}
        <div className={style.memberInfo}>
          {/* Avatar */}
          <div className={style.avatarWrapper}>
            <div className={style.avatar}>
              {profile ? (
                <img src={profile} alt={name} className={style.avatarImage} />
              ) : (
                name.charAt(0).toUpperCase()
              )}
            </div>
            {role === "admin" && (
              <div className={style.adminBadgeIcon}>
                <WorkspacePremiumIcon sx={{ fontSize: 14, color: "#fbc02d" }} />
              </div>
            )}
          </div>

          {/* Name */}
          <div className={style.memberDetails}>
            <div className={style.memberNameRow}>
              <h3 className={style.memberName}>{name}</h3>
              {role === "admin" && (
                <span className={style.adminLabel}>Admin</span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {isAdmin && role !== "admin" && showEllipses && (
          <div className={style.actionsContainer}>
            <IconButton
              aria-label="member options"
              aria-controls={open ? "member-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className={style.actionButton}
              sx={{ color: "inherit", padding: 0 }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>

            <Menu
              id="member-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "member-options-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleRemove}>
                <span className={style.dropdownItem}>Remove Member</span>
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersCard;
