import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Styled components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  padding: 2rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const HeaderContent = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  font-weight: 300;
  margin: 0;
`;

const CalendarWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  padding: 2rem;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 1s ease-out 0.2s both;
  overflow: hidden;

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
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(96, 165, 250, 0.4);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 30px rgba(96, 165, 250, 0.6);
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(16, 185, 129, 0.6);
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.2);
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: 700;
  padding: 0.75rem 0;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  color: white;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    );
  }
`;

const DateCell = styled.div`
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.75rem;
  background-color: #ffffff;
  color: #1f2937;
  font-weight: 500;
  border: 1px solid rgba(226, 232, 240, 0.5);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &:hover {
    background-color: rgba(96, 165, 250, 0.05);
    transform: scale(1.02);
  }

  &.dimmed {
    background-color: rgba(241, 245, 249, 0.5);
    color: rgba(148, 163, 184, 0.7);

    &:hover {
      background-color: rgba(241, 245, 249, 0.7);
      transform: none;
    }
  }

  &.today {
    background-color: rgba(96, 165, 250, 0.1);
    color: #3b82f6;
    font-weight: 700;
    border: 4px solid #3b82f6;

    &:hover {
      background-color: rgba(96, 165, 250, 0.2);
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(59, 130, 246, 0.1) 50%,
        transparent 70%
      );
      animation: ${shimmer} 3s ease-in-out infinite;
      pointer-events: none;
    }
  }
`;

const DayNumber = styled.span`
  font-size: 1rem;
  font-weight: inherit;
  z-index: 1;
  position: relative;
`;

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getCurrentYear = () => currentDate.getFullYear();
  const getCurrentMonth = () => currentDate.getMonth();

  const startOfMonth = new Date(getCurrentYear(), getCurrentMonth(), 1);
  const endOfMonth = new Date(getCurrentYear(), getCurrentMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const resetToday = () => {
    setCurrentDate(new Date());
  };

  const today = new Date();
  const isToday = (day) => {
    return (
      today.getFullYear() === getCurrentYear() &&
      today.getMonth() === getCurrentMonth() &&
      today.getDate() === day
    );
  };

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const renderDates = () => {
    const cells = [];

    // 이전 달 날짜
    const prevMonthDate = new Date(getCurrentYear(), getCurrentMonth() - 1, 0);
    const prevMonthDays = prevMonthDate.getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      cells.push(
        <DateCell key={`prev-${i}`} className="dimmed">
          <DayNumber>{day}</DayNumber>
        </DateCell>
      );
    }

    // 이번 달 날짜
    for (let d = 1; d <= daysInMonth; d++) {
      const todayCheck = isToday(d);
      cells.push(
        <DateCell key={`current-${d}`} className={todayCheck ? "today" : ""}>
          <DayNumber>{d}</DayNumber>
        </DateCell>
      );
    }

    // 다음 달 날짜
    const nextCount = 42 - cells.length; // 6줄 고정
    for (let i = 1; i <= nextCount; i++) {
      cells.push(
        <DateCell key={`next-${i}`} className="dimmed">
          <DayNumber>{i}</DayNumber>
        </DateCell>
      );
    }

    return cells;
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <HeaderContent>
            <TitleWrapper>
              <Calendar color="white" size={40} />
              <Title>달력/시간표</Title>
            </TitleWrapper>
            <Subtitle>팀의 일정을 한눈에 확인하고 관리해보세요</Subtitle>
          </HeaderContent>
        </Header>

        <CalendarWrapper>
          <CalendarHeader>
            <MonthNavigation>
              <MonthControl onClick={prevMonth}>
                <ChevronLeft size={20} />
              </MonthControl>
              <MonthText>
                {getCurrentYear()}년 {monthNames[getCurrentMonth()]}
              </MonthText>
              <MonthControl onClick={nextMonth}>
                <ChevronRight size={20} />
              </MonthControl>
            </MonthNavigation>
            <TodayButton onClick={resetToday}>오늘</TodayButton>
          </CalendarHeader>

          <GridWrapper>
            {daysOfWeek.map((day) => (
              <DayHeader key={day}>{day}</DayHeader>
            ))}
            {renderDates()}
          </GridWrapper>
        </CalendarWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default CalendarPage;
