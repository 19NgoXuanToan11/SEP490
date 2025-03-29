class WebSocketService {
  constructor() {
    this.socket = null;
    this.baseUrl = "ws://localhost:8080/ws"; // Default to local development URL
    this.callbacks = {
      message: [],
      typing: [],
      online: [],
      connectionChange: [],
    };
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectTimeout = null;
    this.isConnecting = false;
    this.lastTypingSent = null;
    this.messageQueue = [];
    this.isProcessingQueue = false;
    this.rateLimitMap = new Map(); // Track rate limits for different message types
    this.reconnectStrategy = {
      attempts: 0,
      maxAttempts: 10,
      baseDelay: 1000,
      factor: 1.5, // Exponential backoff factor
    };
  }

  connect(userId, token) {
    if (this.socket?.readyState === WebSocket.OPEN || this.isConnecting)
      return true;

    // During development, you might want to mock/skip WebSocket connection
    if (process.env.NODE_ENV === "development") {
      console.log("Development mode: WebSocket connection simulated");
      this._triggerCallback("connectionChange", true);
      return true;
    }

    this.isConnecting = true;
    const url = `${this.baseUrl}?userId=${userId}&token=${token}`;

    try {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log("WebSocket connection established");
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this._triggerCallback("connectionChange", true);
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case "NEW_MESSAGE":
              this._triggerCallback("message", data.payload);
              break;
            case "TYPING_STATUS":
              this._triggerCallback("typing", data.payload);
              break;
            case "ONLINE_STATUS":
              this._triggerCallback("online", data.payload);
              break;
            default:
              console.warn("Unknown message type:", data.type);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.socket.onclose = (event) => {
        this.isConnecting = false;
        console.log("WebSocket connection closed with code:", event.code);
        this._triggerCallback("connectionChange", false);

        // Thử kết nối lại nếu không phải đóng có chủ đích
        if (
          event.code !== 1000 &&
          this.reconnectAttempts < this.maxReconnectAttempts
        ) {
          this.reconnectTimeout = setTimeout(() => {
            this.reconnectAttempts++;
            this.connect(userId, token);
          }, 2000 * Math.pow(2, this.reconnectAttempts)); // Exponential backoff
        }
      };

      this.socket.onerror = (error) => {
        this.isConnecting = false;
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
      this.isConnecting = false;
      return false;
    }
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.socket) {
      this.socket.close(1000, "User logged out");
      this.socket = null;
    }
  }

  send(type, data) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type,
        payload: data,
      });
      this.socket.send(message);
      return true;
    }

    // For development without a WebSocket server
    if (process.env.NODE_ENV === "development") {
      console.log(`Development mode: Would send ${type} message:`, data);
      return true;
    }

    return false;
  }

  sendMessage(conversationId, message, attachment = null) {
    return this.send("SEND_MESSAGE", {
      conversationId,
      content: message,
      attachment,
    });
  }

  sendTypingStatus(conversationId, isTyping) {
    return this.send("TYPING_STATUS", {
      conversationId,
      isTyping,
    });
  }

  on(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event].push(callback);
    }

    // Return unsubscribe function
    return () => {
      if (this.callbacks[event]) {
        this.callbacks[event] = this.callbacks[event].filter(
          (cb) => cb !== callback
        );
      }
    };
  }

  _triggerCallback(event, data) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach((callback) => callback(data));
    }
  }

  _sendMessage(type, data) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket not connected. Cannot send message.");
      return false;
    }

    // Throttle các message không quan trọng (ví dụ: typing status)
    if (type === "typing") {
      if (this.lastTypingSent && Date.now() - this.lastTypingSent < 500) {
        return false;
      }
      this.lastTypingSent = Date.now();
    }

    try {
      this.socket.send(JSON.stringify({ type, data }));
      return true;
    } catch (error) {
      console.error("Error sending WebSocket message:", error);
      return false;
    }
  }

  // Thêm tin nhắn vào queue
  queueMessage(type, data, priority = 1) {
    this.messageQueue.push({ type, data, priority, timestamp: Date.now() });
    this.messageQueue.sort((a, b) => b.priority - a.priority); // Sort by priority

    if (!this.isProcessingQueue) {
      this.processMessageQueue();
    }

    return true;
  }

  // Xử lý queue tin nhắn
  async processMessageQueue() {
    if (this.messageQueue.length === 0 || this.isProcessingQueue) {
      this.isProcessingQueue = false;
      return;
    }

    this.isProcessingQueue = true;
    const message = this.messageQueue.shift();

    // Kiểm tra rate limit
    const canSend = this._checkRateLimit(message.type);

    if (canSend && this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        await this._sendMessageImmediate(message.type, message.data);
      } catch (error) {
        console.error("Error sending message:", error);

        // Đưa tin nhắn quay lại queue nếu thất bại vì lý do kết nối
        if (error.name === "NetworkError") {
          this.messageQueue.unshift(message);
        }
      }
    } else if (!canSend) {
      // Đợi một chút rồi thêm lại tin nhắn vào queue
      setTimeout(() => {
        this.messageQueue.push(message);
      }, 500);
    }

    // Xử lý tin nhắn tiếp theo
    setTimeout(() => {
      this.isProcessingQueue = false;
      this.processMessageQueue();
    }, 50);
  }

  _checkRateLimit(type) {
    const now = Date.now();
    const limits = {
      typing: { interval: 500, count: 1 },
      message: { interval: 200, count: 5 },
      default: { interval: 100, count: 10 },
    };

    const limit = limits[type] || limits.default;
    const key = `${type}_${Math.floor(now / limit.interval)}`;

    const current = this.rateLimitMap.get(key) || 0;
    if (current >= limit.count) {
      return false;
    }

    this.rateLimitMap.set(key, current + 1);
    return true;
  }

  _sendMessageImmediate(type, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        reject(new Error("WebSocket not connected"));
        return;
      }

      try {
        this.socket.send(JSON.stringify({ type, data }));
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new WebSocketService();
