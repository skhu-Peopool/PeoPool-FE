import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Calendar, ChevronLeft, ChevronRight, Plus, X, Clock, Edit3 } from "lucide-react";
import Header from "../../components/Header";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
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
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 1s ease-out 0.2s both;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #60a5fa, #3b82f6, #93c5fd);
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(96, 165, 250, 0.1);
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MonthControl = styled.button`
  width: 3rem; height: 3rem;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(96,165,250,0.4);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 30px rgba(96,165,250,0.6);
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
  background: linear-gradient(135deg, #10b981, #059669);
  border: none;
  border-radius: 1rem;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(16,185,129,0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(16,185,129,0.6);
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  border: 1px solid rgba(96,165,250,0.2);
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: 700;
  padding: 0.75rem 0;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  color: white;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
`;

const DateCell = styled.div`
  position: relative;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background-color: #fff;
  color: #1f2937;
  font-weight: 500;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(96,165,250,0.05);
    transform: scale(1.02);
    z-index: 10;
  }

  &.dimmed {
    background-color: #f8fafc;
    color: #94a3b8;
    cursor: default;
    
    &:hover {
      transform: none;
    }
  }

  &.today {
    background-color: rgba(96,165,250,0.1);
    color: #3b82f6;
    font-weight: 700;
    
    &:hover {
      background-color: rgba(96,165,250,0.2);
    }
  }
`;

const DayNumber = styled.span`
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const EventsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow: hidden;
`;

const Event = styled.div`
  background: ${props => props.color || 'linear-gradient(135deg, #8b5cf6, #7c3aed)'};
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    position: relative;
    z-index: 20;
  }
`;

const AddEventHint = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.2s ease;
  pointer-events: none;

  ${DateCell}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  animation: ${fadeIn} 0.3s ease-out 0.1s both;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(96,165,250,0.1);
`;

const ModalTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  color: #1f2937;
`;

const CloseButton = styled.button`
  width: 2rem;
  height: 2rem;
  background: rgba(239,68,68,0.1);
  border: none;
  border-radius: 50%;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239,68,68,0.2);
    transform: scale(1.1);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96,165,250,0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 0.6rem 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96,165,250,0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  background: white;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96,165,250,0.2);
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &.primary {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    color: white;
    box-shadow: 0 4px 20px rgba(96,165,250,0.4);
  }

  &.secondary {
    background: #f1f5f9;
    color: #475569;
  }

  &.danger {
    background: linear-gradient(135deg, #f87171, #ef4444);
    color: white;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

const EventListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
`;

const EventListItem = styled.div`
  background: ${props => props.color || 'linear-gradient(135deg, #8b5cf6, #7c3aed)'};
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
`;

const EventInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
`;

const EventEditButton = styled.button`
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.1);
  }
`;

const EVENT_COLORS = [
  { name: "보라색", value: "linear-gradient(135deg, #8b5cf6, #7c3aed)" },
  { name: "초록색", value: "linear-gradient(135deg, #10b981, #059669)" },
  { name: "주황색", value: "linear-gradient(135deg, #f59e0b, #d97706)" },
  { name: "빨간색", value: "linear-gradient(135deg, #ef4444, #dc2626)" },
  { name: "파란색", value: "linear-gradient(135deg, #3b82f6, #2563eb)" },
];

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [modalState, setModalState] = useState({
    type: null, // 'add', 'edit', 'view', 'delete'
    selectedDate: null,
    selectedEvent: null,
    formData: null
  });

  const getDateInfo = () => ({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDate()
  });

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const isToday = (day) => {
    const today = new Date();
    const { year, month } = getDateInfo();
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day;
  };

  const getEventsForDate = (year, month, day) => {
    const dateKey = formatDateKey(year, month, day);
    return events[dateKey] || [];
  };

  // 날짜 네비게이션
  const navigateMonth = (direction) => {
    const { year, month } = getDateInfo();
    setCurrentDate(new Date(year, month + direction, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // 모달 관리
  const closeModal = () => {
    setModalState({
      type: null,
      selectedDate: null,
      selectedEvent: null,
      formData: null
    });
  };

  const openAddModal = (day) => {
    const { year, month } = getDateInfo();
    setModalState({
      type: 'add',
      selectedDate: { year, month, day },
      selectedEvent: null,
      formData: {
        title: "",
        time: "",
        color: EVENT_COLORS[0].value,
        memo: ""
      }
    });
  };

  const openEditModal = (day, event) => {
    const { year, month } = getDateInfo();
    setModalState({
      type: 'edit',
      selectedDate: { year, month, day },
      selectedEvent: event,
      formData: { ...event }
    });
  };

  const openViewModal = (dateKey, dayEvents) => {
    setModalState({
      type: 'view',
      selectedDate: null,
      selectedEvent: null,
      formData: { dateKey, events: dayEvents }
    });
  };

  const openDeleteModal = (dateKey, eventId) => {
    setModalState({
      type: 'delete',
      selectedDate: null,
      selectedEvent: null,
      formData: { dateKey, eventId }
    });
  };

  // 폼 데이터 업데이트
  const updateFormData = (field, value) => {
    setModalState(prev => ({
      ...prev,
      formData: { ...prev.formData, [field]: value }
    }));
  };

  const saveEvent = () => {
    const { type, selectedDate, selectedEvent, formData } = modalState;
    
    if (!formData.title.trim()) return;

    const dateKey = formatDateKey(selectedDate.year, selectedDate.month, selectedDate.day);

    setEvents(prev => {
      const dayEvents = prev[dateKey] || [];
      
      if (type === 'add') {
        const newEvent = {
          id: crypto.randomUUID(),
          ...formData
        };
        return {
          ...prev,
          [dateKey]: [...dayEvents, newEvent]
        };
      } else if (type === 'edit') {
        const updatedEvents = dayEvents.map(event =>
          event.id === selectedEvent.id ? formData : event
        );
        return {
          ...prev,
          [dateKey]: updatedEvents
        };
      }
    });

    closeModal();
  };

  const deleteEvent = () => {
    const { dateKey, eventId } = modalState.formData;
    
    setEvents(prev => {
      const dayEvents = prev[dateKey] || [];
      const filteredEvents = dayEvents.filter(event => event.id !== eventId);
      
      const newEvents = { ...prev };
      if (filteredEvents.length > 0) {
        newEvents[dateKey] = filteredEvents;
      } else {
        delete newEvents[dateKey];
      }
      
      return newEvents;
    });

    closeModal();
  };

  // 캘린더 그리드 렌더링
  const renderCalendarGrid = () => {
    const { year, month } = getDateInfo();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const cells = [];
    const currentCellDate = new Date(startDate);

    // 6주 렌더링
    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        const cellDate = new Date(currentCellDate);
        const cellDay = cellDate.getDate();
        const isCurrentMonth = cellDate.getMonth() === month;
        const dayEvents = isCurrentMonth ? getEventsForDate(year, month, cellDay) : [];
        
        cells.push(
          <DateCell
            key={`${cellDate.getTime()}`}
            className={`
              ${!isCurrentMonth ? 'dimmed' : ''}
              ${isCurrentMonth && isToday(cellDay) ? 'today' : ''}
            `}
            onClick={() => isCurrentMonth && openAddModal(cellDay)}
          >
            <DayNumber>{cellDay}</DayNumber>
            
            {isCurrentMonth && (
              <EventsContainer>
                {dayEvents.slice(0, 3).map(event => (
                  <Event
                    key={event.id}
                    color={event.color}
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(cellDay, event);
                    }}
                    title={`${event.title}${event.time ? ` (${event.time})` : ""}${event.memo ? ` - ${event.memo}` : ""}`}
                  >
                    {event.time && (
                      <>
                        <Clock size={12} style={{ marginRight: 4 }} />
                        <span style={{ fontWeight: 600, marginRight: 6 }}>{event.time}</span>
                      </>
                    )}
                    {event.title}
                  </Event>
                ))}
                
                {dayEvents.length > 3 && (
                  <Event
                    color="linear-gradient(135deg, #6b7280, #4b5563)"
                    onClick={(e) => {
                      e.stopPropagation();
                      const dateKey = formatDateKey(year, month, cellDay);
                      openViewModal(dateKey, dayEvents);
                    }}
                  >
                    +{dayEvents.length - 3}개 더 보기
                  </Event>
                )}
              </EventsContainer>
            )}
            
            {isCurrentMonth && (
              <AddEventHint>
                <Plus size={16} color="white" />
              </AddEventHint>
            )}
          </DateCell>
        );

        currentCellDate.setDate(currentCellDate.getDate() + 1);
      }
    }

    return cells;
  };

  // 모달 렌더링
  const renderModal = () => {
    const { type, selectedDate, formData } = modalState;

    if (!type) return null;

    return (
      <ModalBackdrop onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {type === 'add' && (
            <>
              <ModalHeader>
                <ModalTitle>
                  {selectedDate.month + 1}월 {selectedDate.day}일 일정 추가
                </ModalTitle>
                <CloseButton onClick={closeModal}>
                  <X size={16} />
                </CloseButton>
              </ModalHeader>

              <FormGroup>
                <Label>일정 제목 *</Label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="일정 제목을 입력하세요"
                  autoFocus
                />
              </FormGroup>

              <FormGroup>
                <Label>시간</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => updateFormData('time', e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>색상</Label>
                <Select
                  value={formData.color}
                  onChange={(e) => updateFormData('color', e.target.value)}
                >
                  {EVENT_COLORS.map(color => (
                    <option key={color.name} value={color.value}>
                      {color.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>메모</Label>
                <Textarea
                  value={formData.memo}
                  onChange={(e) => updateFormData('memo', e.target.value)}
                  placeholder="메모나 추가 설명을 입력하세요"
                />
              </FormGroup>

              <ModalActions>
                <ActionButton className="secondary" onClick={closeModal}>
                  취소
                </ActionButton>
                <ActionButton className="primary" onClick={saveEvent}>
                  추가
                </ActionButton>
              </ModalActions>
            </>
          )}

          {type === 'edit' && (
            <>
              <ModalHeader>
                <ModalTitle>
                  {selectedDate.month + 1}월 {selectedDate.day}일 일정 수정
                </ModalTitle>
                <CloseButton onClick={closeModal}>
                  <X size={16} />
                </CloseButton>
              </ModalHeader>

              <FormGroup>
                <Label>일정 제목 *</Label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="일정 제목을 입력하세요"
                />
              </FormGroup>

              <FormGroup>
                <Label>시간</Label>
                <Input
                  type="time"
                  value={formData.time || ""}
                  onChange={(e) => updateFormData('time', e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>색상</Label>
                <Select
                  value={formData.color}
                  onChange={(e) => updateFormData('color', e.target.value)}
                >
                  {EVENT_COLORS.map(color => (
                    <option key={color.name} value={color.value}>
                      {color.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>메모</Label>
                <Textarea
                  value={formData.memo || ""}
                  onChange={(e) => updateFormData('memo', e.target.value)}
                  placeholder="메모나 추가 설명을 입력하세요"
                />
              </FormGroup>

              <ModalActions>
                <ActionButton 
                  className="danger" 
                  onClick={() => {
                    const dateKey = formatDateKey(selectedDate.year, selectedDate.month, selectedDate.day);
                    openDeleteModal(dateKey, modalState.selectedEvent.id);
                  }}
                >
                  삭제
                </ActionButton>
                <ActionButton className="primary" onClick={saveEvent}>
                  저장
                </ActionButton>
              </ModalActions>
            </>
          )}

          {type === 'view' && (
            <>
              <ModalHeader>
                <ModalTitle>{formData.dateKey} 전체 일정</ModalTitle>
                <CloseButton onClick={closeModal}>
                  <X size={16} />
                </CloseButton>
              </ModalHeader>

              <EventListContainer>
                {formData.events.map(event => {
                  const [year, month, day] = formData.dateKey.split("-").map(n => parseInt(n, 10));
                  
                  return (
                    <EventListItem
                      key={event.id}
                      color={event.color}
                      onClick={() => openEditModal(day, event)}
                    >
                      <EventInfo>
                        {event.time && (
                          <>
                            <Clock size={14} />
                            <span style={{ fontWeight: 600 }}>{event.time}</span>
                          </>
                        )}
                        <span>{event.title}</span>
                        {event.memo && (
                          <span style={{ opacity: 0.8, fontSize: "0.7rem" }}>
                            - {event.memo}
                          </span>
                        )}
                      </EventInfo>
                      <EventEditButton
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(day, event);
                        }}
                      >
                        <Edit3 size={14} />
                      </EventEditButton>
                    </EventListItem>
                  );
                })}
              </EventListContainer>
            </>
          )}

          {type === 'delete' && (
            <>
              <ModalHeader>
                <ModalTitle>일정 삭제</ModalTitle>
                <CloseButton onClick={closeModal}>
                  <X size={16} />
                </CloseButton>
              </ModalHeader>
              
              <p style={{ margin: "1.5rem 0", color: "#374151" }}>
                이 일정을 정말로 삭제하시겠습니까?
              </p>
              
              <ModalActions>
                <ActionButton className="secondary" onClick={closeModal}>
                  취소
                </ActionButton>
                <ActionButton className="danger" onClick={deleteEvent}>
                  삭제
                </ActionButton>
              </ModalActions>
            </>
          )}
        </ModalContent>
      </ModalBackdrop>
    );
  };

  const { year, month } = getDateInfo();

  return (
    <Container>
      <ContentWrapper>
        <Header
          icon={<Calendar color="white" size={40} />}
          title="달력/시간표"
          subTitle="팀의 일정을 한눈에 확인하고 관리해보세요"
        />
        
        <CalendarWrapper>
          <CalendarHeader>
            <MonthNavigation>
              <MonthControl onClick={() => navigateMonth(-1)}>
                <ChevronLeft size={20} />
              </MonthControl>
              <MonthText>
                {year}년 {month + 1}월
              </MonthText>
              <MonthControl onClick={() => navigateMonth(1)}>
                <ChevronRight size={20} />
              </MonthControl>
            </MonthNavigation>
            <TodayButton onClick={goToToday}>
              오늘
            </TodayButton>
          </CalendarHeader>

          <GridWrapper>
            {DAYS_OF_WEEK.map(day => (
              <DayHeader key={day}>{day}</DayHeader>
            ))}
            {renderCalendarGrid()}
          </GridWrapper>
        </CalendarWrapper>

        {renderModal()}
      </ContentWrapper>
    </Container>
  );
};

export default CalendarPage;