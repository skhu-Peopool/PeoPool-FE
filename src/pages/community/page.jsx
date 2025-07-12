import React, { useState } from 'react';
import styled from 'styled-components';
import {  Eye, MoreHorizontal, Users, Edit3 } from 'lucide-react';
import SearchControls from '../../components/SearchControls';
import FilterTabsComponent from '../../components/FilterTabsComponent';
import PaginationComponent from '../../components/PaginationComponent';
import HeaderSlide from '../../components/Header/HeaderSlide';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
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
  background: linear-gradient(135deg, #8BB3EA 0%, #6B9DE4 100%);
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
  background: linear-gradient(135deg, #8BB3EA 0%, #6B9DE4 100%);
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
  border-bottom: 0.0625rem solid #e2e8f0;
  font-size: 0.875rem;
  vertical-align: middle;
  color: #1e293b;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
`;

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${props => props.color || '#6B9DE4'};
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
  gap: 0.75rem;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #1e293b;
`;

const Status = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch (props.status) {
      case 'PENDING': return '#fef3c7';
      case 'PROCESSING': return '#d1fae5';
      case 'COMPLETED': return '#bfdbfe';
      case 'CANCELLED': return '#fed7e2';
      default: return '#e5e7eb';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'PENDING': return '#92400e';
      case 'PROCESSING': return '#065f46';
      case 'COMPLETED': return '#1e40af';
      case 'CANCELLED': return '#be185d';
      default: return '#374151';
    }
  }};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #475569;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;


const orders = [
  { id: 9822, name: 'Brooklyn Joe', initial: 'B', address: '921 Amhem Street, NUTMAN, KY 40157', date: '31 Jul 2020', price: '$54.00', status: 'PENDING', color: '#667eea' },
  { id: 9823, name: 'John McCormick', initial: 'J', address: '4038 Waterman Street, COLMAN, IL 61741', date: '01 Aug 2020', price: '$36.00', status: 'PROCESSING', color: '#8b5cf6' },
  { id: 9824, name: 'Sandra Pugh', initial: 'S', address: '1549 Thorn Street, SALT CITY, GA 31408', date: '02 Aug 2020', price: '$74.00', status: 'COMPLETED', color: '#10b981' },
  { id: 9825, name: 'Velma Hart', initial: 'V', address: '2896 Oak Drive, OXNARD, CA 93030', date: '02 Aug 2020', price: '$82.00', status: 'PENDING', color: '#f59e0b' },
  { id: 9826, name: 'Mark Clark', initial: 'M', address: '1658 Augusta Park, MISSION, MO 66202', date: '03 Aug 2020', price: '$35.00', status: 'PROCESSING', color: '#3b82f6' },
  { id: 9827, name: 'Rebecca Foster', initial: 'R', address: '3419 Eros Boulevard, BOCA, CA 93905', date: '03 Aug 2020', price: '$67.00', status: 'CANCELLED', color: '#ef4444' },
];

const Communitypage = () => {
  const [activeTab, setActiveTab] = useState('All orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('2025-07-31');
  const [endDate, setEndDate] = useState('2025-08-03');

  const tabs = ['All orders', 'Pending', 'Processing', 'Completed'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All orders' || order.status === activeTab.toUpperCase();
    return matchesSearch && matchesTab;
  });

  const handleWriteClick = () => {
    alert('글쓰기 버튼이 클릭되었습니다!');
  };

  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Container>
      <HeaderSlide />
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
        
        <FilterTabsComponent
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Address</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              {filteredOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>
                    <UserInfo>
                      <Avatar color={order.color}>{order.initial}</Avatar>
                      <UserName>{order.name}</UserName>
                    </UserInfo>
                  </TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>
                    <Status status={order.status}>{order.status}</Status>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <ActionButton>
                        <Eye size={16} />
                      </ActionButton>
                      <ActionButton>
                        <MoreHorizontal size={16} />
                      </ActionButton>
                    </div>
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