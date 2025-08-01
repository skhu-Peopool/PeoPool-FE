const mockOrders = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  category: ["동아리", "어울림", "경진대회", "공모전", "기타"][index % 5],
  name: `User ${index + 1}`,
  initial: `U${index + 1}`,
  title: `모집 공고 제목 ${index + 1}`,
  date: `2025-08-${String((index % 30) + 1).padStart(2, "0")}`,
  currentApplicants: Math.floor(Math.random() * 10), // 현재 신청 인원
  maxApplicants: 10 + (index % 5), // 최대 인원 (10~14 반복)
  status: ["모집 중", "검토 중", "모집마감", "모집예정"][index % 4],
  color: ["#667eea", "#8b5cf6", "#10b981", "#f59e0b", "#3b82f6"][index % 5],
}));

export default mockOrders;
