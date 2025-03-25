import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
  Divider,
  Badge,
  IconButton,
  CircularProgress,
  Alert,
  Breadcrumbs,
  useTheme,
} from "@mui/material";
import {
  Send,
  AttachFile,
  Search,
  MoreVert,
  ArrowBack,
  Close,
  EmojiEmotions,
  Home as HomeIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Picker } from "emoji-mart";
import { motion } from "framer-motion";
import { useChat } from "../context/ChatContext";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Message = () => {
  const theme = useTheme();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);
  const [mobileView, setMobileView] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Try to use ChatContext
  const {
    conversations: contextConversations,
    selectedConversation: contextSelectedConversation,
    loading: contextLoading,
    error: contextError,
    sendMessage: contextSendMessage,
    selectConversation: contextSelectConversation,
    sendTypingStatus,
  } = useChat();

  // Use context or local state
  const effectiveConversations =
    contextConversations.length > 0 ? contextConversations : conversations;
  const effectiveSelectedConversation =
    contextSelectedConversation || selectedConversation;
  const effectiveLoading = contextLoading || loading;
  const effectiveError = contextError || error;

  // Thêm ref cho phần container của tin nhắn
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowConversationList(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      // Only fetch if context doesn't have conversations
      if (contextConversations.length === 0) {
        setLoading(true);
        try {
          // Here you would fetch conversations from your API
          // For now, we'll use mock data
          setTimeout(() => {
            const mockConversations = [
              {
                id: 1,
                user: {
                  id: 2,
                  name: "Jane Smith",
                  avatar: "https://via.placeholder.com/40",
                  lastSeen: "2023-07-15T10:30:00Z",
                  online: true,
                },
                lastMessage: {
                  text: "Is the iPhone still available?",
                  timestamp: "2023-07-15T10:30:00Z",
                  read: false,
                  sender: "them",
                },
                unreadCount: 1,
                messages: [
                  {
                    id: 101,
                    text: "Hi, I'm interested in your iPhone 13 Pro. Is it still available?",
                    timestamp: "2023-07-15T10:25:00Z",
                    sender: "them",
                  },
                  {
                    id: 102,
                    text: "Yes, it's still available. Are you interested in buying or exchanging?",
                    timestamp: "2023-07-15T10:27:00Z",
                    sender: "me",
                  },
                  {
                    id: 103,
                    text: "I'd like to buy it. Can you tell me more about its condition?",
                    timestamp: "2023-07-15T10:28:00Z",
                    sender: "them",
                  },
                  {
                    id: 104,
                    text: "It's in like-new condition. I've only used it for 3 months and it has no scratches or dents. The battery health is at 98%.",
                    timestamp: "2023-07-15T10:29:00Z",
                    sender: "me",
                  },
                  {
                    id: 105,
                    text: "Is the iPhone still available?",
                    timestamp: "2023-07-15T10:30:00Z",
                    sender: "them",
                  },
                ],
              },
              {
                id: 2,
                user: {
                  id: 3,
                  name: "Mike Johnson",
                  avatar: "https://via.placeholder.com/40",
                  lastSeen: "2023-07-14T15:45:00Z",
                  online: false,
                },
                lastMessage: {
                  text: "I accept the exchange.",
                  timestamp: "2023-07-14T15:45:00Z",
                  read: true,
                  sender: "them",
                },
                unreadCount: 0,
                messages: [
                  {
                    id: 201,
                    text: "Hello, I saw your Sony headphones. Would you be interested in exchanging them for my Bose QuietComfort 45?",
                    timestamp: "2023-07-14T14:20:00Z",
                    sender: "me",
                  },
                  {
                    id: 202,
                    text: "Hi there! I might be interested. Can you tell me more about the condition of your headphones?",
                    timestamp: "2023-07-14T14:30:00Z",
                    sender: "them",
                  },
                  {
                    id: 203,
                    text: "They're in good condition, only used for a few months. Battery life is still excellent and they come with the original case and accessories.",
                    timestamp: "2023-07-14T14:35:00Z",
                    sender: "me",
                  },
                  {
                    id: 204,
                    text: "That sounds good. My Bose headphones are also in great condition. I've had them for about 6 months but they're well taken care of.",
                    timestamp: "2023-07-14T14:40:00Z",
                    sender: "them",
                  },
                  {
                    id: 205,
                    text: "Great! Would you like to proceed with the exchange?",
                    timestamp: "2023-07-14T15:30:00Z",
                    sender: "me",
                  },
                  {
                    id: 206,
                    text: "I accept the exchange.",
                    timestamp: "2023-07-14T15:45:00Z",
                    sender: "them",
                  },
                ],
              },
              {
                id: 3,
                user: {
                  id: 4,
                  name: "Sarah Williams",
                  avatar: "https://via.placeholder.com/40",
                  lastSeen: "2023-07-10T09:15:00Z",
                  online: false,
                },
                lastMessage: {
                  text: "Thank you for the smooth transaction!",
                  timestamp: "2023-07-10T09:15:00Z",
                  read: true,
                  sender: "them",
                },
                unreadCount: 0,
                messages: [
                  {
                    id: 301,
                    text: "Hi, I'm interested in your MacBook Air. Is it still available?",
                    timestamp: "2023-07-09T16:20:00Z",
                    sender: "them",
                  },
                  {
                    id: 302,
                    text: "Yes, it's still available. Would you like to know more about it?",
                    timestamp: "2023-07-09T16:25:00Z",
                    sender: "me",
                  },
                  {
                    id: 303,
                    text: "Yes, please. What's the battery cycle count and does it come with the original charger?",
                    timestamp: "2023-07-09T16:30:00Z",
                    sender: "them",
                  },
                  {
                    id: 304,
                    text: "The battery cycle count is around 50, and yes, it comes with the original charger and box.",
                    timestamp: "2023-07-09T16:35:00Z",
                    sender: "me",
                  },
                  {
                    id: 305,
                    text: "Great! I'd like to buy it. Can we meet tomorrow for the exchange?",
                    timestamp: "2023-07-09T16:40:00Z",
                    sender: "them",
                  },
                  {
                    id: 306,
                    text: "Sure, that works for me. How about 2 PM at the central mall?",
                    timestamp: "2023-07-09T16:45:00Z",
                    sender: "me",
                  },
                  {
                    id: 307,
                    text: "Perfect! See you there.",
                    timestamp: "2023-07-09T16:50:00Z",
                    sender: "them",
                  },
                  {
                    id: 308,
                    text: "Thank you for the smooth transaction!",
                    timestamp: "2023-07-10T09:15:00Z",
                    sender: "them",
                  },
                ],
              },
            ];

            setConversations(mockConversations);
            setSelectedConversation(mockConversations[0]);
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching conversations:", error);
          setError("Failed to load conversations. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchConversations();
  }, [contextConversations.length]);

  useEffect(() => {
    // Scroll to bottom when messages change or conversation changes
    if (messagesEndRef.current) {
      // Chỉ cuộn nội dung trong khung chat, không cuộn cả trang
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [effectiveSelectedConversation]);

  const handleSendMessage = async () => {
    if ((!message.trim() && !attachment) || !effectiveSelectedConversation)
      return;

    try {
      // Use context sendMessage if available
      if (typeof contextSendMessage === "function") {
        await contextSendMessage(message, attachment);
      } else {
        // Fallback to local state
        const newMessage = {
          id: Date.now(),
          text: message.trim(),
          timestamp: new Date().toISOString(),
          sender: "me",
          attachment: attachment
            ? {
                type: attachment.type.startsWith("image/") ? "image" : "file",
                url: URL.createObjectURL(attachment),
                name: attachment.name,
                size: attachment.size,
              }
            : null,
        };

        const updatedConversation = {
          ...selectedConversation,
          messages: [...selectedConversation.messages, newMessage],
          lastMessage: {
            text:
              message.trim() || (attachment ? "Đã gửi một tệp đính kèm" : ""),
            timestamp: new Date().toISOString(),
          },
        };

        const updatedConversations = conversations.map((conv) =>
          conv.id === selectedConversation.id ? updatedConversation : conv
        );

        const reorderedConversations = [
          updatedConversation,
          ...updatedConversations.filter(
            (conv) => conv.id !== selectedConversation.id
          ),
        ];

        setConversations(reorderedConversations);
        setSelectedConversation(updatedConversation);
      }

      // Clear input and attachments
      setMessage("");
      setAttachment(null);
      setShowEmojiPicker(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    // Gửi trạng thái đang nhập nếu đã tích hợp WebSocket
    if (selectedConversation) {
      // Gửi trạng thái đang nhập cho server
      // sendTypingStatus(true);

      // Clear timeout nếu có
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set timeout mới để kết thúc trạng thái đang nhập sau 2 giây
      typingTimeoutRef.current = setTimeout(() => {
        // sendTypingStatus(false);
      }, 2000);
    }
  };

  const handleSelectConversation = (conversation) => {
    // Sử dụng function từ ChatContext nếu đã tích hợp
    // selectConversation(conversation);

    // Đây là phiên bản đơn giản không sử dụng context
    // Mark conversation as read
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversation.id) {
        return {
          ...conv,
          unreadCount: 0,
          lastMessage: {
            ...conv.lastMessage,
            read: true,
          },
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation(conversation);

    if (mobileView) {
      setShowConversationList(false);
    }

    // Đảm bảo không cuộn cả trang khi chọn cuộc trò chuyện mới
    // Ngăn chặn hành vi cuộn mặc định
    if (window.scrollY > 0) {
      // Giữ vị trí cuộn hiện tại của trang
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
      }, 0);
    }
  };

  const handleBackToList = () => {
    setShowConversationList(true);
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  // ... existing code ...

  return (
    <Box
      sx={{
        bgcolor: "#0f172a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          py: 4,
          flex: 1,
          color: "white",
        }}
      >
        {effectiveLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "white" }} />
          </Box>
        ) : effectiveError ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {effectiveError}
          </Alert>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                background: "#0f172a",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(99, 102, 241, 0.1)",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)",
                },
              }}
            >
              <Grid container>
                {(showConversationList || !mobileView) && (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                      borderRight: 1,
                      borderColor: "rgba(99, 102, 241, 0.2)",
                      background: "#0f172a",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: "1px",
                        background:
                          "linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.3), transparent)",
                      },
                    }}
                  >
                    <Paper
                      sx={{
                        height: "70vh",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: { xs: 3, md: "0 0 0 3px" },
                        background: "#0f172a",
                      }}
                      elevation={0}
                    >
                      <Box
                        sx={{
                          p: 2,
                          background: "rgba(15, 23, 42, 0.95)",
                          borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
                          backdropFilter: "blur(8px)",
                          position: "relative",
                          zIndex: 2,
                        }}
                      >
                        <TextField
                          fullWidth
                          placeholder="Search conversations..."
                          variant="outlined"
                          size="small"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <Search
                                color="action"
                                sx={{
                                  mr: 1,
                                  color: "rgba(255, 255, 255, 0.7)",
                                }}
                              />
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 8,
                              background: "rgba(30, 41, 59, 0.8)",
                              color: "white",
                              transition: "all 0.2s ease",
                              "& fieldset": {
                                borderColor: "rgba(99, 102, 241, 0.2)",
                                transition: "all 0.2s",
                              },
                              "&:hover fieldset": {
                                borderColor: "rgba(99, 102, 241, 0.5)",
                              },
                              "&.Mui-focused": {
                                boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.2)",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#6366f1",
                              },
                            },
                            "& .MuiInputBase-input": {
                              color: "white",
                              "&::placeholder": {
                                color: "rgba(255, 255, 255, 0.5)",
                                opacity: 1,
                              },
                            },
                          }}
                        />
                      </Box>

                      <List
                        sx={{
                          overflow: "auto",
                          flexGrow: 1,
                          px: 1,
                          pt: 1,
                          bgcolor: "#0f172a",
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "rgba(99, 102, 241, 0.3)",
                            borderRadius: "10px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "rgba(15, 23, 42, 0.5)",
                            borderRadius: "10px",
                          },
                        }}
                      >
                        {filteredConversations.length === 0 ? (
                          <Box
                            sx={{
                              p: 3,
                              textAlign: "center",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              opacity: 0.7,
                            }}
                          >
                            <Search
                              sx={{
                                fontSize: 40,
                                color: "rgba(255, 255, 255, 0.3)",
                                mb: 2,
                              }}
                            />
                            <Typography
                              variant="body1"
                              color="rgba(255, 255, 255, 0.7)"
                            >
                              No conversations found
                            </Typography>
                          </Box>
                        ) : (
                          filteredConversations.map((conv) => (
                            <ListItem
                              key={conv.id}
                              button
                              selected={selectedConversation?.id === conv.id}
                              onClick={() => handleSelectConversation(conv)}
                              sx={{
                                p: 1.5,
                                mb: 0.8,
                                borderRadius: 2,
                                transition: "all 0.3s ease",
                                background:
                                  selectedConversation?.id === conv.id
                                    ? "linear-gradient(90deg, rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0.05))"
                                    : "transparent",
                                position: "relative",
                                "&:hover": {
                                  background:
                                    selectedConversation?.id === conv.id
                                      ? "linear-gradient(90deg, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.1))"
                                      : "rgba(99, 102, 241, 0.08)",
                                  transform: "translateY(-2px)",
                                  boxShadow:
                                    selectedConversation?.id === conv.id
                                      ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                                      : "none",
                                },
                                "&::before":
                                  selectedConversation?.id === conv.id
                                    ? {
                                        content: '""',
                                        position: "absolute",
                                        left: 0,
                                        top: "20%",
                                        bottom: "20%",
                                        width: "3px",
                                        borderRadius: "0 4px 4px 0",
                                        background:
                                          "linear-gradient(to bottom, #6366f1, #818cf8)",
                                      }
                                    : {},
                              }}
                            >
                              <ListItemAvatar>
                                <Badge
                                  color="success"
                                  variant="dot"
                                  invisible={!conv.user.online}
                                  overlap="circular"
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  sx={{
                                    "& .MuiBadge-badge": {
                                      boxShadow: "0 0 0 2px #0f172a",
                                      height: "12px",
                                      width: "12px",
                                    },
                                  }}
                                >
                                  <Avatar
                                    src={conv.user.avatar}
                                    sx={{
                                      width: 48,
                                      height: 48,
                                      boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                                      border:
                                        selectedConversation?.id === conv.id
                                          ? "2px solid rgba(99, 102, 241, 0.5)"
                                          : "2px solid transparent",
                                      transition: "all 0.3s ease",
                                    }}
                                  />
                                </Badge>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="subtitle1"
                                    noWrap
                                    sx={{
                                      fontWeight:
                                        conv.unreadCount > 0 ? 600 : 500,
                                      fontSize: "15px",
                                      color: "white",
                                      transition: "color 0.2s ease",
                                    }}
                                  >
                                    {conv.user.name}
                                  </Typography>
                                }
                                secondary={
                                  <Typography
                                    variant="body2"
                                    color={
                                      conv.unreadCount > 0
                                        ? "rgba(255, 255, 255, 0.9)"
                                        : "rgba(255, 255, 255, 0.6)"
                                    }
                                    noWrap
                                    sx={{
                                      fontWeight:
                                        conv.unreadCount > 0 ? 500 : 400,
                                      fontSize: "13px",
                                    }}
                                  >
                                    {conv.lastMessage.sender === "me"
                                      ? "You: "
                                      : ""}
                                    {conv.lastMessage.text}
                                  </Typography>
                                }
                                sx={{ ml: 1 }}
                              />
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-end",
                                  ml: 1,
                                  minWidth: 45,
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  color="rgba(255, 255, 255, 0.5)"
                                  sx={{
                                    fontSize: "11px",
                                    mb: 0.5,
                                  }}
                                >
                                  {formatTime(conv.lastMessage.timestamp)}
                                </Typography>
                                {conv.unreadCount > 0 && (
                                  <Badge
                                    badgeContent={conv.unreadCount}
                                    color="primary"
                                    sx={{
                                      "& .MuiBadge-badge": {
                                        background:
                                          "linear-gradient(90deg, #3f51b5, #6366f1)",
                                        fontWeight: 600,
                                        fontSize: "10px",
                                        minWidth: "18px",
                                        height: "18px",
                                        boxShadow:
                                          "0 2px 6px rgba(99, 102, 241, 0.4)",
                                      },
                                    }}
                                  />
                                )}
                              </Box>
                            </ListItem>
                          ))
                        )}
                      </List>
                    </Paper>
                  </Grid>
                )}

                {(!showConversationList || !mobileView) &&
                  effectiveSelectedConversation && (
                    <Grid item xs={12} md={8}>
                      <Paper
                        sx={{
                          height: "70vh",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: { xs: 3, md: "0 3px 3px 0" },
                          background: "#0f172a",
                        }}
                        elevation={0}
                      >
                        <Box
                          sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            borderBottom: "1px solid rgba(99, 102, 241, 0.15)",
                            background: "rgba(15, 23, 42, 0.95)",
                            backdropFilter: "blur(8px)",
                            position: "relative",
                            zIndex: 10,
                          }}
                        >
                          {mobileView && (
                            <IconButton
                              edge="start"
                              onClick={handleBackToList}
                              sx={{
                                mr: 1,
                                color: "white",
                                background: "rgba(99, 102, 241, 0.1)",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  background: "rgba(99, 102, 241, 0.2)",
                                  transform: "scale(1.05)",
                                },
                              }}
                            >
                              <ArrowBack />
                            </IconButton>
                          )}

                          <Avatar
                            src={selectedConversation.user.avatar}
                            sx={{
                              mr: 2,
                              width: 42,
                              height: 42,
                              boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.3)",
                              border: "2px solid transparent",
                              transition: "transform 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.1)",
                              },
                            }}
                          />

                          <Box sx={{ flexGrow: 1 }}>
                            <Typography
                              variant="subtitle1"
                              color="white"
                              sx={{
                                fontWeight: 600,
                                textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {selectedConversation.user.name}
                              {selectedConversation.user.online && (
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    bgcolor: "#4caf50",
                                    boxShadow:
                                      "0 0 0 2px #0f172a, 0 0 0 4px rgba(76, 175, 80, 0.3)",
                                    animation:
                                      "pulse 1.5s infinite ease-in-out",
                                    "@keyframes pulse": {
                                      "0%": {
                                        boxShadow:
                                          "0 0 0 0 rgba(76, 175, 80, 0.7)",
                                      },
                                      "70%": {
                                        boxShadow:
                                          "0 0 0 6px rgba(76, 175, 80, 0)",
                                      },
                                      "100%": {
                                        boxShadow:
                                          "0 0 0 0 rgba(76, 175, 80, 0)",
                                      },
                                    },
                                  }}
                                />
                              )}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="rgba(255, 255, 255, 0.6)"
                              sx={{ fontSize: "12px" }}
                            >
                              {selectedConversation.user.online ? (
                                <span style={{ color: "#4caf50" }}>
                                  Online now
                                </span>
                              ) : (
                                `Last seen ${formatTime(
                                  selectedConversation.user.lastSeen
                                )}`
                              )}
                            </Typography>
                          </Box>

                          <IconButton
                            sx={{
                              color: "white",
                              background: "rgba(99, 102, 241, 0.1)",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                background: "rgba(99, 102, 241, 0.2)",
                                transform: "rotate(90deg)",
                              },
                            }}
                          >
                            <MoreVert />
                          </IconButton>
                        </Box>

                        <Box
                          ref={messagesContainerRef}
                          sx={{
                            p: 2,
                            flexGrow: 1,
                            overflow: "auto",
                            height: "calc(70vh - 120px)", // Đảm bảo chiều cao cố định
                            background:
                              "linear-gradient(to bottom, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.85))",
                            backgroundImage:
                              "url('https://transparent-textures.com/patterns/subtle-dark-vertical.png')",
                            backgroundBlendMode: "overlay",
                            "&::-webkit-scrollbar": {
                              width: "6px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "rgba(99, 102, 241, 0.3)",
                              borderRadius: "10px",
                            },
                            "&::-webkit-scrollbar-track": {
                              backgroundColor: "rgba(15, 23, 42, 0.5)",
                              borderRadius: "10px",
                            },
                          }}
                        >
                          {selectedConversation.messages.map((msg, index) => (
                            <Box
                              key={msg.id}
                              sx={{
                                display: "flex",
                                justifyContent:
                                  msg.sender === "me"
                                    ? "flex-end"
                                    : "flex-start",
                                mb: 2,
                                mt:
                                  index === 0 ||
                                  new Date(msg.timestamp).toDateString() !==
                                    new Date(
                                      selectedConversation.messages[
                                        Math.max(0, index - 1)
                                      ].timestamp
                                    ).toDateString()
                                    ? 3
                                    : 0,
                                position: "relative",
                              }}
                            >
                              {index === 0 ||
                              new Date(msg.timestamp).toDateString() !==
                                new Date(
                                  selectedConversation.messages[
                                    Math.max(0, index - 1)
                                  ].timestamp
                                ).toDateString() ? (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: -16,
                                    left: 0,
                                    right: 0,
                                    textAlign: "center",
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      px: 2,
                                      py: 0.5,
                                      borderRadius: 10,
                                      bgcolor: "rgba(30, 41, 59, 0.7)",
                                      color: "rgba(255, 255, 255, 0.7)",
                                      fontSize: "11px",
                                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                                      backdropFilter: "blur(4px)",
                                    }}
                                  >
                                    {new Date(msg.timestamp).toLocaleDateString(
                                      undefined,
                                      {
                                        weekday: "long",
                                        month: "short",
                                        day: "numeric",
                                      }
                                    )}
                                  </Typography>
                                </Box>
                              ) : null}

                              {msg.sender !== "me" && (
                                <Avatar
                                  src={selectedConversation.user.avatar}
                                  sx={{
                                    mr: 1,
                                    width: 32,
                                    height: 32,
                                    display: { xs: "none", sm: "block" },
                                    opacity:
                                      msg.sender === "me" ||
                                      (index > 0 &&
                                        selectedConversation.messages[index - 1]
                                          .sender !== "me")
                                        ? 0
                                        : 1,
                                  }}
                                />
                              )}

                              <Box
                                sx={{
                                  maxWidth: "70%",
                                  p: 2,
                                  borderRadius: 3,
                                  borderTopLeftRadius:
                                    msg.sender !== "me" ? 0 : 3,
                                  borderTopRightRadius:
                                    msg.sender === "me" ? 0 : 3,
                                  bgcolor:
                                    msg.sender === "me"
                                      ? "linear-gradient(135deg, #3f51b5, #6366f1)"
                                      : "rgba(30, 41, 59, 0.8)",
                                  color: "white",
                                  boxShadow:
                                    msg.sender === "me"
                                      ? "0 2px 10px rgba(99, 102, 241, 0.3)"
                                      : "0 2px 10px rgba(0, 0, 0, 0.15)",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow:
                                      msg.sender === "me"
                                        ? "0 4px 12px rgba(99, 102, 241, 0.4)"
                                        : "0 4px 12px rgba(0, 0, 0, 0.2)",
                                  },
                                  position: "relative",
                                  ml:
                                    msg.sender !== "me" ? { xs: 0, sm: 1 } : 0,
                                }}
                              >
                                {msg.attachment && (
                                  <Box sx={{ mb: 1 }}>
                                    {msg.attachment.type === "image" ? (
                                      <Box
                                        component="img"
                                        src={
                                          msg.attachment.url ||
                                          `https://via.placeholder.com/300x200?text=Image`
                                        }
                                        alt="Attachment"
                                        sx={{
                                          maxWidth: "100%",
                                          height: "auto",
                                          maxHeight: 200,
                                          borderRadius: 2,
                                          mb: 1,
                                          boxShadow:
                                            "0 2px 8px rgba(0, 0, 0, 0.2)",
                                          transition: "transform 0.3s ease",
                                          cursor: "pointer",
                                          "&:hover": {
                                            transform: "scale(1.02)",
                                          },
                                        }}
                                      />
                                    ) : (
                                      <Box
                                        sx={{
                                          p: 1.5,
                                          borderRadius: 1.5,
                                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                          mb: 1,
                                          cursor: "pointer",
                                          transition: "all 0.2s ease",
                                          "&:hover": {
                                            backgroundColor:
                                              "rgba(0, 0, 0, 0.3)",
                                          },
                                        }}
                                      >
                                        <AttachFile fontSize="small" />
                                        <Typography
                                          variant="body2"
                                          noWrap
                                          color="white"
                                        >
                                          {msg.attachment.name || "File"}(
                                          {msg.attachment.size
                                            ? (
                                                msg.attachment.size / 1024
                                              ).toFixed(1)
                                            : "unknown"}{" "}
                                          KB)
                                        </Typography>
                                      </Box>
                                    )}
                                  </Box>
                                )}

                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontSize: "15px",
                                    lineHeight: 1.4,
                                    color: "white",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {msg.text}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    display: "block",
                                    textAlign: "right",
                                    mt: 0.5,
                                    color:
                                      msg.sender === "me"
                                        ? "rgba(255, 255, 255, 0.7)"
                                        : "rgba(255, 255, 255, 0.7)",
                                    fontSize: "11px",
                                  }}
                                >
                                  {formatTime(msg.timestamp)}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                          <div
                            ref={messagesEndRef}
                            style={{ height: "1px", opacity: 0 }}
                          />
                        </Box>

                        <Box
                          sx={{
                            p: 2,
                            borderTop: "1px solid rgba(99, 102, 241, 0.15)",
                            background: "rgba(15, 23, 42, 0.95)",
                            backdropFilter: "blur(8px)",
                            position: "relative",
                          }}
                        >
                          {attachment && (
                            <Box
                              sx={{
                                mb: 2,
                                position: "relative",
                                display: "inline-block",
                                borderRadius: 2,
                                overflow: "hidden",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                              }}
                            >
                              {attachment.type.startsWith("image/") ? (
                                <Box
                                  component="img"
                                  src={URL.createObjectURL(attachment)}
                                  alt="Attachment preview"
                                  sx={{
                                    maxHeight: 100,
                                    maxWidth: 200,
                                    borderRadius: 1,
                                    transition: "all 0.3s ease",
                                  }}
                                />
                              ) : (
                                <Paper
                                  sx={{
                                    p: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    backgroundColor: "rgba(30, 41, 59, 0.8)",
                                    color: "white",
                                    borderRadius: 2,
                                  }}
                                >
                                  <AttachFile sx={{ color: "white" }} />
                                  <Typography
                                    variant="body2"
                                    noWrap
                                    color="white"
                                  >
                                    {attachment.name} (
                                    {(attachment.size / 1024).toFixed(1)} KB)
                                  </Typography>
                                </Paper>
                              )}
                              <IconButton
                                size="small"
                                onClick={handleRemoveAttachment}
                                sx={{
                                  position: "absolute",
                                  top: -8,
                                  right: -8,
                                  bgcolor: "rgba(99, 102, 241, 0.8)",
                                  color: "white",
                                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    bgcolor: "rgba(99, 102, 241, 1)",
                                    transform: "scale(1.1)",
                                  },
                                }}
                              >
                                <Close fontSize="small" />
                              </IconButton>
                            </Box>
                          )}

                          <Grid container spacing={1} alignItems="center">
                            <Grid item>
                              <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                              />
                              <IconButton
                                onClick={handleAttachmentClick}
                                sx={{
                                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                                  color: "#6366f1",
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    backgroundColor: "rgba(30, 41, 59, 0.9)",
                                    color: "#818cf8",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                                  },
                                }}
                              >
                                <AttachFile />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton
                                onClick={() =>
                                  setShowEmojiPicker(!showEmojiPicker)
                                }
                                sx={{
                                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                                  color: "#6366f1",
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    backgroundColor: "rgba(30, 41, 59, 0.9)",
                                    color: "#818cf8",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                                  },
                                }}
                              >
                                <EmojiEmotions />
                              </IconButton>
                            </Grid>
                            <Grid item xs>
                              <TextField
                                fullWidth
                                placeholder="Type a message..."
                                variant="outlined"
                                size="small"
                                value={message}
                                onChange={handleTyping}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                  }
                                }}
                                multiline
                                maxRows={4}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: 8,
                                    backgroundColor: "rgba(30, 41, 59, 0.8)",
                                    color: "white",
                                    transition: "all 0.2s ease-in-out",
                                    "&:hover": {
                                      backgroundColor: "rgba(30, 41, 59, 0.9)",
                                      boxShadow:
                                        "0 2px 10px rgba(0, 0, 0, 0.1)",
                                    },
                                    "& fieldset": {
                                      borderColor: "rgba(99, 102, 241, 0.3)",
                                      transition: "all 0.2s",
                                    },
                                    "&:hover fieldset": {
                                      borderColor: "rgba(99, 102, 241, 0.5)",
                                    },
                                    "&.Mui-focused": {
                                      boxShadow:
                                        "0 0 0 3px rgba(99, 102, 241, 0.2)",
                                    },
                                    "&.Mui-focused fieldset": {
                                      borderColor: "#6366f1",
                                    },
                                  },
                                  "& .MuiInputBase-input": {
                                    color: "white",
                                    "&::placeholder": {
                                      color: "rgba(255, 255, 255, 0.5)",
                                      opacity: 1,
                                    },
                                  },
                                }}
                              />
                              {showEmojiPicker && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: "100%",
                                    right: 20,
                                    zIndex: 10,
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    transform: "translateY(-10px)",
                                    animation: "fadeIn 0.2s ease-out",
                                    "@keyframes fadeIn": {
                                      "0%": {
                                        opacity: 0,
                                        transform: "translateY(10px)",
                                      },
                                      "100%": {
                                        opacity: 1,
                                        transform: "translateY(-10px)",
                                      },
                                    },
                                    "& .emoji-mart": {
                                      backgroundColor: "#1e293b",
                                      border:
                                        "1px solid rgba(99, 102, 241, 0.3)",
                                      color: "white",
                                    },
                                    "& .emoji-mart-search input": {
                                      backgroundColor: "rgba(30, 41, 59, 0.8)",
                                      color: "white",
                                      borderColor: "rgba(99, 102, 241, 0.3)",
                                      borderRadius: 8,
                                    },
                                    "& .emoji-mart-category-label span": {
                                      backgroundColor: "#1e293b",
                                      color: "white",
                                    },
                                    "& .emoji-mart-bar": {
                                      borderColor: "rgba(99, 102, 241, 0.3)",
                                    },
                                    "& .emoji-mart-emoji:hover:before": {
                                      backgroundColor:
                                        "rgba(99, 102, 241, 0.3)",
                                    },
                                  }}
                                >
                                  <Picker
                                    onSelect={handleEmojiSelect}
                                    theme="dark"
                                    set="apple"
                                    title="Pick your emoji"
                                    emoji="point_up"
                                    showPreview={false}
                                    showSkinTones={false}
                                    emojiTooltip={true}
                                    autoFocus={true}
                                  />
                                </Box>
                              )}
                            </Grid>
                            <Grid item>
                              <Button
                                variant="contained"
                                endIcon={<Send />}
                                onClick={handleSendMessage}
                                disabled={!message.trim() && !attachment}
                                sx={{
                                  borderRadius: 8,
                                  height: 40,
                                  px: 3,
                                  background:
                                    "linear-gradient(135deg, #3f51b5, #6366f1)",
                                  boxShadow:
                                    "0 2px 10px rgba(99, 102, 241, 0.3)",
                                  transition: "all 0.2s ease",
                                  fontWeight: 600,
                                  textTransform: "none",
                                  "&:hover": {
                                    background:
                                      "linear-gradient(135deg, #303f9f, #5558e3)",
                                    boxShadow:
                                      "0 4px 15px rgba(99, 102, 241, 0.4)",
                                    transform: "translateY(-2px)",
                                  },
                                  "&:active": {
                                    transform: "translateY(0)",
                                    boxShadow:
                                      "0 2px 8px rgba(99, 102, 241, 0.3)",
                                  },
                                  "&.Mui-disabled": {
                                    background: "rgba(30, 41, 59, 0.5)",
                                    color: "rgba(255, 255, 255, 0.3)",
                                  },
                                }}
                              >
                                Send
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                  )}
              </Grid>
            </Paper>
          </motion.div>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default Message;
