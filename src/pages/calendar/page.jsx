// CalendarPage.jsx
import { useEffect, useMemo, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Header from "../../components/Header";

// ── react-big-calendar + date-fns(localizer, ko) ───────────────────────────────
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ko from "date-fns/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";

import EventModal from "./EventModal";

// ── date-fns localizer (일요일 시작) ───────────────────────────────────────────
const locales = { "ko-KR": ko, ko };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 0 }),
  getDay,
  locales,
});

// ── 스타일 (기존 스타일 유지) ────────────────────────────────────────────────
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const Container = styled.div`
  min-height: calc(100vh - 4rem);
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  padding: 2rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
    animation: ${float} 6s ease-in-out infinite;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const CalendarWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 2rem;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 1s ease-out 0.2s both;
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  margin-top: 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #60a5fa, #3b82f6, #93c5fd);
  }
`;

// ── RBC 기본 CSS 오버라이드 (우리 UI에 맞춤) ──────────────────────────────────
const GlobalRBCStyle = createGlobalStyle`
  .rbc-calendar { font-family: inherit; }
  .rbc-toolbar { display: none; } /* 커스텀 툴바를 쓰므로 기본 툴바 숨김 */

  .rbc-month-view { border: 1px solid rgba(96,165,250,.2); border-radius: 1rem; overflow: hidden; }
  .rbc-month-row { border-top: 1px solid #e2e8f0; }
  .rbc-header {
    text-align: center;
    font-weight: 700;
    padding: .75rem 0;
    background: linear-gradient(135deg,#60a5fa,#3b82f6);
    color: #fff;
    font-size: .875rem;
    letter-spacing: .5px;
    border-right: 1px solid rgba(255,255,255,.25);
  }
  .rbc-header + .rbc-header { }
  .rbc-off-range-bg {
    background-color: #f1f5f9; /* 옅은 회색 배경 */
  }
  .rbc-off-range .rbc-button-link {
    color: #9ca3af; /* 글씨 연한 회색 */
    font-weight: 500;
  }
  .rbc-off-range .rbc-date-cell {
    background-color: #f9fafb; /* 살짝 다른 배경 */
  }
  .rbc-today { background: rgba(96,165,250,.12); }
  .rbc-date-cell { padding: .5rem; }
  .rbc-button-link { color: #1f2937; font-weight: 600; }
  .rbc-selected-cell { background: rgba(96,165,250,.22); }
  .rbc-row-segment .rbc-event, .rbc-event {
    border: none;
    border-radius: 6px;
    color: white;
    padding: 2px 6px;
    font-size: .75rem;
  }
  .rbc-event-label { display: none; } /* 제목만 */
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(96, 165, 250, 0.1);
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const MonthControl = styled.button`
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(96, 165, 250, 0.4);
  transition: 0.2s transform;
  &:hover {
    transform: scale(1.06);
  }
`;
const MonthText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  min-width: 200px;
  text-align: center;
`;
const TodayButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 1rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;

const EVENT_COLORS = [
  { name: "보라색", value: "linear-gradient(135deg, #8b5cf6, #7c3aed)" },
  { name: "초록색", value: "linear-gradient(135deg, #10b981, #059669)" },
  { name: "주황색", value: "linear-gradient(135deg, #f59e0b, #d97706)" },
  { name: "빨간색", value: "linear-gradient(135deg, #ef4444, #dc2626)" },
  { name: "파란색", value: "linear-gradient(135deg, #3b82f6, #2563eb)" },
];

// ── 유틸: 저장/불러오기 (Date 직렬화) ─────────────────────────────────────────
const STORAGE_KEY = "calendarEvents";
const serialize = (arr) =>
  JSON.stringify(
    arr.map((e) => ({
      ...e,
      start: e.start.toISOString(),
      end: e.end.toISOString(),
    }))
  );
const deserialize = (json) => {
  try {
    const raw = JSON.parse(json);
    return Array.isArray(raw)
      ? raw.map((e) => ({
          ...e,
          start: new Date(e.start),
          end: new Date(e.end),
        }))
      : [];
  } catch {
    return [];
  }
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState({ open: false, mode: "add", data: null }); // mode: 'add'|'edit'

  // 첫 로드: 기존 저장분 로딩 (+ 예전 객체형식도 대비)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const parsed = deserialize(saved);
    setEvents(parsed);
  }, []);

  // 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, serialize(events));
  }, [events]);

  // 한국어 메시지
  const messages = useMemo(
    () => ({
      date: "날짜",
      time: "시간",
      event: "일정",
      allDay: "종일",
      week: "주",
      work_week: "근무 주",
      day: "일",
      month: "월",
      previous: "이전",
      next: "다음",
      yesterday: "어제",
      tomorrow: "내일",
      today: "오늘",
      agenda: "목록",
      showMore: (total) => `+${total}개 더 보기`,
    }),
    []
  );

  // ── 모달 액션 ───────────────────────────────────────────────────────────────
  const openAddModal = (start, end) => {
    setModal({
      open: true,
      mode: "add",
      data: {
        id: crypto.randomUUID(),
        title: "",
        start,
        end,
        color: EVENT_COLORS[0].value,
        memo: "",
      },
    });
  };

  const openEditModal = (event) => {
    setModal({ open: true, mode: "edit", data: { ...event } });
  };

  const closeModal = () => setModal({ open: false, mode: "add", data: null });

  const saveAdd = (data) => {
    setEvents((prev) => [...prev, data]);
    closeModal();
  };

  const saveEdit = (data) => {
    setEvents((prev) => prev.map((e) => (e.id === data.id ? data : e)));
    closeModal();
  };

  const removeEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    closeModal();
  };

  // ── 커스텀 툴바 (기존 상단 네비 그대로) ─────────────────────────────────────
  const label = useMemo(() => {
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth() + 1;
    return `${y}년 ${m}월`;
  }, [currentDate]);

  return (
    <Container>
      <GlobalRBCStyle />

      <ContentWrapper>
        <Header
          icon={<CalendarIcon color="white" size={40} />}
          title="달력/시간표"
          subTitle="팀의 일정을 한눈에 확인하고 관리해보세요"
        />

        <CalendarWrapper>
          <CalendarHeader>
            <MonthNavigation>
              <MonthControl
                onClick={() =>
                  setCurrentDate(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                  )
                }
              >
                <ChevronLeft size={20} />
              </MonthControl>
              <MonthText>{label}</MonthText>
              <MonthControl
                onClick={() =>
                  setCurrentDate(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                  )
                }
              >
                <ChevronRight size={20} />
              </MonthControl>
            </MonthNavigation>
            {/* <TodayButton onClick={() => setCurrentDate(new Date())}>
              오늘
            </TodayButton> */}
          </CalendarHeader>

          <Calendar
            localizer={localizer}
            culture="ko-KR"
            views={[Views.MONTH]}
            view={Views.MONTH}
            date={currentDate}
            onNavigate={setCurrentDate}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            popup // "+n개" 팝업
            style={{ height: 720 }}
            messages={messages}
            // 빈 영역 클릭/드래그 → 추가 모달
            onSelectSlot={({ start, end, action }) => {
              // RBC 월뷰에선 단일 클릭도 start=end+1day일 수 있음 → 최소 보정
              const safeEnd =
                end <= start ? new Date(start.getTime() + 30 * 60 * 1000) : end;
              openAddModal(start, safeEnd);
            }}
            // 이벤트 클릭 → 수정 모달
            onSelectEvent={(event) => openEditModal(event)}
            // 이벤트 색/스타일
            eventPropGetter={(event) => ({
              style: {
                background: event.color,
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontWeight: 600,
              },
            })}
          />
        </CalendarWrapper>
      </ContentWrapper>

      {/* 모달 */}
      {modal.open && (
        <EventModal
          mode={modal.mode}
          data={modal.data}
          onClose={closeModal}
          onSaveAdd={saveAdd}
          onSaveEdit={saveEdit}
          onDelete={() => removeEvent(modal.data.id)}
          eventColors={EVENT_COLORS}
        />
      )}
    </Container>
  );
}
