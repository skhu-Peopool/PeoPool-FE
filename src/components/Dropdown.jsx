import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ChevronDown, ChevronUp } from "lucide-react";

const DropdownContainer = styled.div`
  position: relative;
  width: 200px;
  z-index: 6;
`;

const Selected = styled.div`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const Options = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.25rem;
  background: #9abdf5ff;
  backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const Option = styled.li`
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const Dropdown = ({ options = [], selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContainer ref={containerRef}>
      <Selected onClick={() => setIsOpen(!isOpen)}>
        <span>{selected}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </Selected>
      {isOpen && (
        <Options>
          {options.map((option, index) => (
            <Option key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </Option>
          ))}
        </Options>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
