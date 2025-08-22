import styled from "styled-components";
import { useState } from "react";

export default function ApplyModal({ onClose, onComplete }) {
  const [text, setText] = useState("");

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✕</CloseBtn>
        <Title>지원동기</Title>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="지원동기를 작성하세요.&#10;작성한 지원동기는 게시자가 볼 수 있어요."
        />
        <ApplyBtn onClick={onComplete} disabled={!text}>
          지원하기
        </ApplyBtn>
        <Caution>
          <strong>지원 전 꼭 확인하세요!</strong>
          <br />내 프로필이 비공개 상태여도 게시자가 내 프로필을 열람할 수
          있어요.
        </Caution>
      </ModalBox>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 12px;
  border: 3px solid var(--color-primary);
  width: 500px;
  padding: 1.5rem 2rem;
  position: relative;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  resize: none;
  color: #334155;
  outline: none; /* 기본 검은색 테두리 제거 */

  &::placeholder {
    color: #aad2ffff;
  }

  &:focus {
    border: 2px solid var(--color-primary); /* focus 시 primary 색상 적용 */
  }
`;

const ApplyBtn = styled.button`
  width: 100%;
  background: #93c5fd;
  color: white;
  font-weight: 600;
  border: none;
  padding: 0.8rem;
  border-radius: 6px;
  margin-top: 1.5rem;
  cursor: pointer;

  &:hover {
    background: var(--color-primary2);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`;

const Caution = styled.p`
  font-size: 0.8rem;
  color: #d77b13;
  margin-top: 1rem;
  line-height: 1.4;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  font-size: 1.25rem;
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
`;
