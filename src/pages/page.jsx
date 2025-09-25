import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import TypingTitle from "../components/TypingTite";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { Users, Calendar, Trophy, ArrowRight, Sparkles } from "lucide-react";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export default function HomePage() {
  const { isLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [showCards, setShowCards] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => setShowCards(true), 500);
    }
  }, [step]);

  return (
    <Container>
      <Background>
        <GradientOrb1 />
        <GradientOrb2 />
        <GradientOrb3 />
        <ParticleBackground />
      </Background>

      <ContentWrapper>
        <HeaderContainer>
          <HeaderContent>
            <LogoContainer>
              <Logo src="/logo.png" alt="logo" />
              <LogoText>Peopool</LogoText>
            </LogoContainer>
            <ButtonGroup>
              {!isLoading && (
                <>
                  <HeaderButton secondary onClick={() => navigate("/signup")}>
                    Sign Up
                  </HeaderButton>
                  <HeaderButton primary onClick={() => navigate("/signIn")}>
                    Sign In
                  </HeaderButton>
                </>
              )}
            </ButtonGroup>
          </HeaderContent>
        </HeaderContainer>

        <MainContent>
          <TitleSection>
            <TitleCard>
              {step >= 0 && (
                <TypingTitle
                  text={"손쉽게 구하는 학습 메이트,\npeopool이면 되니까."}
                  delay={90}
                  highlightWord="peopool"
                  as={Title1}
                  onDone={() => setStep(1)}
                />
              )}

              {step >= 1 && (
                <TypingTitle
                  text={"교내대회, 한솥밥, 어울림 ···\n여기서 다 되니까."}
                  delay={90}
                  as={Title2}
                  onDone={() => setStep(2)}
                />
              )}

              {step === 2 && (
                <CTAContainer>
                  <MainCTAButton onClick={() => navigate("/community")}>
                    <Sparkles size={20} />
                    지금 시작하기
                    <ArrowRight size={18} />
                  </MainCTAButton>
                  <SecondaryText>
                    이미 수많은 학습자들이 함께하고 있어요
                  </SecondaryText>
                </CTAContainer>
              )}
            </TitleCard>
          </TitleSection>

          {showCards && (
            <FeatureSection>
              <FeatureCards>
                <FeatureCard delay="0s">
                  <CardIcon>
                    <Users size={28} />
                  </CardIcon>
                  <CardTitle>스터디 그룹</CardTitle>
                  <CardDescription>
                    같은 목표를 가진 팀원들과
                    <br />
                    함께 성장하세요
                  </CardDescription>
                  <CardGlow />
                </FeatureCard>

                <FeatureCard delay="0.2s">
                  <CardIcon>
                    <Trophy size={28} />
                  </CardIcon>
                  <CardTitle>교내 대회</CardTitle>
                  <CardDescription>
                    다양한 대회와 프로젝트에
                    <br />
                    도전해보세요
                  </CardDescription>
                  <CardGlow />
                </FeatureCard>

                <FeatureCard delay="0.4s">
                  <CardIcon>
                    <Calendar size={28} />
                  </CardIcon>
                  <CardTitle>모임 관리</CardTitle>
                  <CardDescription>
                    간편한 일정 관리로
                    <br />
                    효율적인 활동을 해보세요
                  </CardDescription>
                  <CardGlow />
                </FeatureCard>
              </FeatureCards>
            </FeatureSection>
          )}
        </MainContent>

        <FloatingImageContainer>
          <LandingImg src="/landingImg.png" alt="landing" />
        </FloatingImageContainer>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #070b14 0%, #111c34 100%);
  background-size: 400% 400%;
  animation: ${gradientFlow} 20s ease infinite;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
`;

const GradientOrb1 = styled.div`
  position: absolute;
  top: -10%;
  left: -5%;
  width: 40vw;
  height: 40vw;
  background: radial-gradient(
    circle,
    rgba(96, 165, 250, 0.3) 0%,
    rgba(59, 130, 246, 0.1) 50%,
    transparent 100%
  );
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  filter: blur(1px);
`;

const GradientOrb2 = styled.div`
  position: absolute;
  top: 30%;
  right: -10%;
  width: 35vw;
  height: 35vw;
  background: radial-gradient(
    circle,
    rgba(168, 85, 247, 0.2) 0%,
    rgba(139, 92, 246, 0.1) 50%,
    transparent 100%
  );
  border-radius: 50%;
  animation: ${float} 8s ease-in-out infinite reverse;
  filter: blur(1px);
`;

const GradientOrb3 = styled.div`
  position: absolute;
  bottom: -15%;
  left: 20%;
  width: 30vw;
  height: 30vw;
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.2) 0%,
    rgba(16, 185, 129, 0.1) 50%,
    transparent 100%
  );
  border-radius: 50%;
  animation: ${float} 7s ease-in-out infinite;
  filter: blur(1px);
`;

const ParticleBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.08)"/><circle cx="40" cy="80" r="1.2" fill="rgba(255,255,255,0.06)"/><circle cx="60" cy="10" r="0.8" fill="rgba(96,165,250,0.1)"/><circle cx="10" cy="70" r="1.1" fill="rgba(168,85,247,0.08)"/></svg>');
  animation: ${float} 8s ease-in-out infinite;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.header`
  padding: 2rem;
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
  z-index: 10;
`;

const HeaderContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  padding: 1.5rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 11;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 2rem;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      rgba(96, 165, 250, 0.2),
      rgba(168, 85, 247, 0.2)
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    z-index: -1;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 12;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  filter: brightness(0) invert(1);
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #ffffff, #e0e7ff, #c7d2fe);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  z-index: 12;
`;

const HeaderButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${(props) =>
    props.primary
      ? "linear-gradient(135deg, #ffffff, #f1f5f9)"
      : "rgba(255, 255, 255, 0.15)"};
  color: ${(props) => (props.primary ? "#475569" : "white")};
  border: ${(props) =>
    props.primary ? "none" : "1px solid rgba(255, 255, 255, 0.2)"};
  border-radius: 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  z-index: 13;
  pointer-events: auto;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${(props) =>
      props.primary
        ? "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)"
        : "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)"};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    background: ${(props) =>
      props.primary
        ? "linear-gradient(135deg, #f1f5f9, #e2e8f0)"
        : "rgba(255, 255, 255, 0.25)"};
    box-shadow: ${(props) =>
      props.primary
        ? "0 8px 30px rgba(255, 255, 255, 0.4)"
        : "0 8px 25px rgba(255, 255, 255, 0.2)"};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  gap: 3rem;
  position: relative;
  z-index: 2;
`;

const TitleSection = styled.div`
  animation: ${fadeIn} 1s ease-out 0.1s both;
`;

const TitleCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  border-radius: 2.5rem;
  padding: 3.5rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 850px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(96, 165, 250, 0.8),
      rgba(168, 85, 247, 0.8),
      transparent
    );
    animation: ${shimmer} 3s ease-in-out infinite;
    z-index: -1;
  }
`;

const Title1 = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  white-space: pre-line;
  background: linear-gradient(135deg, #ffffff, #e0e7ff, #c7d2fe);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const Title2 = styled.p`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.01em;
  white-space: pre-line;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
`;

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const MainCTAButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.4rem 3rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
  background-size: 200% 200%;
  color: white;
  border: none;
  border-radius: 1.2rem;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${gradientFlow} 3s ease infinite;
  width: fit-content;
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 60px rgba(59, 130, 246, 0.4);
    animation-duration: 1.5s;

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.01);
  }
`;

const SecondaryText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin: 0;
`;

const FeatureSection = styled.div`
  animation: ${slideUp} 1s ease-out 0.3s both;
`;

const FeatureCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(25px);
  border-radius: 2rem;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeInUp} 0.8s ease-out ${(props) => props.delay} both;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #60a5fa, #3b82f6, #8b5cf6);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.03);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(96, 165, 250, 0.3);
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const CardGlow = styled.div`
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    135deg,
    rgba(96, 165, 250, 0.2),
    rgba(168, 85, 247, 0.2)
  );
  border-radius: 2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;

  ${FeatureCard}:hover & {
    opacity: 1;
  }
`;

const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  background: linear-gradient(135deg, #60a5fa, #3b82f6, #8b5cf6);
  border-radius: 1.2rem;
  color: white;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 25px rgba(96, 165, 250, 0.3);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 1.2rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  ${FeatureCard}:hover & {
    &::before {
      opacity: 1;
    }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1rem 0;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
`;

const FloatingImageContainer = styled.div`
  position: absolute;
  top: 8%;
  right: -2%;
  z-index: 2;
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const LandingImg = styled.img`
  height: 85vh;
  max-height: 650px;
  opacity: 0.7;
  filter: drop-shadow(0 0 60px rgba(96, 165, 250, 0.2));
`;
