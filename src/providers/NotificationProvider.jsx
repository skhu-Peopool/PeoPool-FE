import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { connectSSE } from "../lib/sse/sse-client";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const { user, accessToken } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user || !accessToken) return;

    const eventSource = connectSSE(accessToken, (data) => {
      setNotifications((prev) => {
        // 배열(initial)로 들어온 경우
        if (Array.isArray(data)) {
          const merged = [...data, ...prev];
          return dedupeNotifications(merged);
        }

        // 단일 알림
        return dedupeNotifications([data, ...prev]);
      });

      // unreadCount 갱신
      if (Array.isArray(data)) {
        setUnreadCount((prev) => prev + data.length);
      } else {
        setUnreadCount((prev) => prev + 1);
      }
    });

    return () => {
      eventSource.close();
    };
  }, [user, accessToken]);

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// targetId + actionType 조합으로 중복 제거
function dedupeNotifications(list) {
  const seen = new Set();
  return list.filter((n) => {
    const key = `${n.targetId}-${n.actionType}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
