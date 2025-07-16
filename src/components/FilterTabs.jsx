import React from "react";
import styled from "styled-components";

const Filter = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  border: 0.125rem solid
    ${(props) =>
      props.active ? "var(--color-primary)" : "var(--color-border)"};
  background: ${(props) => (props.active ? "var(--color-primary)" : "white")};
  color: ${(props) => (props.active ? "white" : "#334155")};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-primary);
    color: ${(props) => (props.active ? "white" : "#1e293b")};
  }
`;

const FilterTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <Filter>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          active={activeTab === tab}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </Tab>
      ))}
    </Filter>
  );
};

export default FilterTabs;
