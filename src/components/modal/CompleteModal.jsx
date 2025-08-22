import styled from "styled-components";

export default function CompleteModal({ onClose }) {
  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✕</CloseBtn>
        <Title>지원완료!</Title>
        <Message>이메일로 지원소식을 알려드릴게요.</Message>
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
  width: 400px;
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #93c5fd;
  margin-bottom: 0.8rem;
`;

const Message = styled.p`
  color: #94a3b8;
  font-size: 0.95rem;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 1.25rem;
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
`;
