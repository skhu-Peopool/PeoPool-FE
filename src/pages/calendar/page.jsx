import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const endDay = endOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));
  const resetToday = () => setCurrentDate(dayjs());

  const today = dayjs();

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const renderDates = () => {
    const cells = [];

    const prevMonth = currentDate.subtract(1, "month");
    const prevMonthDays = prevMonth.daysInMonth();

    // 이전 달 날짜
    for (let i = startDay - 1; i >= 0; i--) {
      const date = prevMonth.date(prevMonthDays - i);
      cells.push(
        <DateCell key={`prev-${i}`} dimmed>
          <DayNumber>{date.date()}</DayNumber>
        </DateCell>
      );
    }

    // 이번 달 날짜
    for (let d = 1; d <= daysInMonth; d++) {
      const date = currentDate.date(d);
      const isToday = today.isSame(date, "day");
      cells.push(
        <DateCell key={`current-${d}`} $isToday={isToday}>
          <DayNumber>{d}</DayNumber>
        </DateCell>
      );
    }

    // 다음 달 날짜
    const nextCount = 42 - cells.length; // 6줄 고정
    for (let i = 1; i <= nextCount; i++) {
      cells.push(
        <DateCell key={`next-${i}`} dimmed>
          <DayNumber>{i}</DayNumber>
        </DateCell>
      );
    }

    return cells;
  };

  return (
    <Container>
      <MainContent>
        <Title>달력/시간표</Title>
        <CalendarWrapper>
          <CalendarHeader>
            <CalendarTitle>팀 캘린더</CalendarTitle>
          </CalendarHeader>

          <Header>
            <MonthControl onClick={prevMonth}>
              <img src="/arrow_left.svg" alt="이전달" />
            </MonthControl>
            <MonthText>
              {currentDate.year()}년 {currentDate.month() + 1}월
            </MonthText>
            <MonthControl onClick={nextMonth}>
              <img src="/arrow_right.svg" alt="다음달" />
            </MonthControl>
            {/* <TodayButton onClick={resetToday}>오늘</TodayButton> */}
          </Header>

          <GridWrapper>
            {daysOfWeek.map((day) => (
              <DayHeader key={day}>{day}</DayHeader>
            ))}
            {renderDates()}
          </GridWrapper>
        </CalendarWrapper>
      </MainContent>
    </Container>
  );
};

export default CalendarPage;

// -------- 스타일 정의 --------

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: #f8fafc;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 3rem 5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
`;

const CalendarWrapper = styled.div`
  background-color: white;
  padding: 5rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const CalendarHeader = styled.div`
  width: 100%;
  background-color: var(--color-primary2);
  border-radius: 12px 12px 0 0;
  padding: 2rem 1.5rem;
  display: flex;
  align-items: center;
  color: white;
  position: absolute;
  top: 0;
  right: 0;
`;

const CalendarTitle = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3.5rem 0;
  gap: 1rem;
`;

const MonthControl = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
`;

const MonthText = styled.div`
  font-size: 30px;
  font-weight: 600;
  padding: 0 7rem;
`;

const TodayButton = styled.button`
  padding: 0.4rem 0.75rem;
  background-color: var(--color-primary2);
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: var(--color-primary);
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-radius: 12px;
  overflow: hidden;
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: 600;
  padding: 1.25rem 0;
  border: 1px solid #e2e8f0;
  background-color: var(--color-primary2);
  color: white;
`;

const DateCell = styled.div`
  position: relative;
  padding: 5.4rem;

  background-color: ${({ $isToday, dimmed }) =>
    $isToday ? "rgba(154, 190, 236, 0.2)" : dimmed ? "#f1f5f9" : "#fff"};
  color: ${({ $isToday, dimmed }) =>
    dimmed ? "#cbd5e1" : $isToday ? "#3b82f6" : "black"};
  font-weight: ${({ $isToday }) => ($isToday ? "bold" : "normal")};
  border: ${({ $isToday }) =>
    $isToday ? "3px solid #9ABEEC" : "1px solid #e2e8f0"};
`;

const DayNumber = styled.span`
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 20px;
  font-weight: 700;
  font-family: Segoe UI;
`;
