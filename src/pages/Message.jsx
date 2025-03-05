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
} from "@mui/material";
import {
  Send,
  AttachFile,
  Search,
  MoreVert,
  ArrowBack,
} from "@mui/icons-material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Message = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);
  const [mobileView, setMobileView] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);

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
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change or conversation changes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return;

    // Here you would send the message to your API
    console.log("Sending message:", message);

    // Update the local state with the new message
    const newMessage = {
      id: Date.now(),
      text: message,
      timestamp: new Date().toISOString(),
      sender: "me",
    };

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: {
            text: message,
            timestamp: new Date().toISOString(),
            read: true,
            sender: "me",
          },
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: {
        text: message,
        timestamp: new Date().toISOString(),
        read: true,
        sender: "me",
      },
    });

    setMessage("");
  };

  const handleSelectConversation = (conversation) => {
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

  return (
    <>
      <Header />
      <Container sx={{ py: 4, minHeight: "70vh" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Messages
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {/* Conversation List */}
            {(showConversationList || !mobileView) && (
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    height: "70vh",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <TextField
                      fullWidth
                      placeholder="Search conversations..."
                      variant="outlined"
                      size="small"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <Search color="action" sx={{ mr: 1 }} />
                        ),
                      }}
                    />
                  </Box>

                  <Divider />

                  <List sx={{ overflow: "auto", flexGrow: 1 }}>
                    {filteredConversations.length === 0 ? (
                      <Box sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="body1" color="text.secondary">
                          No conversations found
                        </Typography>
                      </Box>
                    ) : (
                      filteredConversations.map((conv) => (
                        <React.Fragment key={conv.id}>
                          <ListItem
                            button
                            selected={selectedConversation?.id === conv.id}
                            onClick={() => handleSelectConversation(conv)}
                            sx={{
                              bgcolor:
                                selectedConversation?.id === conv.id
                                  ? "action.selected"
                                  : "inherit",
                              "&:hover": { bgcolor: "action.hover" },
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
                              >
                                <Avatar src={conv.user.avatar} />
                              </Badge>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle1" noWrap>
                                  {conv.user.name}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  noWrap
                                  sx={{
                                    fontWeight:
                                      conv.unreadCount > 0 ? "bold" : "normal",
                                    color:
                                      conv.unreadCount > 0
                                        ? "text.primary"
                                        : "text.secondary",
                                  }}
                                >
                                  {conv.lastMessage.sender === "me"
                                    ? "You: "
                                    : ""}
                                  {conv.lastMessage.text}
                                </Typography>
                              }
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                ml: 1,
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {formatTime(conv.lastMessage.timestamp)}
                              </Typography>
                              {conv.unreadCount > 0 && (
                                <Badge
                                  badgeContent={conv.unreadCount}
                                  color="primary"
                                  sx={{ mt: 0.5 }}
                                />
                              )}
                            </Box>
                          </ListItem>
                          <Divider component="li" />
                        </React.Fragment>
                      ))
                    )}
                  </List>
                </Paper>
              </Grid>
            )}

            {/* Message Area */}
            {(!showConversationList || !mobileView) && selectedConversation && (
              <Grid item xs={12} md={8}>
                <Paper
                  sx={{
                    height: "70vh",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Conversation Header */}
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    {mobileView && (
                      <IconButton
                        edge="start"
                        onClick={handleBackToList}
                        sx={{ mr: 1 }}
                      >
                        <ArrowBack />
                      </IconButton>
                    )}

                    <Avatar
                      src={selectedConversation.user.avatar}
                      sx={{
                        mr: 2,
                        width: 32,
                        height: 32,
                        display: { xs: "none", sm: "block" },
                      }}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">
                        {selectedConversation.user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedConversation.user.online ? (
                          <span style={{ color: "green" }}>Online</span>
                        ) : (
                          `Last seen ${formatTime(
                            selectedConversation.user.lastSeen
                          )}`
                        )}
                      </Typography>
                    </Box>

                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </Box>

                  {/* Messages */}
                  <Box
                    sx={{
                      p: 2,
                      flexGrow: 1,
                      overflow: "auto",
                      bgcolor: "background.default",
                    }}
                  >
                    {selectedConversation.messages.map((msg) => (
                      <Box
                        key={msg.id}
                        sx={{
                          display: "flex",
                          justifyContent:
                            msg.sender === "me" ? "flex-end" : "flex-start",
                          mb: 2,
                        }}
                      >
                        {msg.sender !== "me" && (
                          <Avatar
                            src={selectedConversation.user.avatar}
                            sx={{
                              mr: 1,
                              width: 32,
                              height: 32,
                              display: { xs: "none", sm: "block" },
                            }}
                          />
                        )}

                        <Box
                          sx={{
                            maxWidth: "70%",
                            p: 2,
                            borderRadius: 2,
                            bgcolor:
                              msg.sender === "me"
                                ? "primary.main"
                                : "background.paper",
                            color:
                              msg.sender === "me"
                                ? "primary.contrastText"
                                : "text.primary",
                            boxShadow: 1,
                          }}
                        >
                          <Typography variant="body1">{msg.text}</Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              display: "block",
                              textAlign: "right",
                              mt: 0.5,
                              color:
                                msg.sender === "me"
                                  ? "rgba(255, 255, 255, 0.7)"
                                  : "text.secondary",
                            }}
                          >
                            {formatTime(msg.timestamp)}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                    <div ref={messagesEndRef} />
                  </Box>

                  {/* Message Input */}
                  <Box
                    sx={{
                      p: 2,
                      borderTop: 1,
                      borderColor: "divider",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid item>
                        <IconButton color="primary">
                          <AttachFile />
                        </IconButton>
                      </Grid>
                      <Grid item xs>
                        <TextField
                          fullWidth
                          placeholder="Type a message..."
                          variant="outlined"
                          size="small"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          endIcon={<Send />}
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
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
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Message;
