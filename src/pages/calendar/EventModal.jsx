import styled from "styled-components";
import { X } from "lucide-react";
import { useState } from "react";

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 520px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid rgba(96, 165, 250, 0.1);
`;
const Title = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #111827;
`;
const Close = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
  display: grid;
  place-items: center;
`;
const Group = styled.div`
  margin-bottom: 0.9rem;
`;
const Label = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 0.35rem;
  color: #374151;
  font-size: 0.9rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
  }
`;
const Textarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 0.6rem 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  resize: none;
  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
  }
`;
const Palette = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;
const Swatch = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: ${(p) => (p.active ? "2px solid #111827" : "2px solid transparent")};
  background: ${(p) => p.color};
`;
const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;
const Btn = styled.button`
  padding: 0.6rem 1.1rem;
  border: none;
  border-radius: 0.6rem;
  font-weight: 700;
  cursor: pointer;
  &.primary {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    color: #fff;
  }
  &.secondary {
    background: #f3f4f6;
    color: #374151;
  }
  &.danger {
    background: linear-gradient(135deg, #f87171, #ef4444);
    color: #fff;
  }
`;

export default function EventModal({
  mode, // 'add' | 'edit'
  data, // { id, title, start:Date, end:Date, color, memo }
  onClose,
  onSaveAdd,
  onSaveEdit,
  onDelete,
  eventColors,
}) {
  const [form, setForm] = useState({ ...data });

  const onChange = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  // datetime-local 바인딩용 포맷/파서
  const toLocalInput = (d) => {
    const pad = (n) => String(n).padStart(2, "0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  };
  const fromLocalInput = (s) => (s ? new Date(s) : new Date());

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{mode === "add" ? "일정 추가" : "일정 수정"}</Title>
          <Close onClick={onClose}>
            <X size={16} />
          </Close>
        </Header>

        <Group>
          <Label>제목 *</Label>
          <Input
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="일정 제목"
            autoFocus
          />
        </Group>

        <Group>
          <Label>시작</Label>
          <Input
            type="datetime-local"
            value={toLocalInput(form.start)}
            onChange={(e) => onChange("start", fromLocalInput(e.target.value))}
          />
        </Group>

        <Group>
          <Label>종료</Label>
          <Input
            type="datetime-local"
            value={toLocalInput(form.end)}
            onChange={(e) => onChange("end", fromLocalInput(e.target.value))}
          />
        </Group>

        <Group>
          <Label>색상</Label>
          <Palette>
            {eventColors.map((c) => (
              <Swatch
                key={c.name}
                color={c.value}
                active={form.color === c.value}
                onClick={() => onChange("color", c.value)}
                title={c.name}
              />
            ))}
          </Palette>
        </Group>

        <Group>
          <Label>메모</Label>
          <Textarea
            value={form.memo}
            onChange={(e) => onChange("memo", e.target.value)}
            placeholder="메모나 추가 설명"
          />
        </Group>

        <Actions>
          <Btn className="secondary" onClick={onClose}>
            취소
          </Btn>
          {mode === "edit" && (
            <Btn className="danger" onClick={() => onDelete()}>
              삭제
            </Btn>
          )}
          <Btn
            className="primary"
            onClick={() => {
              if (!form.title.trim()) return;
              if (mode === "add") onSaveAdd(form);
              else onSaveEdit(form);
            }}
          >
            {mode === "add" ? "추가" : "저장"}
          </Btn>
        </Actions>
      </ModalContent>
    </ModalBackdrop>
  );
}
