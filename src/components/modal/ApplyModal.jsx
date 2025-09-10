import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { X, FileText, AlertCircle } from "lucide-react";

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

export default function ApplyModal({ onClose, onComplete }) {
  const [text, setText] = useState("");

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Header>
          <TitleWrapper>
            <IconWrapper>
              <FileText size={20} />
            </IconWrapper>
            <Title>지원서 작성</Title>
          </TitleWrapper>
          <CloseBtn onClick={onClose}>
            <X size={20} />
          </CloseBtn>
        </Header>

        <Content>
          <Label>지원동기</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="지원동기를 작성해주세요.&#10;&#10;• 프로젝트에 관심을 갖게 된 이유&#10;• 본인의 관련 경험이나 역량&#10;• 프로젝트를 통해 얻고 싶은 것&#10;&#10;작성하신 내용은 게시자에게 전달됩니다."
          />
          <CharCount>
            <span className={text.length > 1000 ? "over" : ""}>{text.length}</span> / 1000자
          </CharCount>
        </Content>

        <CautionCard>
          <CautionIcon>
            <AlertCircle size={16} />
          </CautionIcon>
          <CautionText>
            <strong>지원 전 확인사항</strong>
            <br />
            내 프로필이 비공개 상태여도 게시자가 프로필을 열람할 수 있습니다.
          </CautionText>
        </CautionCard>

        <ButtonContainer>
          <CancelBtn onClick={onClose}>취소</CancelBtn>
          <ApplyBtn onClick={onComplete} disabled={!text.trim() || text.length > 1000}>
            지원하기
          </ApplyBtn>
        </ButtonContainer>
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
  width: 600px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(226, 232, 240, 0.5);
  animation: ${slideUp} 0.3s ease-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.5rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: #e0e7ff;
  border-radius: 12px;
  color: #4338ca;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const CloseBtn = styled.button`
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
  padding: 1.5rem 2.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 280px;
  padding: 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 1rem;
  line-height: 1.6;
  resize: none;
  color: #374151;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;

  &::placeholder {
    color: #94a3b8;
    line-height: 1.5;
  }

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const CharCount = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #64748b;
`;

const CautionCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0 2.5rem 1.5rem;
  padding: 1.25rem;
  background: #fef3c7;
  border-radius: 12px;
  border: 1px solid #fbbf24;
`;

const CautionIcon = styled.div`
  color: #d97706;
  margin-top: 0.125rem;
`;

const CautionText = styled.div`
  font-size: 0.875rem;
  color: #92400e;
  line-height: 1.5;
  
  strong {
    font-weight: 600;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2.5rem 2rem;
  border-top: 1px solid #e2e8f0;
`;

const CancelBtn = styled.button`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #e2e8f0;
  background: white;
  color: #64748b;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
  }
`;

const ApplyBtn = styled.button`
  flex: 2;
  padding: 1rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);

  &:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;