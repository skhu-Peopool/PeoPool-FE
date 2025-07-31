import React, { useState } from "react";
import styled from "styled-components";
import { Edit3 } from "lucide-react";
import SearchControls from "../../components/SearchControls";
import PaginationComponent from "../../components/PaginationComponent";
import DateFilter from "../../components/DateFilter";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import mockOrders from "../../lib/ordersData";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 3rem;
  overflow-y: auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #475569;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

const WriteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-gradient);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0.125rem 0.25rem rgba(107, 157, 228, 0.2);

  &:hover {
    background: linear-gradient(135deg, #73a3e7 0%, #5a91e0 100%);
    transform: translateY(-0.0625rem);
    box-shadow: 0 0.25rem 0.5rem rgba(107, 157, 228, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Filters = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Dropdowns = styled.div`
  display: flex;
  gap: 2rem;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const TableHeader = styled.thead`
  background: var(--color-gradient);
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f8fafc;
  }

  &:hover {
    background: #f1f5f9;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  text-align: center;
  border-bottom: 0.0625rem solid #e2e8f0;
  font-size: 0.875rem;
  vertical-align: middle;
  color: #1e293b;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Avatar = styled.div`
  min-width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${(props) => props.color || "var(--color-primary)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.75rem;
  font-size: 1.15rem;
  font-weight: 500;
`;

const UserInfo1 = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.15rem;
  font-weight: 500;
`;

const UserName = styled.span`
  font-weight: 400;
  color: #1e293b;
  font-size: 1rem;
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
        return "#fef3c7";
      case "검토 중":
        return "#d1fae5";
      case "모집마감":
        return "#bfdbfe";
      case "모집예정":
        return "#fed7e2";
      default:
        return "#e5e7eb";
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

const ActionButton = styled.button`
  background: var(--color-primary);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem 2rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: all 0.2s ease;

  &:hover {
    background: #5a91e0;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ITEMS_PER_PAGE = 6;

const Communitypage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("2025-07-31");
  const [endDate, setEndDate] = useState("2025-08-03");
  const navigate = useNavigate();

  const statusOptions = ["전체", "모집 중", "검토 중", "모집마감", "모집예정"];
  const [status, setStatus] = useState(statusOptions[0]);

  const categoryOptions = [
    "전체",
    "동아리",
    "어울림",
    "경진대회",
    "공모전",
    "기타",
  ];
  const [category, setCategory] = useState(categoryOptions[0]);

  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = status === "전체" || order.status === status;
    const matchesCategory = category === "전체" || order.category === category;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleWriteClick = () => navigate("/posts");

  React.useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Container>
      <MainContent>
        <Header>
          <Title>Community</Title>
          <Subtitle>{filteredOrders.length}개의 모집 공고</Subtitle>
        </Header>

        <Controls>
          <SearchControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <WriteButton onClick={handleWriteClick}>
            <Edit3 size={16} />
            글쓰기
          </WriteButton>
        </Controls>

        <Filters>
          <Dropdowns>
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
          </Dropdowns>

          <DateFilter
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Filters>

        <TableContainer>
          <Table>
            {/* 열 너비 설정 */}
            <colgroup>
              <col style={{ width: "8%" }} /> {/* 카테고리 */}
              <col style={{ width: "20%" }} /> {/* 횔동명 */}
              <col style={{ width: "8%" }} /> {/* 게시자 */}
              <col style={{ width: "10%" }} /> {/* 모집 마감일 */}
              <col style={{ width: "10%" }} /> {/* 모집현황 */}
              <col style={{ width: "10%" }} /> {/* 모집상태 */}
              <col style={{ width: "10%" }} /> {/* 신청 */}
            </colgroup>

            <TableHeader>
              <tr>
                <TableHeaderCell>카테고리</TableHeaderCell>
                <TableHeaderCell>횔동명</TableHeaderCell>
                <TableHeaderCell>게시자</TableHeaderCell>
                <TableHeaderCell>모집 마감일</TableHeaderCell>
                <TableHeaderCell>모집현황</TableHeaderCell>
                <TableHeaderCell>모집상태</TableHeaderCell>
                <TableHeaderCell>신청</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              {currentOrders.map((order) => (
                <TableRow
                  key={order.id}
                  onClick={() => navigate(`/community/${order.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{order.category}</TableCell>
                  <TableCell>
                    <UserInfo>{order.title}</UserInfo>
                  </TableCell>
                  <TableCell>
                    <UserInfo1>
                      <Avatar color={order.color}>{order.initial}</Avatar>
                      <UserName>{order.name}</UserName>
                    </UserInfo1>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    {order.currentApplicants} / {order.maxApplicants}
                  </TableCell>
                  <TableCell>
                    <Status status={order.status}>{order.status}</Status>
                  </TableCell>
                  <TableCell>
                    <ActionButton>신청</ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>

        <PaginationComponent
          totalPages={Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)}
          onPageChange={setCurrentPage}
        />
      </MainContent>
    </Container>
  );
};

export default Communitypage;
