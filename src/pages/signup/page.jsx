import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import Button from "../../components/Button";

export default function SignUpPage() {
  const [nickname, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    if (!nickname) newErrors.nickname = "이름을 입력하세요";
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
      await register(password, nickname, email);
      alert("회원가입에 성공했습니다.");
      navigate("/community");
    } catch (err) {
      alert("회원가입 실패: " + err.message);
    } finally {
      setLoading(false);
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
            <MainText>{"회원 서비스를 위해 \n회원가입 해주세요."}</MainText>
            <SubText>peopool로 만들어 나가는 세상</SubText>
          </TextOverlay>
        </Content>
        <Content>
          <FormContainer>
            <div className="mb-7 mr-70">
              <Img src="/logo.svg" />
            </div>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="이름"
                value={nickname}
                onChange={(e) => setNickName(e.target.value)}
                $error={errors.nickname}
              />
              {errors.nickname && <ErrorText>{errors.nickname}</ErrorText>}

              <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                $error={errors.email}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}

              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                $error={errors.password}
              />
              {errors.password && <ErrorText>{errors.password}</ErrorText>}

              <Input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                $error={errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <ErrorText>{errors.confirmPassword}</ErrorText>
              )}

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
                <Button
                  type="submit"
                  disabled={loading}
                  variant="solid"
                  text={loading ? "가입 중..." : "회원가입"}
                />
                {/* <Button
                  type="reset"
                  onClick={() => navigate("/")}
                  variant="light"
                  text="뒤로"
                /> */}
              </ButtonContainer>
            </Form>
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
  padding: 2rem;
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
  border: 3px solid ${({ $error }) => ($error ? "red" : "#9ABEEC")};
  border-radius: 5px;
  font-size: 1rem;
  color: #374151;
  transition: all 0.2s;
  box-sizing: border-box;

  &::placeholder {
    color: #9abeec;
  }

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "red" : "#3b82f6")};
    box-shadow: 0 0 0 3px
      ${({ $error }) =>
        $error ? "rgba(255, 0, 0, 0.1)" : "rgba(59, 130, 246, 0.1)"};
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
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
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

const ErrorText = styled.div`
  font-size: 0.875rem;
  color: red;
  margin: -0.75rem 0 0.01rem;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  margin-right: 0.5rem;
  animation: ${spin} 0.6s linear infinite;
`;
