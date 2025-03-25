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
}

export default new WebSocketService();
