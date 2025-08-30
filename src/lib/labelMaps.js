export const statusLabelMap = {
  UPCOMING: "모집예정",
  RECRUITING: "모집 중",
  UNDER_REVIEW: "검토 중",
  RECRUITED: "모집완료",
};

export const categoryLabelMap = {
  CLUB: "동아리",
  COHORT: "어울림",
  COMPETITION: "경진대회",
  CONTEST: "공모전",
  ETC: "기타",
};

// 한글을 enum의 실제값으로 바꾸는 함수
export const statusReverseMap = Object.fromEntries(
  Object.entries(statusLabelMap).map(([k, v]) => [v, k])
);

export const categoryReverseMap = Object.fromEntries(
  Object.entries(categoryLabelMap).map(([k, v]) => [v, k])
);
