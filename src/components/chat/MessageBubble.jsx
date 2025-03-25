import React from "react";
import {
  Box,
  Typography,
  Paper,
  Tooltip,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Error, Check, DoneAll } from "@mui/icons-material";
import { format } from "date-fns";

const MessageBubble = ({ message, isLast }) => {
  const isMe = message.sender === "me";

  // Định dạng thời gian
  const formattedTime = format(new Date(message.timestamp), "HH:mm");

  // Xác định trạng thái tin nhắn (đang gửi, đã gửi, đã đọc, lỗi)
  const renderStatus = () => {
    if (message.status === "sending") {
      return <CircularProgress size={12} color="inherit" />;
    } else if (message.status === "failed") {
      return (
        <Tooltip title="Failed to send. Tap to retry.">
          <IconButton size="small">
            <Error fontSize="small" color="error" />
          </IconButton>
        </Tooltip>
      );
    } else if (isMe) {
      return message.read ? (
        <DoneAll fontSize="small" color="primary" />
      ) : (
        <Check fontSize="small" />
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isMe ? "flex-end" : "flex-start",
        mb: 1,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          maxWidth: "75%",
          borderRadius: 2,
          bgcolor: isMe ? "primary.main" : "background.paper",
          color: isMe ? "primary.contrastText" : "text.primary",
          position: "relative",
          boxShadow: 1,
          borderTopRightRadius: isMe ? 0 : 2,
          borderTopLeftRadius: isMe ? 2 : 0,
        }}
      >
        {/* Hiển thị attachments nếu có */}
        {message.attachment && (
          <Box sx={{ mb: 1 }}>
            {message.attachment.type === "image" ? (
              <Box
                component="img"
                src={message.attachment.url}
                alt="Attachment"
                sx={{
                  maxWidth: "100%",
                  maxHeight: 200,
                  borderRadius: 1,
                  mb: 0.5,
                }}
              />
            ) : (
              <Box
                sx={{
                  p: 1,
                  bgcolor: "rgba(0,0,0,0.05)",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 0.5,
                }}
              >
                <AttachFile fontSize="small" />
                <Typography variant="body2" noWrap>
                  {message.attachment.name} (
                  {(message.attachment.size / 1024).toFixed(1)} KB)
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Nội dung tin nhắn */}
        <Typography variant="body1">{message.text}</Typography>

        {/* Thời gian và trạng thái */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 0.5,
            mt: 0.5,
          }}
        >
          <Typography
            variant="caption"
            color={isMe ? "primary.light" : "text.secondary"}
          >
            {formattedTime}
          </Typography>
          {renderStatus()}
        </Box>
      </Paper>
    </Box>
  );
};

export default MessageBubble;
