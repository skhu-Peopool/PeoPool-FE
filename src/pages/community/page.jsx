import React, { useState } from "react";
import styled from "styled-components";
import { Eye, MoreHorizontal, Users, Edit3 } from "lucide-react";
import SearchControls from "../../components/SearchControls";
import PaginationComponent from "../../components/PaginationComponent";
import FilterTabs from "../../components/FilterTabs";
import DateFilter from "../../components/DateFilter";
import { useNavigate } from "react-router-dom";

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

const TableContainer = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
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
      case "PENDING":
        return "#fef3c7";
      case "PROCESSING":
        return "#d1fae5";
      case "COMPLETED":
        return "#bfdbfe";
      case "CANCELLED":
        return "#fed7e2";
      default:
        return "#e5e7eb";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "PENDING":
        return "#92400e";
      case "PROCESSING":
        return "#065f46";
      case "COMPLETED":
        return "#1e40af";
      case "CANCELLED":
        return "#be185d";
      default:
        return "#374151";
    }
  }};
`;

// const ActionButton = styled.button`
//   background: none;
//   border: none;
//   color: #475569;
//   cursor: pointer;
//   padding: 0.5rem;
//   border-radius: 0.375rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.2s;

//   &:hover {
//     background: #f1f5f9;
//     color: #1e293b;
//   }
// `;

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

const orders = [
  {
    id: 9822,
    name: "Brooklyn Joe",
    initial: "B",
    address: "Java 스터디 같이 하실 분 모집합니다",
    date: "31 Jul 2020",
    price: "$54.00",
    status: "PENDING",
    color: "#667eea",
  },
  {
    id: 9823,
    name: "John McCormick",
    initial: "J",
    address: "해커톤 같이 하실 분 구합니다",
    date: "01 Aug 2020",
    price: "$36.00",
    status: "PROCESSING",
    color: "#8b5cf6",
  },
  {
    id: 9824,
    name: "Sandra Pugh",
    initial: "S",
    address: "1549 Thorn Street, SALT CITY, GA 31408",
    date: "02 Aug 2020",
    price: "$74.00",
    status: "COMPLETED",
    color: "#10b981",
  },
  {
    id: 9825,
    name: "Velma Hart",
    initial: "V",
    address: "2896 Oak Drive, OXNARD, CA 93030",
    date: "02 Aug 2020",
    price: "$82.00",
    status: "PENDING",
    color: "#f59e0b",
  },
  {
    id: 9826,
    name: "Mark Clark",
    initial: "M",
    address: "1658 Augusta Park, MISSION, MO 66202",
    date: "03 Aug 2020",
    price: "$35.00",
    status: "PROCESSING",
    color: "#3b82f6",
  },
  {
    id: 9827,
    name: "Rebecca Foster",
    initial: "R",
    address: "3419 Eros Boulevard, BOCA, CA 93905",
    date: "03 Aug 2020",
    price: "$67.00",
    status: "CANCELLED",
    color: "#ef4444",
  },
];

const Communitypage = () => {
  const [activeTab, setActiveTab] = useState("All orders");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("2025-07-31");
  const [endDate, setEndDate] = useState("2025-08-03");
  const navigate = useNavigate();

  const tabs = ["All orders", "Pending", "Processing", "Completed"];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "All orders" || order.status === activeTab.toUpperCase();
    return matchesSearch && matchesTab;
  });

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

  // const categoryOptions = ["동아리", "어울림", "경진대회", "공모전"];
  // const statusOptions = ["모집 중지", "모집 중"];

  // const [category, setCategory] = useState(categoryOptions[0]);
  // const [status, setStatus] = useState(statusOptions[0]);

  return (
    <Container>
      <MainContent>
        <Header>
          <Title>Community</Title>
          <Subtitle>28 orders found</Subtitle>
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
          <FilterTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <DateFilter
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Filters>

        {/* <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
          <Dropdown
            label="카테고리"
            options={categoryOptions}
            selected={category}
            setSelected={setCategory}
          />
          <Dropdown
            label="모집상태"
            options={statusOptions}
            selected={status}
            setSelected={setStatus}
          />
        </div> */}

        <TableContainer>
          <Table>
            {/* 열 너비 설정 */}
            <colgroup>
              <col style={{ width: "8%" }} /> {/* 카테고리 */}
              <col style={{ width: "25%" }} /> {/* 횔동명 */}
              <col style={{ width: "12%" }} /> {/* 게시자 */}
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
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>
                    <UserInfo>{order.address}</UserInfo>
                  </TableCell>
                  <TableCell>
                    <UserInfo>
                      <Avatar color={order.color}>{order.initial}</Avatar>
                      <UserName>{order.name}</UserName>
                    </UserInfo>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>
                    <Status status={order.status}>{order.status}</Status>
                  </TableCell>
                  <TableCell>
                    {/* <ActionButton>
                        <Eye size={16} />
                      </ActionButton>
                      <ActionButton>
                        <MoreHorizontal size={16} />
                      </ActionButton> */}
                    <ActionButton>신청</ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>

        <PaginationComponent />
      </MainContent>
    </Container>
  );
};

export default Communitypage;
