import { defaultFetch, tokenFetch } from "./axios-client";

export const chatService = {
  // 내 채팅방 목록 조회
  getChatRooms: async () => {
    console.log("getChatRooms 호출 시작");
    try {
      const result = await tokenFetch("/chat/my", {
        method: "GET",
      });
      console.log("getChatRooms 성공:", result);
      return result;
    } catch (error) {
      console.error("getChatRooms 에러:", error);
      console.error("에러 상세:", {
        status: error.status,
        message: error.message,
        response: error.response,
      });
      throw error;
    }
  },

  // 특정 채팅방의 메시지 내역 조회
  getChatMessages: async (roomId) => {
    console.log("getChatMessages 호출:", roomId);
    try {
      const result = await tokenFetch(`/chat/chatroom/${roomId}`, {
        method: "GET",
      });
      console.log("getChatMessages 성공:", result);
      return result;
    } catch (error) {
      console.error("getChatMessages 에러:", error);
      throw error;
    }
  },

  // 메시지 전송
  sendMessage: async (receiverId, message) => {
    console.log("sendMessage 호출:", { receiverId, message });
    try {
      const result = await tokenFetch("/chat/send", null, {
        method: "POST",
        body: {
          receiverId,
          message,
        },
      });
      console.log("sendMessage 성공:", result);
      return result;
    } catch (error) {
      console.error("sendMessage 에러:", error);
      throw error;
    }
  },

  startChatWithMessage: async (receiverId, message = "안녕하세요! 👋") => {
    try {
      console.log("startChatWithMessage 호출:", { receiverId, message });

      const numericReceiverId = parseInt(receiverId);
      if (isNaN(numericReceiverId)) {
        throw new Error("잘못된 사용자 ID입니다.");
      }
      const response = await tokenFetch("/chat/send", null, {
        method: "POST",
        body: {
          receiverId: numericReceiverId,
          message: message,
        },
      });

      console.log("메시지 전송 성공:", response);
      return response;
    } catch (error) {
      console.error("startChatWithMessage 에러:", error);

      // 상세한 에러 메시지 제공
      if (error.status === 401 || error.status === 403) {
        throw new Error("로그인이 필요합니다. 다시 로그인해주세요.");
      }
      if (error.status === 405) {
        throw new Error("채팅 서비스가 일시적으로 사용할 수 없습니다.");
      }
      if (error.status === 404) {
        throw new Error("상대방을 찾을 수 없습니다.");
      }

      throw error;
    }
  },

  // 메시지 읽음 처리
  markMessageAsRead: async (messageId) => {
    try {
      const result = await tokenFetch(`/chat/read/${messageId}`, null, {
        method: "PATCH",
      });
      return result;
    } catch (error) {
      console.error("markMessageAsRead 에러:", error);
      throw error;
    }
  },

  // 채팅방의 모든 메시지 읽음 처리
  markRoomAsRead: async (roomId) => {
    try {
      const result = await tokenFetch(`/chat/chatroom/${roomId}`, {
        method: "PATCH",
      });
      return result;
    } catch (error) {
      console.error("markRoomAsRead 에러:", error);
      throw error;
    }
  },

  // 안읽은 메시지 개수 조회
  getUnreadCount: async () => {
    try {
      const result = await tokenFetch("/chat/unread-count", {
        method: "GET",
      });
      return result;
    } catch (error) {
      console.error("getUnreadCount 에러:", error);
      throw error;
    }
  },

  // 채팅방 나가기
  leaveChatRoom: async (roomId) => {
    try {
      const result = await tokenFetch(`/chat/room/${roomId}/leave`, null, {
        method: "DELETE",
      });
      return result;
    } catch (error) {
      console.error("leaveChatRoom 에러:", error);
      throw error;
    }
  },

  // 메시지 검색
  searchMessages: async (roomId, keyword) => {
    try {
      const result = await tokenFetch(`/chat/chatroom/${roomId}/search`, {
        method: "GET",
        params: { keyword },
      });
      return result;
    } catch (error) {
      console.error("searchMessages 에러:", error);
      throw error;
    }
  },

  // 채팅방 정보 조회
  getChatRoomInfo: async (roomId) => {
    try {
      const result = await tokenFetch(`/chat/room/${roomId}`, {
        method: "GET",
      });
      return result;
    } catch (error) {
      console.error("getChatRoomInfo 에러:", error);
      throw error;
    }
  },
};
