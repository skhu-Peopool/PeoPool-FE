import React, {useState} from "react";
import styled from "styled-components";

export default function SignUpPage() {

  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Wrap>
      <Container>
        <Content>
          <ImgContainer>
            <Img src="/signInbg.svg" />
          </ImgContainer>
          <TextOverlay>
            <MainText>{"회원 서비스를 위해 \n회원가입 해주세요."}</MainText>
            <SubText>peopool로 만들어 나가는 세상</SubText>
          </TextOverlay>
        </Content>
        <Content>
          <FormContainer>
            <Title>회원가입</Title>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="이름을 입력하세요"
              />
              <Input
                type="email"
                placeholder="이메일을 입력하세요"
              />
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
              <Input
                type="password"
                placeholder="비밀번호를 재입력하세요"
              />
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <CheckboxLabel htmlFor="remember">
                  이용약관 및 개인정보 처리방침에 동의합니다.
                </CheckboxLabel>
              </CheckboxContainer>
              
              <ButtonContainer>
                <SignUpButton type="submit">
                  회원가입
                </SignUpButton>
                <CancelButton type="reset">
                  취소
                </CancelButton>
              </ButtonContainer>
            </Form>
          </FormContainer>
        </Content>
      </Container>
    </Wrap>
  )
}

const Wrap = styled.div`
  background-color: #eef5ff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh; 
  color: #444;
`;

const Container = styled.div`
  display: flex;
  width: 60%;
  height: 70%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden; 
`;

const Content = styled.div`
  flex: 1;
  height: 100%;
  position: relative; 

  &:first-child {
    border-right: 1px solid #f6f6f6;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 20px 0 0 20px; 
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; 
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  height: 100%;
  padding: 2rem;
`;

const Title = styled.p`
  font-size: 1.5rem;
  color: #1f2937;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  color: #374151;
  transition: all 0.2s;
  box-sizing: border-box;
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: #3b82f6;
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
`;

const SignUpButton = styled.button`
  flex: 1;
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563eb;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: #9ca3af;
  color: white;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #6b7280;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.3);
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
`;

const Link = styled.button`
  background: none;
  border: none;
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #374151;
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  color: #444;
  margin-left: 4rem;
  margin-top: 7.5rem;
`;

const MainText = styled.p`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  text-align: left;
  white-space: pre-line; 
`;

const SubText = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  margin-top: 0.1rem;
  text-align: left; 
  color: #7d7d7d;
`;