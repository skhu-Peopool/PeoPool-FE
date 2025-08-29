import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Edit3, Search, Calendar, Users, Clock, Eye, MessageCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    content: '';
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

const ControlsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 1s ease-out 0.1s both;
`;

const Controls = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
`;

const WriteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ffffff, #f1f5f9);
  color: #475569;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 30px rgba(255, 255, 255, 0.4);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.3);
  }
  
  option {
    background: #3b82f6;
    color: white;
  }
`;

const DateInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.3);
  }
  
  &::-webkit-calendar-picker-indicator {
    filter: brightness(0) invert(1);
    opacity: 0.7;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
  animation: ${slideUp} 1s ease-out 0.3s both;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 1.5rem;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #60a5fa, #3b82f6, #93c5fd);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Category = styled.span`
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  color: #4338ca;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const Status = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.status) {
      case "모집 중":
        return "linear-gradient(135deg, #fef3c7, #fed7af)";
      case "검토 중":
        return "linear-gradient(135deg, #d1fae5, #a7f3d0)";
      case "모집마감":
        return "linear-gradient(135deg, #bfdbfe, #93c5fd)";
      case "모집예정":
        return "linear-gradient(135deg, #fed7e2, #fbb6ce)";
      default:
        return "linear-gradient(135deg, #e5e7eb, #d1d5db)";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "모집 중":
        return "#92400e";
      case "검토 중":
        return "#065f46";
      case "모집마감":
        return "#1e40af";
      case "모집예정":
        return "#be185d";
      default:
        return "#374151";
    }
  }};
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${(props) => props.color || "linear-gradient(135deg, #60a5fa, #3b82f6)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 4px 20px rgba(96, 165, 250, 0.3);
`;

const AuthorName = styled.span`
  font-weight: 500;
  color: #374151;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RecruitInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const RecruitProgress = styled.div`
  flex: 1;
  margin-right: 1rem;
`;

const ProgressText = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #60a5fa, #3b82f6);
  width: ${(props) => props.percentage}%;
  transition: width 0.3s ease;
`;

const ApplyButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(96, 165, 250, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  animation: ${fadeIn} 1s ease-out 0.5s both;
`;

const Pagination = styled.div`
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const PageButton = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: ${(props) => 
    props.active 
      ? 'linear-gradient(135deg, #ffffff, #f1f5f9)' 
      : 'transparent'
  };
  color: ${(props) => props.active ? '#475569' : 'rgba(255, 255, 255, 0.8)'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${(props) => 
      props.active 
        ? 'linear-gradient(135deg, #f1f5f9, #e2e8f0)' 
        : 'rgba(255, 255, 255, 0.1)'
    };
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
`;

// Mock data
const mockOrders = [
  {
    id: 1,
    title: "React 프론트엔드 개발자 모집",
    category: "프로젝트",
    status: "모집 중",
    name: "김민수",
    initial: "김",
    color: "linear-gradient(135deg, #f59e0b, #d97706)",
    date: "2025-09-15",
    currentApplicants: 3,
    maxApplicants: 5,
    views: 124
  },
  {
    id: 2,
    title: "UX/UI 디자인 스터디 참여자 모집",
    category: "스터디",
    status: "모집 중",
    name: "이지혜",
    initial: "이",
    color: "linear-gradient(135deg, #ec4899, #be185d)",
    date: "2025-09-20",
    currentApplicants: 2,
    maxApplicants: 6,
    views: 89
  },
  {
    id: 3,
    title: "AI 기반 챗봇 개발 프로젝트",
    category: "프로젝트",
    status: "검토 중",
    name: "박준혁",
    initial: "박",
    color: "linear-gradient(135deg, #10b981, #059669)",
    date: "2025-09-10",
    currentApplicants: 4,
    maxApplicants: 4,
    views: 203
  },
  {
    id: 4,
    title: "창업 동아리 신규 멤버 모집",
    category: "동아리",
    status: "모집예정",
    name: "정수아",
    initial: "정",
    color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    date: "2025-10-01",
    currentApplicants: 0,
    maxApplicants: 8,
    views: 45
  },
  {
    id: 5,
    title: "해커톤 팀원 모집 (백엔드 개발자)",
    category: "경진대회",
    status: "모집마감",
    name: "최영호",
    initial: "최",
    color: "linear-gradient(135deg, #ef4444, #dc2626)",
    date: "2025-08-30",
    currentApplicants: 3,
    maxApplicants: 3,
    views: 167
  },
  {
    id: 6,
    title: "모바일 앱 개발 스터디 그룹",
    category: "스터디",
    status: "모집 중",
    name: "한소영",
    initial: "한",
    color: "linear-gradient(135deg, #06b6d4, #0891b2)",
    date: "2025-09-25",
    currentApplicants: 1,
    maxApplicants: 4,
    views: 78
  }
];

const ITEMS_PER_PAGE = 6;

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("2025-08-27");
  const [endDate, setEndDate] = useState("2025-09-30");
  
  const statusOptions = ["전체", "모집 중", "검토 중", "모집마감", "모집예정"];
  const [status, setStatus] = useState(statusOptions[0]);
  
  const categoryOptions = ["전체", "프로젝트", "스터디", "동아리", "경진대회", "공모전"];
  const [category, setCategory] = useState(categoryOptions[0]);
  
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = status === "전체" || order.status === status;
    const matchesCategory = category === "전체" || order.category === category;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/community/${id}`)
  };

  const handleApply = (e, id) => {
    e.stopPropagation();
    console.log(`Apply to post ${id}`);

  };

  const handleWriteClick = () => {
    navigate("/posts");
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <HeaderContent>
            <TitleWrapper>
              <Users color="white" size={40} />
              <Title>Community</Title>
            </TitleWrapper>
            <Subtitle>{filteredOrders.length}개의 모집 공고가 있습니다</Subtitle>
          </HeaderContent>
        </Header>

        <ControlsSection>
          <Controls>
            <SearchContainer>
              <SearchIcon size={20} />
              <SearchInput
                type="text"
                placeholder="프로젝트나 팀을 검색해보세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
            
            <WriteButton onClick={handleWriteClick}>
              <Edit3 size={18} />
              글쓰기
            </WriteButton>
          </Controls>

          <Filters>
            <FilterGroup>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
              
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
            </FilterGroup>
            
            <FilterGroup>
              <Calendar size={16} color="rgba(255, 255, 255, 0.8)" />
              <DateInput
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span style={{color: 'rgba(255, 255, 255, 0.8)'}}>~</span>
              <DateInput
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FilterGroup>
          </Filters>
        </ControlsSection>

        <CardGrid>
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => {
              const progressPercentage = (order.currentApplicants / order.maxApplicants) * 100;
              
              return (
                <Card
                  key={order.id}
                  onClick={() => handleCardClick(order.id)}
                >
                  <CardHeader>
                    <Category>{order.category}</Category>
                    <Status status={order.status}>{order.status}</Status>
                  </CardHeader>
                  
                  <CardTitle>{order.title}</CardTitle>
                  
                  <AuthorInfo>
                    <Avatar color={order.color}>
                      {order.initial}
                    </Avatar>
                    <AuthorName>{order.name}</AuthorName>
                  </AuthorInfo>
                  
                  <CardMeta>
                    <MetaItem>
                      <Clock size={14} />
                      마감: {order.date}
                    </MetaItem>
                    <MetaItem>
                      <Eye size={14} />
                      {order.views}
                    </MetaItem>
                  </CardMeta>
                  
                  <RecruitInfo>
                    <RecruitProgress>
                      <ProgressText>
                        모집현황: {order.currentApplicants} / {order.maxApplicants}명
                      </ProgressText>
                      <ProgressBar>
                        <ProgressFill percentage={progressPercentage} />
                      </ProgressBar>
                    </RecruitProgress>
                    
                    <ApplyButton
                      onClick={(e) => handleApply(e, order.id)}
                      disabled={order.status === "모집마감" || order.status === "모집예정"}
                    >
                      {order.status === "모집마감" ? "마감됨" : 
                       order.status === "모집예정" ? "예정" : "지원하기"}
                    </ApplyButton>
                  </RecruitInfo>
                </Card>
              );
            })
          ) : (
            <EmptyState>
              <Users size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ marginBottom: '0.5rem' }}>검색 결과가 없습니다</h3>
              <p>다른 검색어나 필터를 사용해보세요</p>
            </EmptyState>
          )}
        </CardGrid>

        {totalPages > 1 && (
          <PaginationContainer>
            <Pagination>
              {Array.from({ length: totalPages }, (_, i) => (
                <PageButton
                  key={i + 1}
                  active={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PageButton>
              ))}
            </Pagination>
          </PaginationContainer>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default CommunityPage;