import styled, { css } from "styled-components";

export default function Button({
  variant = "solid", // solid 또는 light
  text,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      $variant={variant}
      className={className}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 100%;
  height: 3rem; /* 12 (h-12) */
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 400;
  font-family: sans-serif;
  line-height: normal;
  color: black;
  cursor: pointer;
  transition: background-color 0.2s;

  ${(props) =>
    props.$variant === "solid" &&
    css`
      background-color: #93c5fd; /* blue-300 */
      &:hover {
        background-color: #60a5fa; /* blue-400 */
      }
    `}

  ${(props) =>
    props.$variant === "light" &&
    css`
      background-color: rgba(147, 197, 253, 0.5); /* blue-300/50 */
      &:hover {
        background-color: rgba(147, 197, 253, 0.7);
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;
