import React, { useState } from "react";
import styled, { css, keyframes } from 'styled-components';
import { Users, Clock, CheckCircle, XCircle, Eye, Mail, Edit3, Search, Award } from "lucide-react";
import mockOrders from '../../lib/ordersData';
import Header from "../../components/Header";
// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

// --- Base Layout ---
const PageWrapper = styled.div`
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

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

// --- Stat Cards ---
const StatCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: ${fadeIn} 1s ease-out 0.2s both;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StatValue = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0.25rem;
`;

const StatLabel = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
`;

const IconWrapper = styled.div`
  padding: 0.75rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bgColor};
`;

// --- Main Layout & Panels ---
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  animation: ${slideUp} 1s ease-out 0.4s both;
  @media (min-width: 1024px) {
    grid-template-columns: minmax(350px, 1fr) 2fr;
  }
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.05);
`;

const PanelTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
`;

// --- Left Panel: Post List ---
const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
`;

const PostItem = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  background: ${props => props.isSelected ? 'linear-gradient(135deg, #e0f2fe, #dbeafe)' : 'white'};
  border: 1px solid ${props => props.isSelected ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0,0,0,0.08)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    border-color: rgba(59, 130, 246, 0.4);
  }
`;

const NewApplicationBadge = styled.div`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background: linear-gradient(135deg, #fb923c, #f97316);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(249, 115, 22, 0.3);
`;

const PostTitle = styled.h4`
  font-weight: 600;
  color: #111827;
  margin: 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  white-space: nowrap;
  ${(props) => {
    switch (props.type) {
      case 'category':
        return css`
          background-color: ${props.category === '동아리' ? '#e9d5ff' : 
                           props.category === '어울림' ? '#dbeafe' :
                           props.category === '경진대회' ? '#dcfce7' :
                           props.category === '공모전' ? '#fef3c7' : '#f3f4f6'};
          color: ${props.category === '동아리' ? '#7c3aed' : 
                 props.category === '어울림' ? '#2563eb' :
                 props.category === '경진대회' ? '#16a34a' :
                 props.category === '공모전' ? '#d97706' : '#4b5563'};
        `;
      case 'status':
        return css`
          background-color: ${props.status === '모집 중' ? '#dcfce7' : 
                           props.status === '검토 중' ? '#fef3c7' :
                           props.status === '모집마감' ? '#fee2e2' : '#f3f4f6'};
          color: ${props.status === '모집 중' ? '#16a34a' : 
                 props.status === '검토 중' ? '#d97706' :
                 props.status === '모집마감' ? '#dc2626' : '#4b5563'};
        `;
      default: return '';
    }
  }}
`;

// --- Right Panel: Applications ---
const ControlsPanel = styled(Panel)`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
`;

const ApplicationsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 0.75rem;
  background: white;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  
  ${props => props.isActive ?
    css`
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      color: white;
      box-shadow: 0 4px 15px rgba(96, 165, 250, 0.4);
      transform: translateY(-2px);
    ` :
    css`
      background-color: white;
      color: #4b5563;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      &:hover {
        background-color: #f9fafb;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.08);
      }
    `}
`;

const ApplicationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
`;

const ApplicationItem = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0,0,0,0.08);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ApplicationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  ${(props) => {
    switch (props.status) {
      case 'rejected': return 'background: linear-gradient(135deg, #9ca3af, #6b7280);';
      case 'approved': return 'background: linear-gradient(135deg, #4ade80, #22c55e);';
      default: return 'background: linear-gradient(135deg, #60a5fa, #3b82f6);';
    }
  }}
`;

const UserDetails = styled.div``;

const UserName = styled.h4`
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
`;

const UserContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const StatusTag = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  ${(props) => {
    switch (props.status) {
      case 'pending': return 'background-color: #fef3c7; color: #92400e;';
      case 'approved': return 'background-color: #dcfce7; color: #14532d;';
      case 'rejected': return 'background-color: #fee2e2; color: #991b1b;';
      default: return '';
    }
  }}
`;

const SkillsContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: #f3f4f6;
  color: #4b5563;
  border-radius: 0.5rem;
  font-size: 0.875rem;
`;

const MessageBubble = styled.div`
  background-color: #f9fafb;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e5e7eb;
`;

const MessageText = styled.p`
  color: #374151;
  line-height: 1.625;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  }
  &:active {
    transform: translateY(0px);
  }
`;

const ViewButton = styled(Button)`
  color: #4b5563;
  background-color: white;
`;

const RejectButton = styled(Button)`
  color: white;
  background: linear-gradient(135deg, #f87171, #ef4444);
`;

const ApproveButton = styled(Button)`
  color: white;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
`;

const EmptyState = styled.div`
  padding: 4rem 2rem;
  text-align: center;
`;

const EmptyIcon = styled(Users)`
  margin: 0 auto 1rem;
  color: #9ca3af;
`;

const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const EmptySubtitle = styled.p`
  color: #6b7280;
`;


const ApplicationManagementPage = () => {
  const [myPosts] = useState(
    mockOrders.map(order => ({
      id: order.id,
      title: order.title,
      category: order.category,
      recruitmentPeriod: `${order.date} ~ 2025-09-30`,
      maxPeople: order.maxApplicants,
      status: order.status === '모집 중' ? 'RECRUITING' : 'CLOSED',
      hasNewApplications: Math.random() > 0.5,
    }))
  );

  const [allApplications, setAllApplications] = useState(() => {
    const applications = {};

    //이거 걍 랜덤으로 돌려서 값 임의로 나오게 한 거임
    myPosts.forEach(post => {
      const applicantCount = Math.floor(Math.random() * 8) + 1;
      applications[post.id] = Array.from({ length: applicantCount }, (_, index) => ({
        id: post.id * 100 + index + 1,
        userName: `신청자 ${post.id}-${index + 1}`,
        userEmail: `user${post.id}${index + 1}@example.com`,
        applicationDate: `2025-08-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
        message: `안녕하세요! ${post.title}에 지원하게 되어 기쁩니다. 관련 경험과 열정을 가지고 있어 팀에 기여할 수 있을 것 같습니다.`,
        status: ["pending", "approved", "rejected"][Math.floor(Math.random() * 3)],
        skills: ["React", "Node.js", "Python", "Figma", "TypeScript"].slice(0, Math.floor(Math.random() * 3) + 1),
      }));
    });
    return applications;
  });

  const [selectedPostId, setSelectedPostId] = useState(myPosts[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const selectedPost = myPosts.find((p) => p.id === selectedPostId) || null;
  const allAppsForPost = selectedPostId ? allApplications[selectedPostId] || [] : [];
  
  const filteredApplications = allAppsForPost.filter((app) => {
    const matchesSearch = app.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalApplications = Object.values(allApplications).flat().length;
  const pendingApplications = Object.values(allApplications).flat().filter(a => a.status === "pending").length;
  const approvedApplications = Object.values(allApplications).flat().filter(a => a.status === "approved").length;
  const rejectedApplications = Object.values(allApplications).flat().filter(a => a.status === "rejected").length;

  const handleApprove = (id) => {
    setAllApplications((prev) => ({
      ...prev,
      [selectedPostId]: prev[selectedPostId].map((a) =>
        a.id === id ? { ...a, status: "approved" } : a
      ),
    }));
  };

  const handleReject = (id) => {
    setAllApplications((prev) => ({
      ...prev,
      [selectedPostId]: prev[selectedPostId].map((a) =>
        a.id === id ? { ...a, status: "rejected" } : a
      ),
    }));
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
    <PageWrapper>
      <ContentContainer>
        <Header icon={<Users color="white" size={32} />} title={'신청자 관리'} subTitle={'지원자들의 신청서를 검토하고 관리하세요'}/>
        <StatCardsGrid>
          <StatCard>
            <div>
              <StatLabel>전체 신청서</StatLabel>
              <StatValue style={{ color: 'white' }}>{totalApplications}</StatValue>
            </div>
            <IconWrapper bgColor="rgba(255, 255, 255, 0.15)">
              <Users color="white" size={24} />
            </IconWrapper>
          </StatCard>
          <StatCard>
            <div>
              <StatLabel>검토 대기</StatLabel>
              <StatValue style={{ color: '#fcd34d' }}>{pendingApplications}</StatValue>
            </div>
            <IconWrapper bgColor="rgba(251, 191, 36, 0.2)">
              <Clock color="#fcd34d" size={24} />
            </IconWrapper>
          </StatCard>
          <StatCard>
            <div>
              <StatLabel>승인 완료</StatLabel>
              <StatValue style={{ color: '#86efac' }}>{approvedApplications}</StatValue>
            </div>
            <IconWrapper bgColor="rgba(134, 239, 172, 0.2)">
              <CheckCircle color="#86efac" size={24} />
            </IconWrapper>
          </StatCard>
          <StatCard>
            <div>
              <StatLabel>거절</StatLabel>
              <StatValue style={{ color: '#fca5a5' }}>{rejectedApplications}</StatValue>
            </div>
            <IconWrapper bgColor="rgba(252, 165, 165, 0.2)">
              <XCircle color="#fca5a5" size={24} />
            </IconWrapper>
          </StatCard>
        </StatCardsGrid>

        <MainGrid>
          <Panel>
            <PanelHeader>
              <Edit3 size={24} color="#3b82f6" />
              <PanelTitle>내가 작성한 공고</PanelTitle>
            </PanelHeader>
            <PostList>
              {myPosts.map((post) => (
                <PostItem
                  key={post.id}
                  onClick={() => setSelectedPostId(post.id)}
                  isSelected={selectedPostId === post.id}
                >
                  {post.hasNewApplications && <NewApplicationBadge>NEW</NewApplicationBadge>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Tag type="category" category={post.category}>{post.category}</Tag>
                    <Tag type="status" status={post.status === 'RECRUITING' ? '모집 중' : '모집마감'}>
                      {post.status === 'RECRUITING' ? '모집 중' : '모집마감'}
                    </Tag>
                  </div>
                  <PostTitle>{post.title}</PostTitle>
                  <PostInfo>
                    <span>신청 {allApplications[post.id]?.length || 0}명</span>
                    <span>정원 {post.maxPeople}명</span>
                  </PostInfo>
                </PostItem>
              ))}
            </PostList>
          </Panel>

          <div>
            {selectedPost ? (
              <>
                <ControlsPanel>
                  <ApplicationsHeader>
                    <SearchInputContainer>
                      <SearchIcon size={20} />
                      <SearchInput
                        type="text"
                        placeholder="이름, 이메일로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </SearchInputContainer>
                    <FilterButtons>
                      <FilterButton isActive={statusFilter === "all"} onClick={() => setStatusFilter("all")}>전체</FilterButton>
                      <FilterButton isActive={statusFilter === "pending"} onClick={() => setStatusFilter("pending")}>검토중</FilterButton>
                      <FilterButton isActive={statusFilter === "approved"} onClick={() => setStatusFilter("approved")}>승인됨</FilterButton>
                      <FilterButton isActive={statusFilter === "rejected"} onClick={() => setStatusFilter("rejected")}>거절됨</FilterButton>
                    </FilterButtons>
                  </ApplicationsHeader>
                </ControlsPanel>

                <Panel>
                  <PanelHeader>
                    <Users size={24} color="#3b82f6" />
                    <PanelTitle>신청자 목록 ({filteredApplications.length}명)</PanelTitle>
                  </PanelHeader>
                  
                  {filteredApplications.length > 0 ? (
                    <ApplicationList>
                      {filteredApplications.map((application) => (
                        <ApplicationItem key={application.id}>
                          <ApplicationHeader>
                            <UserInfo>
                              <Avatar status={application.status}>
                                {application.userName.charAt(0)}
                              </Avatar>
                              <UserDetails>
                                <UserName>{application.userName}</UserName>
                                <UserContactInfo>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={14} />{application.userEmail}</div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} />{application.applicationDate}</div>
                                </UserContactInfo>
                              </UserDetails>
                            </UserInfo>
                            <StatusTag status={application.status}>
                              {getStatusText(application.status)}
                            </StatusTag>
                          </ApplicationHeader>
                          <SkillsContainer>
                            {application.skills.map((skill, index) => (
                              <SkillBadge key={index}>{skill}</SkillBadge>
                            ))}
                          </SkillsContainer>
                          <MessageBubble>
                            <MessageText>{application.message}</MessageText>
                          </MessageBubble>
                          <ActionButtons>
                            <ViewButton><Eye size={16} />상세보기</ViewButton>
                            {application.status === "pending" && (
                              <>
                                <RejectButton onClick={() => handleReject(application.id)}><XCircle size={16} />거절</RejectButton>
                                <ApproveButton onClick={() => handleApprove(application.id)}><CheckCircle size={16} />승인</ApproveButton>
                              </>
                            )}
                          </ActionButtons>
                        </ApplicationItem>
                      ))}
                    </ApplicationList>
                  ) : (
                    <EmptyState>
                      <EmptyIcon size={48} />
                      <EmptyTitle>{searchTerm || statusFilter !== "all" ? "검색 결과가 없습니다" : "신청자가 없습니다"}</EmptyTitle>
                      <EmptySubtitle>{searchTerm || statusFilter !== "all" ? "다른 검색어나 필터를 시도해보세요" : "아직 지원한 사용자가 없습니다"}</EmptySubtitle>
                    </EmptyState>
                  )}
                </Panel>
              </>
            ) : (
                <Panel>
                    <EmptyState>
                        <EmptyIcon size={48} />
                        <EmptyTitle>공고를 선택해주세요</EmptyTitle>
                        <EmptySubtitle>왼쪽 목록에서 관리할 공고를 선택하면 신청자 목록을 볼 수 있습니다.</EmptySubtitle>
                    </EmptyState>
                </Panel>
            )}
          </div>
        </MainGrid>
      </ContentContainer>
    </PageWrapper>
  );
};

export default ApplicationManagementPage;