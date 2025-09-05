import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  Edit3,
  Search,
  Calendar,
  Users,
  Clock,
  Eye,
  MessageCircle,
  Star,
  RotateCcw,
} from "lucide-react";
import ApplyModal from "../../components/modal/ApplyModal";
import CompleteModal from "../../components/modal/CompleteModal";
import { useNavigate } from "react-router-dom";
import { postService } from "../../lib/api/post-service";
import {
  categoryLabelMap,
  categoryReverseMap,
  statusLabelMap,
  statusReverseMap,
} from "../../lib/labelMaps";
import Dropdown from "../../components/Dropdown";
import DateFilter from "../../components/DateFilter";
import SearchControls from "../../components/SearchControls";
import { useAuth } from "../../providers/AuthProvider";

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

const ControlsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 1s ease-out 0.1s both;
  position: relative;
  z-index: 5;
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
  z-index: 0;

  &::before {
    content: "";
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
      case "모집완료":
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
      case "모집완료":
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
  background: ${(props) =>
    props.color || "linear-gradient(135deg, #60a5fa, #3b82f6)"};
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

  &:disabled {
    background: #acafb7ff;
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
    props.active ? "linear-gradient(135deg, #ffffff, #f1f5f9)" : "transparent"};
  color: ${(props) => (props.active ? "#475569" : "rgba(255, 255, 255, 0.8)")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #f1f5f9, #e2e8f0)"
        : "rgba(255, 255, 255, 0.1)"};
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

const Img = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  display: block;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 100%;
  }
`;

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [status, setStatus] = useState("전체");
  const [category, setCategory] = useState("전체");

  const statusOptions = ["전체", "모집 중", "모집예정", "모집완료", "검토 중"];
  const categoryOptions = [
    "전체",
    "동아리",
    "어울림",
    "경진대회",
    "공모전",
    "기타",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const { user } = useAuth();

  const navigate = useNavigate();

  const fetchData = async () => {
    const pageSize = 6;

    const res = await postService.getPostList({
      page: currentPage,
      size: pageSize,
      start: startDate || undefined,
      end: endDate || undefined,
      category: category !== "전체" ? categoryReverseMap[category] : undefined,
      status: status !== "전체" ? statusReverseMap[status] : undefined,
      query: searchTerm || undefined,
    });

    console.log("📤 API 요청 파라미터:", {
      page: currentPage,
      size: pageSize,
      start: startDate,
      end: endDate,
      category: category !== "전체" ? categoryReverseMap[category] : undefined,
      status: status !== "전체" ? statusReverseMap[status] : undefined,
      query: searchTerm,
    });

    console.log("📨 API 응답 결과:", res);

    setPosts(res.posts || []);
    setTotalPages(res.totalPages || 1);
    setCurrentPage(res.currentPage || 1);
    setTotalCount(res.totalCount || 0);
  };

  useEffect(() => {
    fetchData();
    // setCurrentPage(1);
  }, [currentPage, startDate, endDate, category, status, searchTerm]);

  // 모집 기간, 상태, 카테고리, 검색 필터는 프론트에서 처리
  const filteredPosts = posts;

  const pages = Math.max(1, totalPages);

  const handleCardClick = (id) => {
    navigate(`/community/${id}`);
  };

  const handleWriteClick = () => {
    navigate("/posts");
  };

  const handleResetFilters = () => {
    setStatus("전체");
    setCategory("전체");
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
    setCurrentPage(1);
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
            <Subtitle>{totalCount}개의 모집 공고가 있습니다</Subtitle>
          </HeaderContent>
        </Header>

        <ControlsSection>
          <Controls>
            <SearchContainer>
              <SearchIcon size={20} />
              <SearchControls
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </SearchContainer>

            <WriteButton onClick={handleWriteClick}>
              <Edit3 size={18} />
              글쓰기
            </WriteButton>
          </Controls>

          <Filters>
            <FilterGroup>
              <Dropdown
                options={categoryOptions}
                selected={category}
                setSelected={setCategory}
              />

              <Dropdown
                options={statusOptions}
                selected={status}
                setSelected={setStatus}
              />
            </FilterGroup>

            <FilterGroup>
              <DateFilter
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
              {/* 초기화 버튼 */}
              <Img src="/reset.svg" onClick={handleResetFilters} />
            </FilterGroup>
          </Filters>
        </ControlsSection>

        <CardGrid>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const progressPercentage = (0 / post.maxPeople) * 100;

              return (
                <Card key={post.id} onClick={() => handleCardClick(post.id)}>
                  <CardHeader>
                    <Category>{categoryLabelMap[post.category]}</Category>
                    <Status status={statusLabelMap[post.status]}>
                      {statusLabelMap[post.status]}
                    </Status>
                  </CardHeader>

                  <CardTitle>{post.title}</CardTitle>

                  <AuthorInfo>
                    <Avatar color={post.color}>{post.writerName[0]}</Avatar>
                    <AuthorName>{post.writerName}</AuthorName>
                  </AuthorInfo>

                  <CardMeta>
                    <MetaItem>
                      <Clock size={14} />
                      마감: {post.recruitmentEndDate?.split("T")[0]}
                    </MetaItem>
                    {/* 조회수 데이터는 없어서 주석처리 */}
                    {/* <MetaItem>
                      <Eye size={14} />
                      {post.views}
                    </MetaItem> */}
                  </CardMeta>

                  <RecruitInfo>
                    <RecruitProgress>
                      <ProgressText>
                        모집현황: 0 / {post.maxPeople}명
                      </ProgressText>
                      <ProgressBar>
                        <ProgressFill percentage={progressPercentage} />
                      </ProgressBar>
                    </RecruitProgress>

                    {user?.id !== post.writerId && (
                      <ApplyButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowApplyModal(true);
                        }}
                        disabled={["RECRUITED", "UPCOMING"].includes(
                          post.status
                        )}
                      >
                        {post.status === "RECRUITED"
                          ? "모집완료"
                          : post.status === "UPCOMING"
                          ? "모집예정"
                          : post.status === "UNDER_REVIEW"
                          ? "검토 중"
                          : "지원하기"}
                      </ApplyButton>
                    )}
                  </RecruitInfo>
                </Card>
              );
            })
          ) : (
            <EmptyState>
              <Users size={64} style={{ marginBottom: "1rem", opacity: 0.5 }} />
              <h3 style={{ marginBottom: "0.5rem" }}>검색 결과가 없습니다</h3>
              <p>다른 검색어나 필터를 사용해보세요</p>
            </EmptyState>
          )}
        </CardGrid>

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <PaginationContainer>
            <Pagination>
              <PageButton
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || pages === 1}
              >
                &lt;
              </PageButton>

              {Array.from({ length: pages }, (_, i) => (
                <PageButton
                  key={i + 1}
                  active={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PageButton>
              ))}

              <PageButton
                onClick={() =>
                  setCurrentPage((prev) => Math.min(pages, prev + 1))
                }
                disabled={currentPage === pages || pages === 1}
              >
                &gt;
              </PageButton>
            </Pagination>
          </PaginationContainer>
        )}
      </ContentWrapper>

      {showApplyModal && (
        <ApplyModal
          onClose={() => setShowApplyModal(false)}
          onComplete={() => {
            setShowApplyModal(false);
            setShowCompleteModal(true);
          }}
        />
      )}

      {showCompleteModal && (
        <CompleteModal onClose={() => setShowCompleteModal(false)} />
      )}
    </Container>
  );
};

export default CommunityPage;
