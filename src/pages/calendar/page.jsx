import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

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
    return today.getFullYear() === getCurrentYear() &&
           today.getMonth() === getCurrentMonth() &&
           today.getDate() === day;
  };

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", 
                     "7월", "8월", "9월", "10월", "11월", "12월"];

  const renderDates = () => {
    const cells = [];

    // 이전 달 날짜
    const prevMonthDate = new Date(getCurrentYear(), getCurrentMonth() - 1, 0);
    const prevMonthDays = prevMonthDate.getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      cells.push(
        <div key={`prev-${i}`} className="date-cell dimmed">
          <span className="day-number">{day}</span>
        </div>
      );
    }

    // 이번 달 날짜
    for (let d = 1; d <= daysInMonth; d++) {
      const todayCheck = isToday(d);
      cells.push(
        <div key={`current-${d}`} className={`date-cell ${todayCheck ? 'today' : ''}`}>
          <span className="day-number">{d}</span>
        </div>
      );
    }

    // 다음 달 날짜
    const nextCount = 42 - cells.length; // 6줄 고정
    for (let i = 1; i <= nextCount; i++) {
      cells.push(
        <div key={`next-${i}`} className="date-cell dimmed">
          <span className="day-number">{i}</span>
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="container">
      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          padding: 2rem;
          position: relative;
        }

        .container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeIn 0.8s ease-out;
        }

        .header-content {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 2rem;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .title-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(45deg, #ffffff, #e0e7ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.125rem;
          font-weight: 300;
          margin: 0;
        }

        .calendar-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 2rem;
          padding: 2rem;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          animation: fadeIn 1s ease-out 0.2s both;
          overflow: hidden;
        }

        .calendar-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #60a5fa, #3b82f6, #93c5fd);
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid rgba(96, 165, 250, 0.1);
        }

        .month-navigation {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .month-control {
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
        }

        .month-control:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(96, 165, 250, 0.6);
        }

        .month-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          min-width: 200px;
          text-align: center;
        }

        .today-button {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          border-radius: 1rem;
          color: white;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
        }

        .today-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.6);
        }

        .grid-wrapper {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.2);
        }

        .day-header {
          text-align: center;
          font-weight: 700;
          padding: 0.75rem 0;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          color: white;
          font-size: 0.875rem;
          letter-spacing: 0.5px;
          position: relative;
        }

        .day-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        }

        .date-cell {
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
        }

        .date-cell:hover {
          background-color: rgba(96, 165, 250, 0.05);
          transform: scale(1.02);
        }

        .date-cell.dimmed {
          background-color: rgba(241, 245, 249, 0.5);
          color: rgba(148, 163, 184, 0.7);
        }

        .date-cell.dimmed:hover {
          background-color: rgba(241, 245, 249, 0.7);
          transform: none;
        }

        .date-cell.today {
          background-color: rgba(96, 165, 250, 0.1);
          color: #3b82f6;
          font-weight: 700;
          border: 2px solid #3b82f6;
        }

        .date-cell.today:hover {
          background-color: rgba(96, 165, 250, 0.2);
        }

        .date-cell.today::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%);
          animation: shimmer 3s ease-in-out infinite;
          pointer-events: none;
        }

        .day-number {
          font-size: 1rem;
          font-weight: inherit;
          z-index: 1;
          position: relative;
        }
      `}</style>
      
      <div className="content-wrapper">
        <div className="header">
          <div className="header-content">
            <div className="title-wrapper">
              <Calendar color="white" size={40} />
              <h1 className="title">달력/시간표</h1>
            </div>
            <p className="subtitle">팀의 일정을 한눈에 확인하고 관리해보세요</p>
          </div>
        </div>
        
        <div className="calendar-wrapper">
          <div className="calendar-header">
            <div className="month-navigation">
              <button className="month-control" onClick={prevMonth}>
                <ChevronLeft size={20} />
              </button>
              <div className="month-text">
                {getCurrentYear()}년 {monthNames[getCurrentMonth()]}
              </div>
              <button className="month-control" onClick={nextMonth}>
                <ChevronRight size={20} />
              </button>
            </div>
            <button className="today-button" onClick={resetToday}>오늘</button>
          </div>

          <div className="grid-wrapper">
            {daysOfWeek.map((day) => (
              <div key={day} className="day-header">{day}</div>
            ))}
            {renderDates()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;