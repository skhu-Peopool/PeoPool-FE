import { useState } from "react";
import styled from "styled-components";
import DateFilter from "../../components/DateFilter";
import Dropdown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";
import { postService } from "../../lib/api/post-service";
import { categoryReverseMap } from "../../lib/labelMaps";

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  background: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #444;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 3rem;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const FormTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Dropdowns = styled.div`
  display: flex;
  gap: 2rem;
`;

const File = styled.div`
  display: flex;
  gap: 1rem;
`;

const LabelGroup = styled.div`
  display: flex;
  margin-top: 2.5rem;
  align-items: center;
  gap: 1rem;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: #f8fafc;

  &:focus {
    outline-color: var(--color-primary);
    background: white;
  }
`;

const Number = styled.input`
  width: 3rem;
  height: 2.5rem;
  padding-left: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  background: #f8fafc;
  text-align: center;
  margin-right: 2rem;

  &:focus {
    outline-color: var(--color-primary);
    background: white;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 360px;
  padding: 1.25rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: #f8fafc;
  resize: none;

  &:focus {
    outline-color: var(--color-primary);
    background: white;
  }
`;

const FileUploadLabel = styled.label`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  background: ${(props) =>
    props.variant === "primary"
      ? "var(--color-primary)"
      : props.variant === "danger"
      ? "#fca5a5"
      : "#e2e8f0"};
  color: ${(props) =>
    props.variant === "primary"
      ? "white"
      : props.variant === "danger"
      ? "#dc2626"
      : "#1e293b"};
`;

const Label = styled.label`
  font-weight: 500;
`;

const TagInput = styled.input`
  width: 12rem;
  height: 2.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid
    ${(props) => (props.error ? "#f87171" : "var(--color-border)")};
  border-radius: 0.5rem;
  font-size: 1rem;
  background: #f8fafc;

  &:focus {
    outline-color: var(--color-primary);
    background: white;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.05rem;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  background: #e2e8f0;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #374151;
`;

const DeleteTagButton = styled.button`
  margin-left: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #9ca3af;

  &:hover {
    color: #ef4444;
  }
`;

const TagSection = styled.div`
  width: 250px;
`;

const PostsPage = () => {
  const navigate = useNavigate();
  const categoryOptions = ["동아리", "어울림", "경진대회", "공모전", "기타"];
  const [category, setCategory] = useState(categoryOptions[0]);
  const [recruitNum, setRecruitNum] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activityStartDate, setActivityStartDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleRegister = async () => {
    try {
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
      navigate("/community");
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 에러:", error.response.data);
      } else {
        console.error("기타 에러:", error);
      }
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <Container>
      <MainContent>
        <Title>글쓰기</Title>

        {/* 카테고리/상태/인원/날짜 */}
        <FormTopRow>
          <Dropdowns>
            <Dropdown
              label="카테고리"
              options={categoryOptions}
              selected={category}
              setSelected={setCategory}
            />
          </Dropdowns>

          <LabelGroup>
            <Label>모집인원</Label>
            <Number
              type="number"
              value={recruitNum}
              onChange={(e) => setRecruitNum(e.target.value)}
            />

            <Label>활동 시작일</Label>
            <DateFilter
              startDate={activityStartDate}
              setStartDate={setActivityStartDate}
            />

            <Label>모집기간</Label>
            <DateFilter
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </LabelGroup>
        </FormTopRow>

        {/* 제목 */}
        <FormRow>
          <Label>제목</Label>
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormRow>

        {/* 내용 */}
        <FormRow>
          <Label>내용</Label>
          <Textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormRow>

        {/* 이미지 업로드 */}
        <FormRow>
          <Label>이미지</Label>
          <File>
            <FileUploadLabel htmlFor="fileInput">파일 선택</FileUploadLabel>
            <HiddenFileInput
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
            />
            <span style={{ marginTop: "0.5rem" }}>
              {imageFile?.name || "선택된 파일 없음"}
            </span>
          </File>
        </FormRow>

        {/* 버튼 */}
        <div className="flex justify-end gap-3">
          <Button variant="danger">임시저장</Button>
          <Button>취소</Button>
          <Button variant="primary" onClick={handleRegister}>
            등록
          </Button>
        </div>
      </MainContent>
    </Container>
  );
};

export default PostsPage;
