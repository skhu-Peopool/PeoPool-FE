import React from 'react';
import styled from 'styled-components';

const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  border: 0.125rem solid ${props => props.active ? '#6B9DE4' : '#e2e8f0'};
  background: ${props => props.active ? '#6B9DE4' : 'white'};
  color: ${props => props.active ? 'white' : '#334155'};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #6B9DE4;
    color: ${props => props.active ? 'white' : '#1e293b'};
  }
`;

const DateRange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
`;

const DateInput = styled.input`
  padding: 0.5rem 0.75rem;
  border: 0.125rem solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  color: #334155;
  &:focus {
    outline: none;
    border-color: #6B9DE4;
  }
`;

const DateSeparator = styled.span`
  color: #334155;
  font-size: 0.875rem;
  font-weight: 500;
`;

const FilterTabsComponent = ({ tabs, activeTab, setActiveTab, startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <FilterTabs>
      {tabs.map(tab => (
        <Tab
          key={tab}
          active={activeTab === tab}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </Tab>
      ))}
      <DateRange>
        <DateInput
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <DateSeparator>to</DateSeparator>
        <DateInput
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </DateRange>
    </FilterTabs>
  );
};

export default FilterTabsComponent;