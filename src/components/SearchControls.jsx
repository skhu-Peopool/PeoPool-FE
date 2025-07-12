import React from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 18.75rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 0.125rem solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: white;
  color: #334155;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #8BB3EA;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
`;


const SearchControls = ({ searchTerm, setSearchTerm }) => {
  return (
    <SearchContainer>
      <SearchIcon>
        <Search size={20} />
      </SearchIcon>
      <SearchInput
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </SearchContainer>
  );
};


export default SearchControls;