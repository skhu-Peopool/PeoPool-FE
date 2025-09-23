import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Eye, EyeOff, Mail, Lock, Users, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { authService } from "../../lib/api/auth-service";

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

export default function SignUpPage() {
  const [nickname, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    if (!nickname) newErrors.nickname = "닉네임을 입력하세요";
    if (!email) newErrors.email = "이메일을 입력하세요";
    if (!password) newErrors.password = "비밀번호를 입력하세요";
    if (!confirmPassword) newErrors.confirmPassword = "비밀번호를 재입력하세요";
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const [isNickDuplicate, isEmailDuplicate] = await Promise.all([
        authService.checkNicknameDuplicate(nickname),
        authService.checkEmailDuplicate(email),
      ]);

      const newErrors = {};
      if (isNickDuplicate) {
        newErrors.nickname = "이미 사용 중인 닉네임입니다.";
      }
      if (isEmailDuplicate) {
        newErrors.email = "이미 사용 중인 이메일입니다.";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      await authService.sendAuthCode(email);

      navigate("/code", {
        state: { email, password, nickname },
      });
    } catch (err) {
      alert("회원가입 실패: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <SignUpCard>
        <Header>
          <Logo>
            <LogoIcon>
              <Users size={24} />
            </LogoIcon>
            <LogoText>peopool</LogoText>
          </Logo>
          <Subtitle>회원 서비스를 위해 회원가입 해주세요</Subtitle>
          <SubText>peopool로 만들어 나가는 세상</SubText>
        </Header>

        <Form>
          <InputGroup>
            <InputIcon>
              <User size={18} />
            </InputIcon>
            <Input
              type="text"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickName(e.target.value)}
              $error={errors.nickname}
            />
            {errors.nickname && <ErrorText>{errors.nickname}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <Mail size={18} />
            </InputIcon>
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              $error={errors.email}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <Lock size={18} />
            </InputIcon>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              $error={errors.password}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </PasswordToggle>
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <Lock size={18} />
            </InputIcon>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              $error={errors.confirmPassword}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </PasswordToggle>
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
          </InputGroup>

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

          <SignUpButton 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "가입 중..." : "회원가입"}
          </SignUpButton>

          <LinkContainer>
            <Link onClick={() => navigate("/signin")}>
              이미 계정이 있으신가요? 로그인하기
            </Link>
          </LinkContainer>
        </Form>
      </SignUpCard>
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

const SignUpCard = styled.div`
  width: 100%;
  max-width: 480px;
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
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
`;

const SubText = styled.p`
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0;
  font-weight: 400;
`;

const Form = styled.div`
  padding: 2.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  z-index: 2;
  transition: color 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.2rem 1rem 3.5rem;
  border: 2px solid ${({ $error }) => ($error ? "#ef4444" : "rgba(148, 163, 184, 0.3)")};
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #1f2937;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#ef4444" : "#60a5fa")};
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 4px ${({ $error }) => 
      $error ? "rgba(239, 68, 68, 0.1)" : "rgba(96, 165, 250, 0.15)"};
    transform: translateY(-1px);
  }

  &:focus + ${InputIcon} {
    color: ${({ $error }) => ($error ? "#ef4444" : "#60a5fa")};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  z-index: 3;

  &:hover {
    color: #60a5fa;
    background: rgba(96, 165, 250, 0.1);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  accent-color: #60a5fa;
  border-radius: 0.25rem;
  margin-top: 0.1rem;
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: #4b5563;
  cursor: pointer;
  font-weight: 500;
  line-height: 1.4;
`;

const SignUpButton = styled.button`
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

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(229, 231, 235, 0.5);
`;

const Link = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 500;

  &:hover {
    color: #60a5fa;
    background: rgba(96, 165, 250, 0.05);
  }
`;

const ErrorText = styled.div`
  font-size: 0.875rem;
  color: #ef4444;
  margin-top: 0.5rem;
  font-weight: 500;
  padding-left: 0.25rem;
`;