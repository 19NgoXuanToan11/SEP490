import axios from "axios";

// Bạn sẽ cần thay thế API_URL bằng URL thực của bạn sau khi đã setup backend
const API_URL = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) 
  ? process.env.REACT_APP_API_URL 
  : 'http://localhost:8080/api';

class ChatService {
  // Lấy danh sách cuộc trò chuyện
  async getConversations() {
    try {
      // Đối với môi trường development, có thể sử dụng mock data
      if (process.env.NODE_ENV === "development") {
        return this.getMockConversations();
      }

      const response = await axios.get(`${API_URL}/conversations`);
      return response.data;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  }

  // Lấy tin nhắn của một cuộc trò chuyện
  async getMessages(conversationId, page = 0, size = 20) {
    try {
      // Đối với môi trường development
      if (process.env.NODE_ENV === "development") {
        return this.getMockMessages(conversationId);
      }

      const response = await axios.get(
        `${API_URL}/conversations/${conversationId}/messages?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }

  // Gửi tin nhắn mới
  async sendMessage(conversationId, content, attachment = null) {
    try {
      const formData = new FormData();
      formData.append("content", content);

      if (attachment) {
        formData.append("attachment", attachment);
      }

      const response = await axios.post(
        `${API_URL}/conversations/${conversationId}/messages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  // Cập nhật trạng thái đang nhập
  async updateTypingStatus(conversationId, isTyping) {
    try {
      await axios.post(`${API_URL}/conversations/${conversationId}/typing`, {
        isTyping,
      });
    } catch (error) {
      console.error("Error updating typing status:", error);
    }
  }

  // Đánh dấu tin nhắn đã đọc
  async markMessagesAsRead(conversationId) {
    try {
      await axios.post(`${API_URL}/conversations/${conversationId}/read`);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  }

  // Tạo cuộc trò chuyện mới
  async createConversation(userId) {
    try {
      const response = await axios.post(`${API_URL}/conversations`, {
        userId,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating conversation:", error);
      throw error;
    }
  }

  // Mock data cho development
  getMockConversations() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Sử dụng dữ liệu mock đã có trong file Message.jsx
        const mockConversations = [
          // ... (sử dụng dữ liệu mock từ file Message.jsx)
        ];
        resolve(mockConversations);
      }, 500);
    });
  }

  getMockMessages(conversationId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Tìm conversation theo ID và trả về các tin nhắn
        const mockConversations = this.getMockConversations();
        const conversation = mockConversations.find(
          (c) => c.id === conversationId
        );
        resolve(conversation ? conversation.messages : []);
      }, 300);
    });
  }
}

export default new ChatService();
