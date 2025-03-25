import React, { createContext, useState, useEffect, useContext } from "react";
import ChatService from "../services/ChatService";
import WebSocketService from "../services/WebSocketService";

// Tạo context
const ChatContext = createContext();

// Hook để sử dụng context
export const useChat = () => useContext(ChatContext);

// Provider component
export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  // Tải dữ liệu cuộc trò chuyện ban đầu
  useEffect(() => {
    fetchConversations();
  }, []);

  // Đếm số tin nhắn chưa đọc
  useEffect(() => {
    if (conversations.length) {
      const count = conversations.reduce((acc, conv) => {
        const unreadMessages = conv.messages.filter(
          (msg) => msg.sender !== "me" && !msg.read
        );
        return acc + unreadMessages.length;
      }, 0);
      setUnreadCount(count);
    }
  }, [conversations]);

  // Kết nối WebSocket khi người dùng đăng nhập
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id && user.token) {
      WebSocketService.connect(user.id, user.token);

      // Lắng nghe tin nhắn mới
      const unsubscribeMessage = WebSocketService.on(
        "message",
        handleNewMessage
      );

      // Lắng nghe trạng thái typing
      const unsubscribeTyping = WebSocketService.on(
        "typing",
        handleTypingStatus
      );

      // Lắng nghe trạng thái online
      const unsubscribeOnline = WebSocketService.on(
        "online",
        handleOnlineStatus
      );

      // Hủy đăng ký khi component unmount
      return () => {
        unsubscribeMessage();
        unsubscribeTyping();
        unsubscribeOnline();
        WebSocketService.disconnect();
      };
    }
  }, []);

  // Lấy danh sách cuộc trò chuyện
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await ChatService.getConversations();
      setConversations(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load conversations");
      setLoading(false);
    }
  };

  // Chọn một cuộc trò chuyện
  const selectConversation = async (conversation) => {
    setSelectedConversation(conversation);

    // Đánh dấu tin nhắn là đã đọc
    if (conversation) {
      await ChatService.markMessagesAsRead(conversation.id);

      // Cập nhật trạng thái đã đọc trong state
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === conversation.id) {
          const updatedMessages = conv.messages.map((msg) =>
            msg.sender !== "me" ? { ...msg, read: true } : msg
          );
          return { ...conv, messages: updatedMessages };
        }
        return conv;
      });

      setConversations(updatedConversations);
    }
  };

  // Xử lý tin nhắn mới từ WebSocket
  const handleNewMessage = (data) => {
    const { conversationId, message } = data;

    // Kiểm tra xem cuộc trò chuyện đã tồn tại chưa
    const existingConversation = conversations.find(
      (conv) => conv.id === conversationId
    );

    if (existingConversation) {
      // Cập nhật cuộc trò chuyện hiện tại với tin nhắn mới
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === conversationId) {
          const updatedMessages = [...conv.messages, message];

          // Đánh dấu tin nhắn là đã đọc nếu người dùng đang xem cuộc trò chuyện này
          const isRead = selectedConversation?.id === conversationId;

          return {
            ...conv,
            messages: updatedMessages,
            lastMessage: {
              text: message.text,
              timestamp: message.timestamp,
              sender: message.sender,
              read: isRead,
            },
            unreadCount: isRead ? 0 : (conv.unreadCount || 0) + 1,
            isTyping: false, // Reset trạng thái typing
          };
        }
        return conv;
      });

      // Đưa cuộc trò chuyện có tin nhắn mới lên đầu danh sách
      const sortedConversations = [...updatedConversations].sort((a, b) => {
        if (a.id === conversationId) return -1;
        if (b.id === conversationId) return 1;
        return (
          new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
        );
      });

      setConversations(sortedConversations);

      // Cập nhật selectedConversation nếu người dùng đang xem cuộc trò chuyện này
      if (selectedConversation?.id === conversationId) {
        const updatedSelectedConversation = sortedConversations.find(
          (conv) => conv.id === conversationId
        );
        setSelectedConversation(updatedSelectedConversation);

        // Đánh dấu tin nhắn là đã đọc
        ChatService.markMessagesAsRead(conversationId);
      }
    } else {
      // Nếu là cuộc trò chuyện mới, cần fetch thông tin
      fetchConversations();
    }
  };

  // Xử lý trạng thái typing từ WebSocket
  const handleTypingStatus = (data) => {
    const { conversationId, isTyping, userId } = data;

    // Cập nhật trạng thái typing cho cuộc trò chuyện
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversationId) {
        return { ...conv, isTyping };
      }
      return conv;
    });

    setConversations(updatedConversations);

    // Cập nhật selectedConversation nếu người dùng đang xem cuộc trò chuyện này
    if (selectedConversation?.id === conversationId) {
      const updatedSelectedConversation = updatedConversations.find(
        (conv) => conv.id === conversationId
      );
      setSelectedConversation(updatedSelectedConversation);
    }
  };

  // Xử lý trạng thái online từ WebSocket
  const handleOnlineStatus = (data) => {
    const { userId, online, lastSeen } = data;

    // Cập nhật trạng thái online cho cuộc trò chuyện
    const updatedConversations = conversations.map((conv) => {
      if (conv.user.id === userId) {
        return {
          ...conv,
          user: {
            ...conv.user,
            online,
            lastSeen: lastSeen || conv.user.lastSeen,
          },
        };
      }
      return conv;
    });

    setConversations(updatedConversations);

    // Cập nhật selectedConversation nếu người dùng đang xem cuộc trò chuyện với người này
    if (selectedConversation?.user.id === userId) {
      const updatedSelectedConversation = updatedConversations.find(
        (conv) => conv.user.id === userId
      );
      setSelectedConversation(updatedSelectedConversation);
    }
  };

  // Gửi tin nhắn
  const sendMessage = async (content, attachment = null) => {
    if (!selectedConversation) return;

    try {
      // Tạo tin nhắn tạm thời với ID tạm
      const tempId = `temp-${Date.now()}`;
      const tempMessage = {
        id: tempId,
        text: content,
        timestamp: new Date().toISOString(),
        sender: "me",
        status: "sending",
        attachment: attachment
          ? {
              type: attachment.type.startsWith("image/") ? "image" : "file",
              name: attachment.name,
              size: attachment.size,
            }
          : null,
      };

      // Cập nhật UI ngay lập tức với tin nhắn tạm thời
      const updatedConversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, tempMessage],
        lastMessage: {
          text: content || (attachment ? "Sent an attachment" : ""),
          timestamp: new Date().toISOString(),
        },
      };

      const updatedConversations = conversations.map((conv) =>
        conv.id === selectedConversation.id ? updatedConversation : conv
      );

      // Đưa cuộc trò chuyện này lên đầu danh sách
      const reorderedConversations = [
        updatedConversation,
        ...updatedConversations.filter(
          (conv) => conv.id !== selectedConversation.id
        ),
      ];

      setConversations(reorderedConversations);
      setSelectedConversation(updatedConversation);

      // Gửi qua WebSocket nếu có kết nối
      const sentViaWs = WebSocketService.sendMessage(
        selectedConversation.id,
        content,
        attachment
          ? {
              name: attachment.name,
              type: attachment.type,
              size: attachment.size,
            }
          : null
      );

      // Nếu WebSocket không khả dụng, gửi qua API
      let response;
      if (!sentViaWs) {
        response = await ChatService.sendMessage(
          selectedConversation.id,
          content,
          attachment
        );
      } else {
        // Mock response nếu gửi qua WebSocket thành công
        response = {
          id: `server-${Date.now()}`,
          text: content,
          timestamp: new Date().toISOString(),
          sender: "me",
          read: false,
          attachment: attachment
            ? {
                type: attachment.type.startsWith("image/") ? "image" : "file",
                name: attachment.name,
                size: attachment.size,
              }
            : null,
        };
      }

      // Cập nhật tin nhắn với dữ liệu từ server
      const finalMessage = {
        ...response,
        status: "sent",
      };

      // Thay thế tin nhắn tạm thời bằng tin nhắn thực từ server
      const finalConversation = {
        ...updatedConversation,
        messages: updatedConversation.messages.map((msg) =>
          msg.id === tempId ? finalMessage : msg
        ),
      };

      const finalConversations = conversations.map((conv) =>
        conv.id === selectedConversation.id ? finalConversation : conv
      );

      setConversations(finalConversations);
      setSelectedConversation(finalConversation);

      return finalMessage;
    } catch (err) {
      // Đánh dấu tin nhắn là lỗi
      const failedConversation = {
        ...selectedConversation,
        messages: selectedConversation.messages.map((msg) =>
          msg.id === `temp-${Date.now()}` ? { ...msg, status: "failed" } : msg
        ),
      };

      const failedConversations = conversations.map((conv) =>
        conv.id === selectedConversation.id ? failedConversation : conv
      );

      setConversations(failedConversations);
      setSelectedConversation(failedConversation);

      throw err;
    }
  };

  // Tạo cuộc trò chuyện mới
  const createConversation = async (userId) => {
    try {
      const newConversation = await ChatService.createConversation(userId);
      setConversations([newConversation, ...conversations]);
      return newConversation;
    } catch (err) {
      setError("Failed to create conversation");
      throw err;
    }
  };

  // Thêm hàm sendTypingStatus
  const sendTypingStatus = (isTyping) => {
    if (!selectedConversation) return;

    WebSocketService.sendTypingStatus(selectedConversation.id, isTyping);
  };

  // Export các functions và state cần thiết
  const value = {
    conversations,
    selectedConversation,
    loading,
    error,
    unreadCount,
    selectConversation,
    sendMessage,
    createConversation,
    refreshConversations: fetchConversations,
    sendTypingStatus,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
