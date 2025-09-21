import React, { useState, useRef, useEffect } from "react";
import { Send, Users, MoreVertical, Smile, Paperclip, Search, Settings, Archive, Star, Bell, MessageCircle, UserPlus } from "lucide-react";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState("자은우");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("direct"); 
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "자은우",
      text: "안녕하세요! 토익 스터디 관련해서 연락드렸어요 😊",
      time: "오후 2:30",
      isMe: false,
      avatar: "자"
    },
    {
      id: 2,
      sender: "나",
      text: "안녕하세요! 토익 스터디 관심있어요. 어떤 방식으로 진행하시나요?",
      time: "오후 2:35",
      isMe: true,
      avatar: "나"
    },
    {
      id: 3,
      sender: "자은우",
      text: "매주 화요일, 목요일 저녁 7시에 온라인으로 진행하고 있어요. LC, RC 번갈아가며 문제 풀고 리뷰하는 방식입니다!",
      time: "오후 2:36",
      isMe: false,
      avatar: "자"
    },
    {
      id: 4,
      sender: "나",
      text: "좋네요! 참여하고 싶어요. 현재 몇 명 정도 참여하고 계신가요?",
      time: "오후 2:40",
      isMe: true,
      avatar: "나"
    }
  ]);

  const [directChats, setDirectChats] = useState([
    {
      id: 1,
      name: "자은우",
      role: "대학 3년차 · 토익 스터디",
      lastMessage: "좋네요! 참여하고 싶어요. 현재 몇 명 정도 참여하고 계신가요?",
      time: "오후 2:40",
      avatar: "자",
      online: true,
      unread: 0,
      tags: ["토익", "스터디"],
      pinned: true,
      type: "direct"
    },
    {
      id: 2,
      name: "Grute",
      role: "프로젝트 매니저",
      lastMessage: "프로젝트 아이디어 어떠세요? 이번 주말에 회의 가능하신가요?",
      time: "오후 1:15",
      avatar: "G",
      online: false,
      unread: 3,
      tags: ["프로젝트"],
      pinned: false,
      type: "direct"
    },
    {
      id: 3,
      name: "김민지",
      role: "프론트엔드 개발자",
      lastMessage: "React 스터디 관련해서 문의드려요. 다음 주 진도는 어떻게 될까요?",
      time: "오전 11:30",
      avatar: "김",
      online: true,
      unread: 1,
      tags: ["React", "개발"],
      pinned: false,
      type: "direct"
    },
    {
      id: 4,
      name: "박서준",
      role: "UI/UX 디자이너",
      lastMessage: "새로운 디자인 시안 완성했어요! 피드백 부탁드립니다",
      time: "어제",
      avatar: "박",
      online: false,
      unread: 2,
      tags: ["디자인", "UI"],
      pinned: false,
      type: "direct"
    }
  ]);

  const [teamChats, setTeamChats] = useState([
    {
      id: 101,
      name: "토익 스터디팀",
      role: "5명 · 스터디 그룹",
      lastMessage: "다음 주 모의고사 일정 공지드립니다",
      time: "오후 3:20",
      avatar: "토",
      online: true,
      unread: 2,
      tags: ["토익", "스터디"],
      pinned: true,
      type: "team",
      memberCount: 5
    },
    {
      id: 102,
      name: "개발 프로젝트팀",
      role: "8명 · 개발팀",
      lastMessage: "김민지: API 연동 완료했습니다!",
      time: "오후 1:45",
      avatar: "개",
      online: true,
      unread: 12,
      tags: ["개발", "프로젝트"],
      pinned: false,
      type: "team",
      memberCount: 8
    },
    {
      id: 103,
      name: "디자인팀",
      role: "4명 · 디자인팀",
      lastMessage: "박서준: 새로운 컬러 팔레트 어떠세요?",
      time: "오전 11:15",
      avatar: "디",
      online: false,
      unread: 0,
      tags: ["디자인", "UI"],
      pinned: false,
      type: "team",
      memberCount: 4
    },
    {
      id: 104,
      name: "마케팅팀",
      role: "6명 · 마케팅팀",
      lastMessage: "이지혜: 이번 달 성과 보고서 공유합니다",
      time: "어제",
      avatar: "마",
      online: true,
      unread: 3,
      tags: ["마케팅"],
      pinned: false,
      type: "team",
      memberCount: 6
    },
    {
      id: 105,
      name: "전체팀",
      role: "25명 · 전체 공지",
      lastMessage: "관리자: 다음 주 정기 미팅 일정 안내",
      time: "2일 전",
      avatar: "전",
      online: true,
      unread: 0,
      tags: ["공지"],
      pinned: false,
      type: "team",
      memberCount: 25
    }
  ]);
  
  const messagesEndRef = useRef(null);

  // Pin 토글 함수
  const togglePin = (chatId, chatType, e) => {
    e.stopPropagation(); // 채팅 선택 이벤트와 충돌 방지
    
    if (chatType === 'direct') {
      setDirectChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
      ));
    } else {
      setTeamChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
      ));
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "나",
        text: message,
        time: new Date().toLocaleTimeString('ko-KR', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        isMe: true,
        avatar: "나"
      };
      
      setMessages([...messages, newMessage]);
      setMessage("");

      setTimeout(() => {
        const responses = [
          "현재 5명 정도 함께하고 있어요! 다음 주 화요일부터 함께하시면 될 것 같아요 👍",
          "네, 좋아요! 오픈채팅으로 초대해드릴게요",
          "스터디 자료는 구글 드라이브로 공유하고 있어요",
          "언제든지 궁금한 점 있으면 연락주세요!",
          "감사합니다! 함께 열심히 해보아요 😊"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const autoReply = {
          id: messages.length + 2,
          sender: selectedChat,
          text: randomResponse,
          time: new Date().toLocaleTimeString('ko-KR', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }),
          isMe: false,
          avatar: selectedChat[0]
        };
        setMessages(prev => [...prev, autoReply]);
      }, 1200);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const selectChat = (chatName) => {
    setSelectedChat(chatName);
  };

  const currentChats = activeTab === 'direct' ? directChats : teamChats;
  const filteredChats = currentChats
    .filter(chat =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      // Pin된 항목을 먼저 정렬
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

  const selectedChatInfo = [...directChats, ...teamChats].find(chat => chat.name === selectedChat) || directChats[0];

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-100 flex overflow-hidden">
      
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        
        <div className="h-16 px-4 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageCircle size={16} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Chat</h1>
          </div>
        </div>

        <div className="px-4 pt-4 flex-shrink-0">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('direct')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                activeTab === 'direct' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageCircle size={16} />
              개인 채팅
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                activeTab === 'team' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users size={16} />
              팀 채팅
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3 border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`${activeTab === 'direct' ? '사람' : '팀'} 검색...`}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-sm">
            {activeTab === 'direct' ? <MessageCircle size={16} /> : <UserPlus size={16} />}
            {activeTab === 'direct' ? '새 채팅 시작' : '새 팀 만들기'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredChats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => selectChat(chat.name)}
              className={`
                px-4 py-3 cursor-pointer transition-all hover:bg-gray-50 relative group
                ${selectedChat === chat.name ? 'bg-blue-50 border-r-4 border-blue-500' : ''}
                ${index !== filteredChats.length - 1 ? 'border-b border-gray-100' : ''}
              `}
            >
              {chat.pinned && (
                <button 
                  onClick={(e) => togglePin(chat.id, chat.type, e)}
                  className="absolute top-1 right-1 p-0.5 hover:bg-gray-200 rounded-full transition-all opacity-100 z-10"
                >
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                </button>
              )}
              {!chat.pinned && (
                <button 
                  onClick={(e) => togglePin(chat.id, chat.type, e)}
                  className="absolute top-1 right-1 p-0.5 hover:bg-gray-200 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <Star size={10} className="text-gray-400 hover:text-yellow-500" />
                </button>
              )}
              
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <div className={`w-11 h-11 ${chat.type === 'team' ? 'bg-purple-500' : 'bg-blue-500'} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                  {chat.type === 'team' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-700 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {chat.memberCount}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="font-semibold text-gray-900 truncate text-sm">{chat.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{chat.time}</span>
                      {chat.unread > 0 && (
                        <div className="min-w-[16px] h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1 font-medium">
                          {chat.unread > 99 ? '99+' : chat.unread}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-1.5 truncate">{chat.role}</p>
                  <p className="text-sm text-gray-600 truncate leading-tight">{chat.lastMessage}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {chat.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`inline-block px-1.5 py-0.5 ${chat.type === 'team' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'} text-xs rounded font-medium`}
                      >
                        #{tag}
                      </span>
                    ))}
                    {chat.tags.length > 2 && (
                      <span className="text-xs text-gray-400">+{chat.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                나
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">내 프로필</p>
              <p className="text-xs text-green-600">온라인</p>
            </div>
            <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-all">
              <MoreVertical size={14} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        
        <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`w-10 h-10 ${selectedChatInfo.type === 'team' ? 'bg-purple-500' : 'bg-blue-500'} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                {selectedChatInfo.avatar}
              </div>
              {selectedChatInfo.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
              {selectedChatInfo.type === 'team' && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-700 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {selectedChatInfo.memberCount}
                </div>
              )}
            </div>
            
            <div>
              <h2 className="font-bold text-gray-900">{selectedChat}</h2>
              <div className="flex items-center gap-3">
                <p className={`text-sm font-medium ${selectedChatInfo.online ? 'text-green-600' : 'text-gray-500'}`}>
                  {selectedChatInfo.type === 'team' ? 
                    `${selectedChatInfo.memberCount}명 참여` : 
                    (selectedChatInfo.online ? '온라인' : `마지막 접속: ${selectedChatInfo.time}`)
                  }
                </p>
                <div className="flex gap-1">
                  {selectedChatInfo.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className={`px-1.5 py-0.5 ${selectedChatInfo.type === 'team' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'} text-xs rounded font-medium`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedChatInfo.type === 'team' && (
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all group">
                <Users size={18} className="text-gray-600 group-hover:text-purple-600" />
              </button>
            )}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all group">
              <Archive size={18} className="text-gray-600 group-hover:text-blue-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all group">
              <MoreVertical size={18} className="text-gray-600 group-hover:text-blue-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white min-h-0">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-2xl ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                {!msg.isMe && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {msg.avatar}
                  </div>
                )}
                
                <div className="flex flex-col">
                  <div
                    className={`
                      px-4 py-3 rounded-2xl shadow-sm border transition-all hover:shadow-md
                      ${msg.isMe 
                        ? 'bg-blue-500 text-white rounded-br-md border-blue-500' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-md border-gray-200'
                      }
                    `}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <span className={`text-xs text-gray-500 mt-1.5 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-end gap-3">
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all group flex-shrink-0">
              <Paperclip size={18} className="text-gray-500 group-hover:text-blue-600" />
            </button>
            
            <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 py-2.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="flex-1 bg-transparent border-none outline-none resize-none max-h-24 min-h-[1.5rem] leading-relaxed"
                rows="1"
              />
              <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-all ml-2 group">
                <Smile size={16} className="text-gray-500 group-hover:text-blue-600" />
              </button>
            </div>
            
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className={`
                p-3 rounded-xl transition-all transform hover:scale-105 flex-shrink-0 shadow-sm
                ${message.trim() 
                  ? 'bg-blue-600 text-white hover:shadow-md hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;