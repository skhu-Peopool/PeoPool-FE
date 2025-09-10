import styled, { keyframes } from "styled-components";
import { X, Check } from "lucide-react";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
`;

const checkAnimation = keyframes`
  0% { 
    transform: scale(0);
    opacity: 0;
  }
  50% { 
    transform: scale(1.1);
    opacity: 1;
  }
  100% { 
    transform: scale(1);
    opacity: 1;
  }
`;

export default function CompleteModal({ onClose }) {
  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>
          <X size={20} />
        </CloseBtn>
        
        <Content>
          <IconWrapper>
            <Check size={48} />
          </IconWrapper>
          
          <Title>지원완료!</Title>
          <Message>이메일로 지원소식을 알려드릴게요.</Message>
        </Content>
      </ModalBox>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 20px;
  width: 400px;
  max-width: 90vw;
  padding: 2.5rem;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(226, 232, 240, 0.5);
  animation: ${slideUp} 0.3s ease-out;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  border: none;
  background: #f1f5f9;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #374151;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 50%;
  color: white;
  margin-bottom: 0.5rem;
  animation: ${checkAnimation} 0.5s ease-out 0.3s both;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const Message = styled.p`
  color: #64748b;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  margin-top: 0.5rem;
`;