import styled from "styled-components";
import { Calendar } from "lucide-react";

const DateRange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
`;

const DateInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.3);
  }

  &::-webkit-calendar-picker-indicator {
    filter: brightness(0) invert(1);
    opacity: 0.7;
  }
`;

const DateSeparator = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const CalendarIcon = styled(Calendar)`
  color: rgba(255, 255, 255, 0.8);
`;

const DateFilter = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <DateRange>
      <CalendarIcon size={16} />
      <DateInput
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      {endDate !== undefined && setEndDate && (
        <>
          <DateSeparator>~</DateSeparator>
          <DateInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </>
      )}
    </DateRange>
  );
};

export default DateFilter;
