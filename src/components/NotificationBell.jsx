import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Bell } from "lucide-react";
import { useNotifications } from "../providers/NotificationProvider";

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

const BellWrapper = styled.div`
  position: relative;
`;

const BellButton = styled.button`
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(229, 231, 235, 0.5);
  }
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 10px;
  height: 10px;
  background: #ef4444;
  border-radius: 50%;
  animation: ${bounce} 1s infinite;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 120%;
  left: 0;
  width: 280px;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1001;
`;

const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const EmptyState = styled.div`
  padding: 1rem;
  font-size: 0.875rem;
  text-align: center;
  color: #9ca3af;
`;

export default function NotificationBell() {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setIsOpen(false);
        markAllAsRead();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        // 열릴 때 읽음 처리
        markAllAsRead();
      }
      return next;
    });
  };

  return (
    <BellWrapper ref={bellRef}>
      <BellButton onClick={toggleDropdown}>
        <Bell size={22} />
        {unreadCount > 0 && <NotificationDot />}
      </BellButton>

      {isOpen && (
        <Dropdown>
          {notifications.length > 0 ? (
            notifications.map((n, idx) => (
              <DropdownItem key={`${n.targetId}-${idx}`}>
                <strong>{n.senderName}</strong>: {n.message}
                <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                  {n.timeAgo}
                </div>
              </DropdownItem>
            ))
          ) : (
            <EmptyState>새로운 알림이 없습니다</EmptyState>
          )}
        </Dropdown>
      )}
    </BellWrapper>
  );
}
