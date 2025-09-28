import React, { useState, useRef, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  Send,
  MoreVertical,
  Smile,
  Paperclip,
  Search,
  Archive,
  Star,
  MessageCircle,
  Plus,
  AlertCircle,
} from "lucide-react";
import { chatService } from "../../lib/api/chat-service";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [directChats, setDirectChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  const [searchParams] = useSearchParams();
  const roomIdFromUrl = searchParams.get("roomId");
  // const targetMemberIdFromUrl = searchParams.get("to");

  // 에러 표시 컴포넌트
  const ErrorMessage = ({ error, onClose }) => {
    if (!error) return null;

    return (
      <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
        <div className="flex items-start gap-2">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-2 hover:bg-red-600 rounded p-1 flex-shrink-0"
          >
            ×
          </button>
        </div>
      </div>
    );
  };

  // 디버깅용 정보 표시 (개발 환경에서만)
  const DebugInfo = ({ selectedChat }) => {
    if (!selectedChat || process.env.NODE_ENV === "production") return null;
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadChatRooms();
  }, [roomIdFromUrl]);

  // // TeamFinder에서 전달받은 state 처리
  // useEffect(() => {
  //   const locationState = location?.state;
  //   if (locationState?.justCreated && locationState?.targetMemberId) {
  //     console.log("새로 생성된 채팅방 정보:", locationState);

  //     const selectNewChat = async () => {
  //       try {
  //         await loadChatRooms();

  //         setTimeout(() => {
  //           setDirectChats((prevChats) => {
  //             const targetChat = prevChats.find(
  //               (chat) =>
  //                 chat.receiverId === locationState.targetMemberId ||
  //                 chat.name === locationState.targetMemberName
  //             );

  //             if (targetChat) {
  //               console.log("타겟 채팅방 찾음:", targetChat);
  //               setSelectedChat(targetChat);
  //             } else {
  //               console.log(
  //                 "타겟 채팅방을 찾을 수 없음. 사용 가능한 채팅방:",
  //                 prevChats
  //               );
  //             }

  //             return prevChats;
  //           });
  //         }, 500);
  //       } catch (error) {
  //         console.error("새 채팅방 선택 중 오류:", error);
  //       }
  //     };

  //     selectNewChat();
  //   }
  // }, [location?.state]);

  // 선택된 채팅방 메시지 로드
  useEffect(() => {
    if (selectedChat) {
      loadChatMessages(selectedChat.id);
    }
  }, [selectedChat]);

  // 채팅방 목록 로드
  const loadChatRooms = async () => {
    try {
      setLoading(true);
      const response = await chatService.getChatRooms();

      console.log("채팅방 목록 원본 응답:", response);

      // API 응답을 UI에 맞는 형태로 변환
      const formattedChats = response.chatRoomList.map((room) => {
        console.log("개별 채팅방 데이터:", room);

        return {
          id: room.roomId,
          name: room.opponentName,
          role: room.opponentImage || "사용자",
          lastMessage: room.lastMessage,
          time: formatTime(room.lastMessageTime),
          avatar: room.opponentName ? room.opponentName[0] : "?",
          online: false,
          unread: room.unreadCount,
          tags: [],
          pinned: false,
          // receiverId 처리 개선 - 여러 필드 확인
          receiverId:
            room.receiverId || room.opponentId || room.userId || room.memberId,
        };
      });

      console.log("포맷된 채팅방 목록:", formattedChats);

      setDirectChats(formattedChats);

      if (roomIdFromUrl) {
        const targetChat = formattedChats.find(
          (c) => String(c.id) === String(roomIdFromUrl)
        );
        if (targetChat) {
          setSelectedChat(targetChat);
        } else {
          console.warn("URL roomId와 일치하는 채팅방을 찾을 수 없음");
        }
      } else if (formattedChats.length > 0) {
        // URL 파라미터 없으면 첫 번째 채팅방 자동 선택
        setSelectedChat(formattedChats[0]);
      }
    } catch (error) {
      console.error("채팅방 목록 로드 실패:", error);
      setError("채팅방 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const loadChatMessages = async (roomId) => {
    try {
      console.log("메시지 로드 시작:", roomId);

      const response = await chatService.getChatMessages(roomId);
      console.log("메시지 로드 응답:", response);

      if (!Array.isArray(response)) {
        console.error("메시지 응답이 배열이 아님:", response);
        setMessages([]);
        return;
      }

      const formattedMessages = response.map((msg) => ({
        id: msg.messageId,
        sender: msg.isMine ? "나" : selectedChat?.name || "상대방",
        text: msg.message,
        time: formatTime(msg.createdAt),
        isMe: msg.isMine,
        avatar: msg.isMine ? "나" : selectedChat?.name[0] || "?",
        isRead: msg.isRead,
      }));

      setMessages(formattedMessages);
      scrollToBottom();

      // 읽음 처리는 별도로 처리 (실패해도 메시지 표시에는 영향 없긔)
      if (roomId) {
        markRoomAsReadSafely(roomId);
      }
    } catch (error) {
      console.error("메시지 로드 실패:", error);
      setError(
        "메시지를 불러오는데 실패했습니다: " +
          (error.message || "알 수 없는 오류")
      );
      setMessages([]);
    }
  };

  // 읽음 처리를 안전하게 수행하는 개선된 함수
  const markRoomAsReadSafely = async (roomId) => {
    try {
      console.log("읽음 처리 시도:", roomId);
      await chatService.markRoomAsRead(roomId);
      console.log("읽음 처리 완료:", roomId);
    } catch (error) {
      console.warn("읽음 처리 실패 (무시됨):", error);

      if (error.status === 404) {
        console.warn("읽음 처리 API가 존재하지 않습니다:");
        console.warn("- 시도된 경로: /chat/room/" + roomId + "/read");
        console.warn("- 서버에서 해당 API를 구현했는지 확인 필요");
      } else if (error.status === 405) {
        console.warn(
          "HTTP 메소드가 허용되지 않음. PATCH 대신 POST나 PUT 시도 필요"
        );
      }
    }
  };

  // 시간 포맷팅 함수
  const formatTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return `${diffDays}일 전`;
    }

    return date.toLocaleTimeString("ko-KR", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Pin 토글 함수
  const togglePin = (chatId, e) => {
    e.stopPropagation();

    setDirectChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
      )
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지 전송 - receiverId 검증 강화
  const sendMessage = async () => {
    if (!message.trim() || !selectedChat || sendingMessage) return;

    const messageToSend = message.trim();
    let tempMessage = null;

    try {
      setSendingMessage(true);

      // receiverId 검증 강화
      console.log("selectedChat 전체:", selectedChat);
      console.log("selectedChat.receiverId:", selectedChat.receiverId);

      if (!selectedChat.receiverId) {
        throw new Error("수신자 정보가 없습니다. 채팅방을 다시 선택해주세요.");
      }

      // 임시 메시지 생성
      tempMessage = {
        id: `temp_${Date.now()}_${Math.random()}`,
        sender: "나",
        text: messageToSend,
        time: new Date().toLocaleTimeString("ko-KR", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        isMe: true,
        avatar: "나",
        sending: true,
      };

      setMessages((prev) => [...prev, tempMessage]);
      setMessage("");

      console.log("메시지 전송 시작:", {
        receiverId: selectedChat.receiverId,
        receiverName: selectedChat.name,
        message: messageToSend,
        messageLength: messageToSend.length,
        selectedChatId: selectedChat.id,
      });

      // 실제 API 호출
      const response = await chatService.sendMessage(
        selectedChat.receiverId,
        messageToSend
      );
      console.log("메시지 전송 응답:", response);

      // 성공 시 임시 메시지를 실제 응답으로 교체
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id
            ? {
                id: response.messageId || response.id || `real_${Date.now()}`,
                sender: "나",
                text: response.message || messageToSend,
                time: response.createdAt
                  ? formatTime(response.createdAt)
                  : tempMessage.time,
                isMe: true,
                avatar: "나",
                isRead: response.isRead || false,
              }
            : msg
        )
      );

      // 채팅방 목록 업데이트
      setDirectChats((prev) =>
        prev.map((chat) =>
          chat.id === selectedChat.id
            ? {
                ...chat,
                lastMessage: messageToSend,
                time: "방금",
                unread: 0,
              }
            : chat
        )
      );

      // setError(null);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      setError("메시지 전송 실패: " + (error.message || "알 수 없는 오류"));

      // let errorMessage = "메시지 전송에 실패했습니다.";

      // if (!selectedChat.receiverId) {
      //   errorMessage =
      //     "수신자 정보가 없습니다. 페이지를 새로고침하고 다시 시도해주세요.";
      // } else if (error.status === 500) {
      //   errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      // } else if (error.status === 401 || error.status === 403) {
      //   errorMessage = "인증이 만료되었습니다. 다시 로그인해주세요.";
      // } else if (error.status === 404) {
      //   errorMessage = "채팅 상대를 찾을 수 없습니다.";
      // } else if (error.status === 400) {
      //   errorMessage = "잘못된 요청입니다. 메시지를 확인해주세요.";
      // } else if (error.message && error.message !== "Internal Server Error") {
      //   errorMessage = error.message;
      // }

      // setError(errorMessage);

      if (tempMessage) {
        setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
      }

      setMessage(messageToSend);

      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!sendingMessage) {
        sendMessage();
      }
    }
  };

  // selectChat 함수 - receiverId 검증 추가
  const selectChat = async (chat) => {
    console.log("채팅방 선택:", chat);

    if (!chat.receiverId) {
      console.error("receiverId가 없는 채팅방:", chat);
      setError("이 채팅방에 문제가 있습니다. 페이지를 새로고침해주세요.");
      return;
    }

    setSelectedChat(chat);

    // 선택된 채팅방의 안읽은 메시지를 0으로 업데이트
    setDirectChats((prev) =>
      prev.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c))
    );
  };

  const filteredChats = directChats
    .filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .sort((a, b) => {
      // Pin된 항목을 먼저 정렬
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

  if (loading) {
    return (
      <div className="h-[calc(100vh-4rem)] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">채팅을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error && directChats.length === 0) {
    return (
      <div className="h-[calc(100vh-4rem)] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadChatRooms}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-100 flex overflow-hidden">
      {/* 채팅방 목록 */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 px-4 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageCircle size={16} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Chat</h1>
          </div>
        </div>

        <div className="p-4 space-y-3 border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="사람 검색..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredChats.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageCircle size={32} className="mx-auto mb-4 opacity-50" />
              <p>채팅방이 없습니다</p>
            </div>
          ) : (
            filteredChats.map((chat, index) => (
              <div
                key={chat.id}
                onClick={() => selectChat(chat)}
                className={`
                  px-4 py-3 cursor-pointer transition-all hover:bg-gray-50 relative group
                  ${
                    selectedChat?.id === chat.id
                      ? "bg-blue-50 border-r-4 border-blue-500"
                      : ""
                  }
                  ${
                    index !== filteredChats.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }
                `}
              >
                {chat.pinned && (
                  <button
                    onClick={(e) => togglePin(chat.id, e)}
                    className="absolute top-1 right-1 p-0.5 hover:bg-gray-200 rounded-full transition-all opacity-100 z-10"
                  >
                    <Star
                      size={10}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  </button>
                )}
                {!chat.pinned && (
                  <button
                    onClick={(e) => togglePin(chat.id, e)}
                    className="absolute top-1 right-1 p-0.5 hover:bg-gray-200 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                  >
                    <Star
                      size={10}
                      className="text-gray-400 hover:text-yellow-500"
                    />
                  </button>
                )}

                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-semibold text-gray-900 truncate text-sm">
                        {chat.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {chat.time}
                        </span>
                        {chat.unread > 0 && (
                          <div className="min-w-[16px] h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1 font-medium">
                            {chat.unread > 99 ? "99+" : chat.unread}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mb-1.5 truncate">
                      {chat.role}
                    </p>
                    <p className="text-sm text-gray-600 truncate leading-tight">
                      {chat.lastMessage}
                    </p>

                    {chat.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {chat.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                        {chat.tags.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{chat.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 채팅 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        {selectedChat ? (
          <>
            <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {selectedChat.avatar}
                  </div>
                  {selectedChat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    {selectedChat.name}
                  </h2>
                  <div className="flex items-center gap-3">
                    <p
                      className={`text-sm font-medium ${
                        selectedChat.online ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {selectedChat.online
                        ? "온라인"
                        : `마지막 접속: ${selectedChat.time}`}
                    </p>
                    {selectedChat.tags.length > 0 && (
                      <div className="flex gap-1">
                        {selectedChat.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all group">
                  <Archive
                    size={18}
                    className="text-gray-600 group-hover:text-blue-600"
                  />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all group">
                  <MoreVertical
                    size={18}
                    className="text-gray-600 group-hover:text-blue-600"
                  />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white min-h-0">
              {messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MessageCircle
                      size={48}
                      className="mx-auto mb-4 opacity-50"
                    />
                    <p>대화를 시작해보세요!</p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-2xl ${
                        msg.isMe ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {!msg.isMe && (
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {msg.avatar}
                        </div>
                      )}

                      <div className="flex flex-col">
                        <div
                          className={`
                            px-4 py-3 rounded-2xl shadow-sm border transition-all hover:shadow-md
                            ${
                              msg.isMe
                                ? "bg-blue-500 text-white rounded-br-md border-blue-500"
                                : "bg-gray-100 text-gray-800 rounded-bl-md border-gray-200"
                            }
                            ${msg.sending ? "opacity-70" : ""}
                          `}
                        >
                          <p className="leading-relaxed">{msg.text}</p>
                          {msg.sending && (
                            <div className="flex items-center gap-1 mt-1">
                              <div className="w-2 h-2 bg-white opacity-60 rounded-full animate-pulse"></div>
                              <span className="text-xs opacity-60">
                                전송 중...
                              </span>
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-xs text-gray-500 mt-1.5 ${
                            msg.isMe ? "text-right" : "text-left"
                          }`}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0">
              <div className="flex items-end gap-3">
                <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all group flex-shrink-0">
                  <Paperclip
                    size={18}
                    className="text-gray-500 group-hover:text-blue-600"
                  />
                </button>

                <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 py-2.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 bg-transparent border-none outline-none resize-none max-h-24 min-h-[1.5rem] leading-relaxed"
                    rows="1"
                    disabled={sendingMessage}
                  />
                  <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-all ml-2 group">
                    <Smile
                      size={16}
                      className="text-gray-500 group-hover:text-blue-600"
                    />
                  </button>
                </div>

                <button
                  onClick={sendMessage}
                  disabled={!message.trim() || sendingMessage}
                  className={`
                    p-3 rounded-xl transition-all transform hover:scale-105 flex-shrink-0 shadow-sm
                    ${
                      message.trim() && !sendingMessage
                        ? "bg-blue-600 text-white hover:shadow-md hover:bg-blue-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  {sendingMessage ? (
                    <div className="w-[18px] h-[18px] border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center text-gray-500">
              <MessageCircle size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">채팅방을 선택하세요</p>
              <p className="text-sm">
                왼쪽에서 대화를 시작할 사람을 선택해보세요
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 에러 메시지 표시 */}
      <ErrorMessage error={error} onClose={() => setError(null)} />

      {/* 디버깅 정보 (개발용) */}
      <DebugInfo selectedChat={selectedChat} />
    </div>
  );
};

export default ChatInterface;
