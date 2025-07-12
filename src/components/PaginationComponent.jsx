import React from 'react';
import styled from 'styled-components';

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const PageButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: 0.125rem solid #e2e8f0;
  background: ${props => props.active ? '#6B9DE4' : 'white'};
  color: ${props => props.active ? 'white' : '#334155'};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #73a3e7;
    color: ${props => props.active ? 'white' : '#1e293b'};
  }
`;

const PaginationComponent = () => {

  return (
    <Pagination>
      <PageButton>&lt;</PageButton>
      <PageButton active>1</PageButton>
      <PageButton>2</PageButton>
      <PageButton>3</PageButton>
      <PageButton>&gt;</PageButton>
    </Pagination>
  );
};

export default PaginationComponent;