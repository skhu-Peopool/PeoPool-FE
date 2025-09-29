import { useEffect, useRef, useState } from "react";
import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export default function EmojiPickerButton({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // cleanup
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={pickerRef}>
      {/* 스마일 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-1 hover:bg-gray-200 rounded-lg transition-all group"
      >
        <Smile size={20} className="text-gray-500 group-hover:text-blue-600" />
      </button>

      {/* 이모지 선택창 */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 z-50 shadow-lg">
          <Picker
            data={data}
            onEmojiSelect={(emoji) => {
              onSelect(emoji.native); // 선택된 이모지 전달
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
