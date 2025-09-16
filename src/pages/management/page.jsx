import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Users, Clock, CheckCircle, XCircle, Eye, User, Mail, Phone } from "lucide-react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
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

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const HeaderContent = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  font-weight: 300;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease-out 0.1s both;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 500;
`;

const ApplicationList = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${slideUp} 1s ease-out 0.3s both;
`;

const ApplicationCard = styled.div`
  background: ${(props) => 
    props.status === "rejected" 
      ? "linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.95))" 
      : "rgba(255, 255, 255, 0.95)"
  };
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 1.5rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${(props) => 
    props.status === "rejected" 
      ? "rgba(203, 213, 225, 0.8)" 
      : "rgba(255, 255, 255, 0.3)"
  };
  box-shadow: ${(props) => 
    props.status === "rejected" 
      ? "0 10px 40px rgba(148, 163, 184, 0.15)" 
      : "0 10px 40px rgba(0, 0, 0, 0.1)"
  };
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => 
      props.status === "rejected" 
        ? "linear-gradient(90deg, #cbd5e1, #94a3b8, #cbd5e1)"
        : "linear-gradient(90deg, #60a5fa, #3b82f6, #93c5fd)"
    };
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  ${(props) => props.status === "rejected" && `
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 10px,
        rgba(203, 213, 225, 0.1) 10px,
        rgba(203, 213, 225, 0.1) 20px
      );
      pointer-events: none;
    }
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${(props) => 
      props.status === "rejected" 
        ? "0 20px 60px rgba(148, 163, 184, 0.25)" 
        : "0 20px 60px rgba(0, 0, 0, 0.15)"
    };

    &::before {
      transform: scaleX(1);
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ApplicationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${(props) => 
    props.status === "rejected" 
      ? "linear-gradient(135deg, #e2e8f0, #cbd5e1)"
      : "linear-gradient(135deg, #60a5fa, #3b82f6)"
  };
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.status === "rejected" ? "#64748b" : "white"};
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: ${(props) => 
    props.status === "rejected" 
      ? "0 4px 20px rgba(203, 213, 225, 0.4)"
      : "0 4px 20px rgba(96, 165, 250, 0.3)"
  };
`;

const UserDetails = styled.div``;

const UserName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.status === "rejected" ? "#64748b" : "#1f2937"};
  margin-bottom: 0.25rem;
`;

const UserRole = styled.span`
  color: ${(props) => props.status === "rejected" ? "#94a3b8" : "#6b7280"};
  font-size: 0.875rem;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.status) {
      case "pending":
        return "linear-gradient(135deg, #fef3c7, #fed7af)";
      case "approved":
        return "linear-gradient(135deg, #d1fae5, #a7f3d0)";
      case "rejected":
        return "linear-gradient(135deg, #fee2e2, #fecaca)";
      default:
        return "linear-gradient(135deg, #e5e7eb, #d1d5db)";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#92400e";
      case "approved":
        return "#065f46";
      case "rejected":
        return "#dc2626";
      default:
        return "#374151";
    }
  }};
`;

const ApplicationContent = styled.div`
  margin-bottom: 1.5rem;
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.status === "rejected" ? "#94a3b8" : "#6b7280"};
  font-size: 0.875rem;
`;

const ApplicationText = styled.div`
  background: ${(props) => 
    props.status === "rejected" 
      ? "rgba(156, 163, 175, 0.1)" 
      : "rgba(59, 130, 246, 0.05)"
  };
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1rem;
`;

const ApplicationLabel = styled.div`
  font-weight: 600;
  color: ${(props) => props.status === "rejected" ? "#9ca3af" : "#374151"};
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const ApplicationMessage = styled.p`
  color: ${(props) => props.status === "rejected" ? "#9ca3af" : "#4b5563"};
  line-height: 1.6;
  margin: 0;
`;

const ApplicationDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.status === "rejected" ? "#9ca3af" : "#6b7280"};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  justify-content: center;

  &.approve {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #059669, #047857);
      transform: scale(1.05);
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
    }
  }

  &.reject {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      transform: scale(1.05);
      box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
    }
  }

  &.view {
    background: linear-gradient(135deg, #6b7280, #4b5563);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #4b5563, #374151);
      transform: scale(1.05);
      box-shadow: 0 4px 20px rgba(107, 114, 128, 0.4);
    }
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    background: #d1d5db;
    color: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const ApplicationManagementPage = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      userName: "박대경",
      userEmail: "park@hansiyeon.com",
      role: "Frontend Developer",
      applicationDate: "2024-01-15",
      message: "안녕하세요! 프론트엔드 개발자로 참여하고 싶습니다. React와 TypeScript에 능숙하며, 특히 사용자 인터페이스 개발에 관심이 많습니다. 팀과 함께 좋은 프로젝트를 만들어가고 싶습니다.",
      status: "pending"
    },
    {
      id: 2,
      userName: "김다은",
      userEmail: "kim@hansiyeon.com",
      role: "UI/UX Designer",
      applicationDate: "2024-01-14",
      message: "디자인 분야에서 5년간 경험을 쌓아왔습니다. 사용자 중심의 디자인을 통해 더 나은 서비스를 만들고 싶습니다. 피그마와 어도비 툴에 능숙합니다.",
      status: "approved"
    },
    {
      id: 3,
      userName: "최현서",
      userEmail: "choi@hansiyeon.com",
      role: "Data Analyst",
      applicationDate: "2024-01-12",
      message: "데이터 분석을 통해 비즈니스 인사이트를 도출하는 것을 좋아합니다. Python, SQL, Tableau 등을 활용한 분석 경험이 있습니다.",
      status: "pending"
    },
    {
      id: 4,
      userName: "김명철",
      userEmail: "kim@hansiyeon.com",
      role: "Backend Developer",
      applicationDate: "2024-01-13",
      message: "백엔드 개발 경험이 3년 정도 있습니다. Node.js와 Python을 주로 사용하며, 데이터베이스 설계와 API 개발에 관심이 많습니다.",
      status: "rejected"
    }
  ]);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    const total = applications.length;
    const pending = applications.filter(app => app.status === "pending").length;
    const approved = applications.filter(app => app.status === "approved").length;
    const rejected = applications.filter(app => app.status === "rejected").length;

    setStats({ total, pending, approved, rejected });
  }, [applications]);

  const handleApprove = (id) => {
    if (window.confirm("이 지원자를 승인하시겠습니까?")) {
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: "approved" } : app
        )
      );
      alert("지원자가 승인되었습니다.");
    }
  };

  const handleReject = (id) => {
    if (window.confirm("이 지원자를 거절하시겠습니까?")) {
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: "rejected" } : app
        )
      );
      alert("지원자가 거절되었습니다.");
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending": return "검토 중";
      case "approved": return "승인됨";
      case "rejected": return "거절됨";
      default: return "알 수 없음";
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <HeaderContent>
            <TitleWrapper>
              <Users color="white" size={40} />
              <Title>신청자 관리</Title>
            </TitleWrapper>
            <Subtitle>지원자들의 신청서를 검토하고 승인/거절을 결정하세요</Subtitle>
          </HeaderContent>
        </Header>

        <StatsSection>
          <StatCard>
            <StatNumber>{stats.total}</StatNumber>
            <StatLabel>총 지원자</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.pending}</StatNumber>
            <StatLabel>검토 대기</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.approved}</StatNumber>
            <StatLabel>승인됨</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.rejected}</StatNumber>
            <StatLabel>거절됨</StatLabel>
          </StatCard>
        </StatsSection>

        <ApplicationList>
          {applications.length > 0 ? (
            applications.map((application) => (
              <ApplicationCard key={application.id} status={application.status}>
                <ApplicationHeader>
                  <UserInfo>
                    <Avatar>
                      {application.userName.charAt(0)}
                    </Avatar>
                    <UserDetails>
                      <UserName status={application.status}>{application.userName}</UserName>
                      <UserRole status={application.status}>{application.role}</UserRole>
                    </UserDetails>
                  </UserInfo>
                  <StatusBadge status={application.status}>
                    {getStatusText(application.status)}
                  </StatusBadge>
                </ApplicationHeader>

                <ApplicationContent>
                  <ContactInfo>
                    <ContactItem status={application.status}>
                      <Mail size={16} />
                      {application.userEmail}
                    </ContactItem>
                  </ContactInfo>

                  <ApplicationDate status={application.status}>
                    <Clock size={16} />
                    지원일: {application.applicationDate}
                  </ApplicationDate>

                  <ApplicationText status={application.status}>
                    <ApplicationLabel status={application.status}>지원 메시지</ApplicationLabel>
                    <ApplicationMessage status={application.status}>
                      {application.message}
                    </ApplicationMessage>
                  </ApplicationText>
                </ApplicationContent>

                <ActionButtons>
                  <ActionButton className="view">
                    <Eye size={16} />
                    상세보기
                  </ActionButton>
                  
                  {application.status === "pending" && (
                    <>
                      <ActionButton 
                        className="approve"
                        onClick={() => handleApprove(application.id)}
                      >
                        <CheckCircle size={16} />
                        승인하기
                      </ActionButton>
                      <ActionButton 
                        className="reject"
                        onClick={() => handleReject(application.id)}
                      >
                        <XCircle size={16} />
                        거절하기
                      </ActionButton>
                    </>
                  )}
                </ActionButtons>
              </ApplicationCard>
            ))
          ) : (
            <EmptyState>
              <h3 style={{margin: 0}}>신청자가 없습니다</h3>
            </EmptyState>
          )}
        </ApplicationList>
      </ContentWrapper>
    </Container>
  );
};

export default ApplicationManagementPage;