import React, { useState } from "react";
import styled from "styled-components";

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
`;

const PageButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: 0.125rem solid #e2e8f0;
  background: ${(props) => (props.active ? "#6B9DE4" : "white")};
  color: ${(props) => (props.active ? "white" : "#334155")};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #73a3e7;
    color: ${(props) => (props.active ? "white" : "#1e293b")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PaginationComponent = ({ totalPages = 10, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const visibleCount = 10; // 가운데 보이는 숫자 버튼 개수

  const handlePageClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;

      // 숫자 버튼 이동
      if (newPage < startPage) {
        setStartPage((prev) => prev - 1);
      }

      // 상태 업데이트와 렌더링을 동일하게 유지
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;

      if (newPage > startPage + visibleCount - 1) {
        setStartPage((prev) => prev + 1);
      }

      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const pageNumbers = Array.from(
    { length: visibleCount },
    (_, i) => startPage + i
  ).filter((num) => num <= totalPages);

  return (
    <Pagination>
      <PageButton onClick={handlePrev} disabled={currentPage === 1}>
        &lt;
      </PageButton>

      {pageNumbers.map((page) => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </PageButton>
      ))}

      <PageButton onClick={handleNext} disabled={currentPage === totalPages}>
        &gt;
      </PageButton>
    </Pagination>
  );
};

export default PaginationComponent;
