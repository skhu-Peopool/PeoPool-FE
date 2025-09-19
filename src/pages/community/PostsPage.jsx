import { useEffect, useRef, useState } from "react";
import {
  Users,
  Calendar,
  FileText,
  Upload,
  Save,
  X,
  Check,
  Edit3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import {
  categoryLabelMap,
  categoryReverseMap,
  statusLabelMap,
  statusReverseMap,
} from "../../lib/labelMaps";
import { postService } from "../../lib/api/post-service";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
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
  max-width: 1200px;
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

const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-out 0.2s both;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: end;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  flex: 1;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 1rem;
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: #60a5fa;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  z-index: 10;
`;

const DropdownButton = styled.div`
  padding: 1rem 1.25rem;
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 2px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: #60a5fa;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
    transform: translateY(-2px);
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.25rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 20;
`;

const DropdownItem = styled.li`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  font-size: 0.95rem;
  color: #1e293b;
  background-color: ${({ selected }) => (selected ? "#f8fafc" : "white")};

  &:hover {
    background-color: #f1f5f9;
  }
`;

const NumberInput = styled(Input)`
  width: 5rem;
  text-align: center;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 1rem;
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  resize: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  line-height: 1.6;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const FileUploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  background: rgba(248, 250, 252, 0.5);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #60a5fa;
    background: rgba(96, 165, 250, 0.05);
    transform: translateY(-2px);
  }

  input {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  max-width: 100%;
`;

const PreviewImage = styled.img`
  width: 100%;
  border-radius: 1rem;
  display: block;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.3rem;
  border-radius: 100%;
  border: none;
  background: #f1f5f9;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #374151;
  }
`;

const FileUploadContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #6b7280;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 120px;
  justify-content: center;

  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          color: white;
          box-shadow: 0 4px 20px rgba(96, 165, 250, 0.4);
          
          &:hover {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 30px rgba(96, 165, 250, 0.5);
          }
        `;
      case "danger":
        return `
          background: linear-gradient(135deg, #f87171, #ef4444);
          color: white;
          box-shadow: 0 4px 20px rgba(248, 113, 113, 0.4);
          
          &:hover {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 30px rgba(248, 113, 113, 0.5);
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          color: #475569;
          border: 1px solid #cbd5e1;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          
          &:hover {
            background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const PostsPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditMode = Boolean(postId);
  const categoryOptions = ["동아리", "어울림", "경진대회", "공모전", "기타"];
  const [category, setCategory] = useState(categoryOptions[0]);
  const statusOptions = ["모집 중", "모집예정", "모집완료", "검토 중"];
  const [status, setStatus] = useState(statusOptions[0]);
  const [recruitNum, setRecruitNum] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activityStartDate, setActivityStartDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const categoryDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(e.target)
      ) {
        setIsCategoryDropdownOpen(false);
      }

      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(e.target)
      ) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await postService.updatePost(postId, {
          title,
          content,
          recruitmentStartDate: startDate,
          recruitmentEndDate: endDate,
          activityStartDate,
          maxPeople: recruitNum,
          category: categoryReverseMap[category],
          postStatus: statusReverseMap[status],
          imageFile,
        });
        alert("게시글이 수정되었습니다.");
      } else {
        await postService.addPost({
          title,
          content,
          recruitmentStartDate: startDate,
          recruitmentEndDate: endDate,
          activityStartDate,
          maxPeople: recruitNum,
          category: categoryReverseMap[category],
          imageFile,
        });
        alert("게시물이 등록되었습니다.");
      }
      navigate("/community");
    } catch (error) {
      console.error("에러 발생:", error);
      alert("처리에 실패했습니다.");
    }
  };

  // 수정모드일 때 : 기존 데이터 불러오기
  useEffect(() => {
    let ignore = false;

    const loadPost = async () => {
      if (!postId) return;
      try {
        const data = await postService.getPostDetail(postId);
        if (ignore) return;

        setTitle(data.title);
        setContent(data.content);
        setStartDate(data.recruitmentStartDate);
        setEndDate(data.recruitmentEndDate);
        setActivityStartDate(data.activityStartDate);
        setRecruitNum(data.maxPeople.toString());

        if (categoryLabelMap[data.category]) {
          setCategory(categoryLabelMap[data.category]);
        } else {
          console.warn("카테고리 매핑 실패:", data.category);
        }

        if (statusLabelMap[data.postStatus]) {
          setStatus(statusLabelMap[data.postStatus]);
        }

        setImageFile(data.image);
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
        alert("게시글 정보를 불러오지 못했습니다.");
      }
    };

    loadPost();
    return () => {
      ignore = true;
    };
  }, [postId]);

  useEffect(() => {
    let previewUrl;
    if (imageFile && typeof imageFile !== "string") {
      previewUrl = URL.createObjectURL(imageFile);
      setImageUrl(previewUrl);
    } else if (typeof imageFile === "string") {
      setImageUrl(imageFile);
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [imageFile]);

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <HeaderContent>
            <TitleWrapper>
              <Edit3 color="white" size={40} />
              <Title>{isEditMode ? "수정하기" : "글쓰기"}</Title>
            </TitleWrapper>
            <Subtitle>
              새로운 팀원을 모집하거나 프로젝트를 공유해보세요
            </Subtitle>
          </HeaderContent>
        </Header>

        <FormCard>
          {/* 카테고리, 인원, 날짜 */}
          <FormRow>
            <FormGroup>
              <Label>
                <Users size={16} />
                카테고리
              </Label>
              <DropdownWrapper ref={categoryDropdownRef}>
                <DropdownButton
                  tabIndex="0" // div는 focus를 받지 못함
                  onClick={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                >
                  <span>{category}</span>
                  {isCategoryDropdownOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </DropdownButton>
                {isCategoryDropdownOpen && (
                  <DropdownList>
                    {categoryOptions.map((option) => (
                      <DropdownItem
                        key={option}
                        onClick={() => {
                          setCategory(option);
                          setIsCategoryDropdownOpen(false);
                        }}
                        selected={option === category}
                      >
                        {option}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </DropdownWrapper>
            </FormGroup>

            {isEditMode && (
              <FormGroup>
                <Label>
                  <Users size={16} />
                  모집 상태
                </Label>
                <DropdownWrapper ref={statusDropdownRef}>
                  <DropdownButton
                    tabIndex="0"
                    onClick={() =>
                      setIsStatusDropdownOpen(!isStatusDropdownOpen)
                    }
                  >
                    <span>{status}</span>
                    {isStatusDropdownOpen ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </DropdownButton>
                  {isStatusDropdownOpen && (
                    <DropdownList>
                      {statusOptions.map((option) => (
                        <DropdownItem
                          key={option}
                          onClick={() => {
                            setStatus(option);
                            setIsStatusDropdownOpen(false);
                          }}
                          selected={option === status}
                        >
                          {option}
                        </DropdownItem>
                      ))}
                    </DropdownList>
                  )}
                </DropdownWrapper>
              </FormGroup>
            )}

            <FormGroup style={{ maxWidth: "150px" }}>
              <Label>
                <Users size={16} />
                모집인원
              </Label>
              <NumberInput
                type="number"
                value={recruitNum}
                onChange={(e) => setRecruitNum(e.target.value)}
              />
            </FormGroup>

            {isEditMode ? (
              <>
                <FormGroup>
                  <Label>
                    <Calendar size={16} />
                    활동 시작일
                  </Label>
                  <Input
                    type="date"
                    value={activityStartDate}
                    onChange={(e) => setActivityStartDate(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <Calendar size={16} />
                    모집 시작일
                  </Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <Calendar size={16} />
                    모집 마감일
                  </Label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </FormGroup>
              </>
            ) : (
              <>
                <FormGroup>
                  <Label>
                    <Calendar size={16} />
                    모집 시작일
                  </Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <Calendar size={16} />
                    모집 마감일
                  </Label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <Calendar size={16} />
                    활동 시작일
                  </Label>
                  <Input
                    type="date"
                    value={activityStartDate}
                    onChange={(e) => setActivityStartDate(e.target.value)}
                  />
                </FormGroup>
              </>
            )}
          </FormRow>

          {/* 제목 */}
          <FormSection>
            <Label>
              <FileText size={16} />
              제목
            </Label>
            <Input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormSection>

          {/* 내용 */}
          <FormSection>
            <Label>
              <FileText size={16} />
              내용
            </Label>
            <Textarea
              placeholder="내용을 입력하세요&#10;&#10;• 모집하는 팀원의 역할과 요구사항을 명시해주세요&#10;• 프로젝트의 목표와 일정을 상세히 작성해주세요&#10;• 연락 방법을 포함해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormSection>

          {/* 이미지 업로드 */}
          <FormSection>
            <Label>
              <Upload size={16} />
              첨부파일
            </Label>
            <FileUploadArea>
              <input
                ref={fileInputRef}
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label
                htmlFor="file-upload"
                style={{ cursor: "pointer", width: "100%" }}
              >
                <FileUploadContent>
                  <Upload size={32} />
                  <div>
                    <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                      {imageFile ? imageFile.name : "파일을 선택하세요"}
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
                      드래그하거나 클릭하여 업로드
                    </p>
                  </div>
                </FileUploadContent>
              </label>
            </FileUploadArea>

            {imageUrl && (
              <ImageWrapper style={{ marginTop: "1rem" }}>
                <PreviewImage src={imageUrl} alt="현재 이미지" />
                <CloseBtn
                  onClick={() => {
                    setImageFile(null);
                    setImageUrl("");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                >
                  <X size={18} />
                </CloseBtn>
              </ImageWrapper>
            )}
          </FormSection>

          {/* 버튼 그룹 */}
          <ButtonGroup>
            <Button variant="danger">
              <Save size={18} />
              임시저장
            </Button>
            <Button>
              <X size={18} />
              취소
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              <Check size={18} />
              {isEditMode ? "수정하기" : "등록하기"}
            </Button>
          </ButtonGroup>
        </FormCard>
      </ContentWrapper>
    </Container>
  );
};

export default PostsPage;
