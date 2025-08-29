import React, { useState } from 'react';
import { Users, Calendar, FileText, Tag, Upload, Save, X, Check, Edit3 } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

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

const Select = styled.select`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 1rem;
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:focus {
    outline: none;
    border-color: #60a5fa;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
    transform: translateY(-2px);
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
  resize: vertical;
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

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  color: #4338ca;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #c7d2fe, #a5b4fc);
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 4px 20px rgba(67, 56, 202, 0.2);
  }
`;

const TagInput = styled.div`
  display: flex;
  gap: 1rem;
  align-items: end;
`;

const DeleteTagButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6366f1;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    color: #ef4444;
    transform: scale(1.1);
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
  
  ${props => {
    switch (props.variant) {
      case 'primary':
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
      case 'danger':
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

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  font-weight: 500;
`;

const PostsPage = () => {
  const categoryOptions = ["동아리", "어울림", "경진대회", "공모전", "기타"];
  const [category, setCategory] = useState(categoryOptions[0]);
  const [recruitNum, setRecruitNum] = useState("12");
  const [startDate, setStartDate] = useState("2025-08-27");
  const [endDate, setEndDate] = useState("2025-09-03");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [tagError, setTagError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTagAdd = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (tags.length >= 3) {
      setTagError("최대 3개의 태그만 등록할 수 있습니다");
      return;
    }
    if (trimmed.length > 5) {
      setTagError("5글자 이내로 입력해주세요");
      return;
    }
    if (tags.includes(trimmed)) {
      setTagError("이미 등록된 태그입니다");
      return;
    }
    setTags([...tags, trimmed]);
    setTagInput("");
    setTagError("");
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const handleTagDelete = (index) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <HeaderContent>
            <TitleWrapper>
              <Edit3 color="white" size={40} />
              <Title>글쓰기</Title>
            </TitleWrapper>
            <Subtitle>새로운 팀원을 모집하거나 프로젝트를 공유해보세요</Subtitle>
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
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
            </FormGroup>
            
            <FormGroup style={{maxWidth: '150px'}}>
              <Label>
                <Users size={16} />
                모집인원
              </Label>
              <NumberInput
                type="number"
                value={recruitNum}
                onChange={(e) => setRecruitNum(e.target.value)}
                min="1"
                max="100"
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

          {/* 태그 */}
          <FormSection>
            <Label>
              <Tag size={16} />
              태그
            </Label>
            <TagContainer>
              <TagList>
                {tags.map((tag, i) => (
                  <TagItem key={i}>
                    <Tag size={14} />
                    #{tag}
                    <DeleteTagButton onClick={() => handleTagDelete(i)}>
                      <X size={14} />
                    </DeleteTagButton>
                  </TagItem>
                ))}
              </TagList>
              
              <TagInput>
                <Input
                  type="text"
                  placeholder="태그를 입력 후 Enter 또는 추가 버튼"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  style={{borderColor: tagError ? '#ef4444' : ''}}
                />
                <Button type="button" onClick={handleTagAdd}>
                  <Check size={16} />
                  추가
                </Button>
              </TagInput>
              
              {tagError && <ErrorText>{tagError}</ErrorText>}
            </TagContainer>
          </FormSection>

          {/* 첨부파일 */}
          <FormSection>
            <Label>
              <Upload size={16} />
              첨부파일
            </Label>
            <FileUploadArea>
              <input
                type="file"
                id="file-upload"
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
              <label htmlFor="file-upload" style={{cursor: 'pointer', width: '100%'}}>
                <FileUploadContent>
                  <Upload size={32} />
                  <div>
                    <p style={{fontWeight: '600', marginBottom: '0.25rem'}}>
                      {selectedFile ? selectedFile.name : "파일을 선택하세요"}
                    </p>
                    <p style={{fontSize: '0.875rem', color: '#9ca3af'}}>
                      드래그하거나 클릭하여 업로드
                    </p>
                  </div>
                </FileUploadContent>
              </label>
            </FileUploadArea>
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
            <Button variant="primary">
              <Check size={18} />
              등록하기
            </Button>
          </ButtonGroup>
        </FormCard>
      </ContentWrapper>
    </Container>
  );
};

export default PostsPage;