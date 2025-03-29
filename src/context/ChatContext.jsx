import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import ChatService from "../services/ChatService";
import WebSocketService from "../services/WebSocketService";

// Tạo context
const ChatContext = createContext();

// Hook để sử dụng context
export const useChat = () => useContext(ChatContext);

// Provider component
export const ChatProvider = ({ children }) => {
  const [conversationsMap, setConversationsMap] = useState({});
  const [conversationIds, setConversationIds] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  // Tạo danh sách cuộc trò chuyện từ map và ids
  const conversations = useMemo(() => {
    return conversationIds.map((id) => conversationsMap[id]);
  }, [conversationIds, conversationsMap]);

  // Lấy cuộc trò chuyện được chọn từ id
  const selectedConversation = useMemo(() => {
    return selectedConversationId
      ? conversationsMap[selectedConversationId]
      : null;
  }, [selectedConversationId, conversationsMap]);

  // Tối ưu việc cập nhật cuộc trò chuyện
  const updateConversation = useCallback((conversationId, updater) => {
    setConversationsMap((prev) => {
      const conversation = prev[conversationId];
      if (!conversation) return prev;

      return {
        ...prev,
        [conversationId]: updater(conversation),
      };
    });
  }, []);

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
      setConversationsMap(
        data.reduce((acc, conv) => {
          acc[conv.id] = conv;
          return acc;
        }, {})
      );
      setConversationIds(Object.keys(data));
      setLoading(false);
    } catch (err) {
      setError("Failed to load conversations");
      setLoading(false);
    }
  };

  // Chọn một cuộc trò chuyện
  const selectConversation = async (conversation) => {
    setSelectedConversationId(conversation.id);

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

      setConversationsMap((prev) => ({
        ...prev,
        [conversation.id]: { ...conversation, messages: updatedMessages },
      }));
    }
  };

  // Xử lý tin nhắn mới từ WebSocket với hiệu suất tốt hơn
  const handleNewMessage = useCallback(
    (data) => {
      const { conversationId, message } = data;

      updateConversation(conversationId, (conversation) => {
        // Kiểm tra tin nhắn đã tồn tại chưa để tránh trùng lặp
        const messageExists = conversation.messages.some(
          (msg) => msg.id === message.id
        );

        if (messageExists) {
          return conversation;
        }

        // Xác định xem tin nhắn đã đọc chưa (đã đọc nếu cuộc trò chuyện đang được chọn)
        const isRead = selectedConversationId === conversationId;
        const newMessage = { ...message, read: isRead };

        return {
          ...conversation,
          messages: [...conversation.messages, newMessage],
          lastMessage: newMessage,
          unreadCount: isRead ? 0 : conversation.unreadCount + 1,
        };
      });
    },
    [selectedConversationId, updateConversation]
  );

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

    setConversationsMap((prev) => ({
      ...prev,
      [conversationId]: { ...conversationsMap[conversationId], isTyping },
    }));

    // Cập nhật selectedConversation nếu người dùng đang xem cuộc trò chuyện này
    if (selectedConversation?.id === conversationId) {
      const updatedSelectedConversation = updatedConversations.find(
        (conv) => conv.id === conversationId
      );
      setConversationsMap((prev) => ({
        ...prev,
        [conversationId]: updatedSelectedConversation,
      }));
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

    setConversationsMap((prev) => ({
      ...prev,
      ...updatedConversations.reduce((acc, conv) => {
        acc[conv.id] = conv;
        return acc;
      }, {}),
    }));

    // Cập nhật selectedConversation nếu người dùng đang xem cuộc trò chuyện với người này
    if (selectedConversation?.user.id === userId) {
      const updatedSelectedConversation = updatedConversations.find(
        (conv) => conv.user.id === userId
      );
      setConversationsMap((prev) => ({
        ...prev,
        [selectedConversation.id]: updatedSelectedConversation,
      }));
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

      setConversationsMap((prev) => ({
        ...prev,
        [selectedConversation.id]: updatedConversation,
      }));

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

      setConversationsMap((prev) => ({
        ...prev,
        [selectedConversation.id]: finalConversation,
      }));

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

      setConversationsMap((prev) => ({
        ...prev,
        [selectedConversation.id]: failedConversation,
      }));

      throw err;
    }
  };

  // Tạo cuộc trò chuyện mới
  const createConversation = async (userId) => {
    try {
      const newConversation = await ChatService.createConversation(userId);
      setConversationsMap((prev) => ({
        ...prev,
        [newConversation.id]: newConversation,
      }));
      setConversationIds((prev) => [...prev, newConversation.id]);
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
