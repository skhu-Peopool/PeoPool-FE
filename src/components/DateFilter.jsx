import React from "react";
import styled from "styled-components";

const DateRange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
`;

const DateInput = styled.input`
  padding: 0.5rem 0.75rem;
  border: 0.125rem solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  color: #334155;
  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const DateSeparator = styled.span`
  color: #334155;
  font-size: 0.875rem;
  font-weight: 500;
`;

const DateFilter = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <DateRange>
      <DateInput
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      {endDate !== undefined && setEndDate && (
        <>
          <DateSeparator>to</DateSeparator>
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
