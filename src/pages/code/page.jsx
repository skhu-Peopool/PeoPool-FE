import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { authService } from "../../lib/api/auth-service";
import { useAuth } from "../../providers/AuthProvider";

export default function EmailCodePage() {
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  const { email, password, nickname } = location.state || {};
  console.log("email:", email);

  useEffect(() => {
    if (!email || !password || !nickname) {
      alert("잘못된 접근입니다. 회원가입 정보를 다시 입력해주세요.");
      navigate("/signup");
    }
  }, [email, password, nickname, navigate]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const updated = [...code];
      updated[index] = value;
      setCode(updated);

      // 다음 input으로 이동
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = async () => {
    const finalCode = code.join("");

    if (finalCode.length !== 6) {
      alert("6자리 코드를 모두 입력해주세요.");
      return;
    }

    try {
      const numericCode = Number(finalCode); // 🔧 숫자로 변환
      console.log("Verifying with:", { email, numericCode });

      await authService.verifyAuthCode(email, numericCode); // 여기도 수정

      await register(password, nickname, email);

      alert("회원가입이 완료되었습니다!");
      navigate("/community");
    } catch (err) {
      console.error(err);
      setError("인증 실패: " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <Wrap>
      <Container>
        <Content>
          <ImgContainer>
            <Img src="/signInbg.svg" />
          </ImgContainer>
          <TextOverlay>
            <MainText>이메일을 인증하세요.</MainText>
            <SubText>peopool로 만들어 나가는 세상</SubText>
          </TextOverlay>
        </Content>

        <Content>
          <FormContainer>
            <Logo src="/logo.svg" />
            <Label>이메일로 전송한 6자리 코드를 입력하세요.</Label>
            <CodeInputContainer>
              {code.map((value, index) => (
                <CodeInput
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e.target.value, index)}
                />
              ))}
            </CodeInputContainer>
            <ResendText>코드가 오지 않았나요?</ResendText>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <ButtonContainer>
              <Button text="인증" onClick={handleVerify} />
            </ButtonContainer>
          </FormContainer>
        </Content>
      </Container>
    </Wrap>
  );
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
  width: 48%;
  height: 80%;
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

const TextOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2.5rem;
  margin-top: 7.5rem;
`;

const MainText = styled.p`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const SubText = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  margin-top: 0.1rem;
  color: #7d7d7d;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 3rem;
  margin-top: 10rem;
  padding: 2rem 0;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 2rem;
`;

const Label = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const CodeInputContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
`;

const CodeInput = styled.input`
  width: 47px;
  height: 56px;
  font-size: 1.8rem;
  text-align: center;
  border: 3px solid #9abeec;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const ResendText = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 2rem;
  cursor: pointer;
  text-decoration: underline;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 87%;
  max-width: 400px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
