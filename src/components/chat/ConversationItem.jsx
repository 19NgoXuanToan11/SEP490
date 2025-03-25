import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Badge,
  Box,
  useTheme,
} from "@mui/material";
import { format, isToday, isYesterday } from "date-fns";

const ConversationItem = ({ conversation, selected, onClick }) => {
  const theme = useTheme();
  const { user, lastMessage, unreadCount } = conversation;

  // Định dạng timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    if (isToday(date)) {
      return format(date, "HH:mm");
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "dd/MM/yyyy");
    }
  };

  return (
    <ListItem
      button
      selected={selected}
      onClick={() => onClick(conversation)}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        backgroundColor: selected
          ? theme.palette.action.selected
          : "transparent",
        "&:hover": {
          backgroundColor: selected
            ? theme.palette.action.selected
            : theme.palette.action.hover,
        },
        position: "relative",
      }}
    >
      <ListItemAvatar>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          color={user.online ? "success" : "default"}
        >
          <Avatar src={user.avatar} alt={user.name} />
        </Badge>
      </ListItemAvatar>

      <ListItemText
        primary={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="subtitle2"
              fontWeight={unreadCount > 0 ? 600 : 400}
              noWrap
              sx={{ maxWidth: "70%" }}
            >
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {lastMessage && formatTimestamp(lastMessage.timestamp)}
            </Typography>
          </Box>
        }
        secondary={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              color={unreadCount > 0 ? "text.primary" : "text.secondary"}
              fontWeight={unreadCount > 0 ? 500 : 400}
              noWrap
              sx={{ maxWidth: "80%" }}
            >
              {lastMessage && lastMessage.text}
            </Typography>

            {unreadCount > 0 && (
              <Badge
                badgeContent={unreadCount}
                color="primary"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

export default ConversationItem;
