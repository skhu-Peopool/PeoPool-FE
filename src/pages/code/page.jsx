import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail, Users, RotateCcw } from "lucide-react";
import Button from "../../components/Button";
import { authService } from "../../lib/api/auth-service";
import { useAuth } from "../../providers/AuthProvider";

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

export default function EmailCodePage() {
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
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
      setError(""); // 입력 시 에러 메시지 제거

      // 다음 input으로 이동
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // 백스페이스 처리
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    try {
      await authService.sendAuthCode(email);
      alert("인증 코드가 다시 전송되었습니다.");
      setCode(Array(6).fill(""));
      setError("");
    } catch (err) {
      alert("코드 재전송 실패: " + err.message);
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerify = async () => {
    const finalCode = code.join("");

    if (finalCode.length !== 6) {
      setError("6자리 코드를 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const numericCode = Number(finalCode);
      console.log("Verifying with:", { email, numericCode });

      await authService.verifyAuthCode(email, numericCode);
      await register(password, nickname, email);

      alert("회원가입이 완료되었습니다!");
      navigate("/community");
    } catch (err) {
      console.error(err);
      setError("인증 실패: " + (err?.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <CodeCard>
        <Header>
          <Logo>
            <LogoIcon>
              <Users size={24} />
            </LogoIcon>
            <LogoText>peopool</LogoText>
          </Logo>
          <Subtitle>이메일을 인증하세요</Subtitle>
          <SubText>peopool로 만들어 나가는 세상</SubText>
        </Header>

        <Content>
          <MailIcon>
            <Mail size={48} />
          </MailIcon>
          
          <Description>
            <strong>{email}</strong>로 전송한 6자리 코드를 입력하세요
          </Description>

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
                onKeyDown={(e) => handleKeyDown(e, index)}
                $hasValue={value !== ""}
                $error={error !== ""}
              />
            ))}
          </CodeInputContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <VerifyButton 
            onClick={handleVerify}
            disabled={loading || code.join("").length !== 6}
          >
            {loading ? "인증 중..." : "인증하기"}
          </VerifyButton>

          <ResendContainer>
            <ResendText>코드가 오지 않았나요?</ResendText>
            <ResendButton
              onClick={handleResendCode}
              disabled={resendLoading}
            >
              {resendLoading ? (
                <>
                  <RotatingIcon>
                    <RotateCcw size={16} />
                  </RotatingIcon>
                  재전송 중...
                </>
              ) : (
                <>
                  <RotateCcw size={16} />
                  코드 재전송
                </>
              )}
            </ResendButton>
          </ResendContainer>
        </Content>
      </CodeCard>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
    animation: ${float} 6s ease-in-out infinite;
  }
`;

const CodeCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  animation: ${slideUp} 1s ease-out both;
`;

const Header = styled.div`
  padding: 3rem 2rem 2rem 2rem;
  text-align: center;
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.3);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LogoIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 20px rgba(96, 165, 250, 0.3);
`;

const LogoText = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1f2937, #374151);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
`;

const SubText = styled.p`
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0;
  font-weight: 400;
`;

const Content = styled.div`
  padding: 3rem 2.5rem;
  text-align: center;
`;

const MailIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 2rem auto;
  box-shadow: 0 8px 32px rgba(96, 165, 250, 0.3);
`;

const Description = styled.p`
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 3rem;
  line-height: 1.5;
  
  strong {
    color: #1f2937;
    font-weight: 600;
  }
`;

const CodeInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CodeInput = styled.input`
  width: 60px;
  height: 70px;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  border: 2px solid ${({ $error, $hasValue }) => 
    $error ? "#ef4444" : 
    $hasValue ? "#60a5fa" : "rgba(148, 163, 184, 0.3)"};
  border-radius: 1rem;
  color: #1f2937;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#ef4444" : "#60a5fa")};
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 4px ${({ $error }) => 
      $error ? "rgba(239, 68, 68, 0.1)" : "rgba(96, 165, 250, 0.15)"};
    transform: translateY(-2px) scale(1.05);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const ErrorMessage = styled.div`
  font-size: 0.875rem;
  color: #ef4444;
  margin-bottom: 1.5rem;
  font-weight: 500;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.75rem;
  border-radius: 0.5rem;
  border-left: 4px solid #ef4444;
`;

const VerifyButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(96, 165, 250, 0.3);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 30px rgba(96, 165, 250, 0.4);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  &:disabled {
    background: linear-gradient(135deg, #9ca3af, #6b7280);
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 10px rgba(156, 163, 175, 0.3);
  }
`;

const ResendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(229, 231, 235, 0.5);
`;

const ResendText = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
`;

const ResendButton = styled.button`
  background: none;
  border: 2px solid rgba(96, 165, 250, 0.3);
  font-size: 0.9rem;
  color: #60a5fa;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: rgba(96, 165, 250, 0.1);
    border-color: #60a5fa;
    transform: translateY(-1px);
  }

  &:disabled {
    color: #9ca3af;
    border-color: rgba(156, 163, 175, 0.3);
    cursor: not-allowed;
    transform: none;
  }
`;

const RotatingIcon = styled.div`
  animation: ${pulse} 1s ease-in-out infinite;
  
  svg {
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;