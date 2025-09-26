import { EventSourcePolyfill } from "event-source-polyfill";

const baseURL = import.meta.env.VITE_API_URL;

export function connectSSE(AccessToken, onMessage) {
  const eventSource = new EventSourcePolyfill(
    `${baseURL}/notification/subscribe`,
    {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
      withCredentials: true,
    }
  );

  // 단일 이벤트 (실시간 알림)
  ["enrollment", "chat", "system"].forEach((evt) => {
    eventSource.addEventListener(evt, (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(`${evt} 이벤트 수신:`, data);
        onMessage(data);
      } catch (err) {
        console.error("SSE 데이터 파싱 실패:", err, event.data);
      }
    });
  });

  // 초기 미확인 알림 (배열로 내려옴)
  eventSource.addEventListener("initial-notifications", (event) => {
    try {
      const payload = JSON.parse(event.data);
      console.log("초기 미확인 알림 수신:", payload);

      if (Array.isArray(payload)) {
        payload.forEach((n) => onMessage(n));
      } else {
        onMessage(payload);
      }
    } catch (err) {
      console.error("초기 알림 파싱 실패:", err, event.data);
    }
  });

  eventSource.addEventListener("ping", () => {
    // keep-alive
  });

  eventSource.onopen = () => {
    console.log("SSE 연결 성공");
  };

  eventSource.onerror = (err) => {
    console.error("SSE error:", err);
    eventSource.close();
  };

  return eventSource;
}
