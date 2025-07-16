import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ChevronDown, ChevronUp } from "lucide-react";

const DropdownContainer = styled.div`
  position: relative;
  width: 200px;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.35rem;
  display: block;
  font-weight: 500;
`;

const Selected = styled.div`
  padding: 0.75rem 1rem;
  background: #f1f5f9;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
`;

const Options = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.25rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 20;
`;

const Option = styled.li`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  font-size: 0.95rem;
  color: #1e293b;

  &:hover {
    background-color: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Dropdown = ({
  label = "Options",
  options = [],
  selected,
  setSelected,
}) => {
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
      <Label>{label}</Label>
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
