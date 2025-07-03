import React, {useState} from "react";
import styled, { keyframes } from "styled-components";
import TypingTitle from "../components/TypingTite";
import { useNavigate } from "react-router-dom";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;



export default function HomePage() {
  const [step, setStep] = useState(0); 
  const navigate = useNavigate();

  return (
    <Container>
      <HeaderContainer>
        <Logo src="/logo.png" alt="logo" />
        <ButtonGroup>
          <HeaderButton onClick={()=>navigate("/signup")}>Sign Up</HeaderButton>
          <HeaderButton onClick={()=>navigate("/signIn")}>Sign In</HeaderButton>
        </ButtonGroup>
      </HeaderContainer>

      <TitleContainer>
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
            <AnimatedHeaderButton onClick={()=>navigate("/community")}>Learn More</AnimatedHeaderButton>
        )}
      </TitleContainer>

      <LandingImg src="/landingImg.png" alt="landing" />
    </Container>
  );
}



const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-image: url("/bg.svg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding: 5%;
  padding-top: 3%;
  color: white;
  gap: 7rem;
`;
const LandingImg = styled.img`
  position: absolute;
  top: -5%;
  right: -9%;
  height: 140vh;
  z-index: 0;
`

const HeaderContainer = styled.header`
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.img`
  width: 90px;
  filter: brightness(0) invert(1);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const HeaderButton = styled.button`
  padding: 0.5rem 4rem; 
  background-color: #5f8cd6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background-color: #5a86ce;
  }
`;

const TitleContainer = styled.div`
  z-index: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2rem;
`;

const Title1 = styled.p`
  font-size: 3.5rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.5px;
  white-space: pre-line;
`;

const Title2 = styled.p`
  color: #e8f2ff;
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.5px;
  white-space: pre-line;  
`;


const AnimatedHeaderButton = styled(HeaderButton)`
  animation: ${fadeInUp} 1s ease-out forwards;
  width: fit-content;  
  align-self: flex-start; 
`;