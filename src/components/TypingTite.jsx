"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

function TypingTitle({ text, delay = 100, highlightWord = "peopool", as: Component = DefaultText, onDone }) {
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [typingDone, setTypingDone] = useState(false);
  const [cursorVisibleAfterDone, setCursorVisibleAfterDone] = useState(true);

  const chars = [...text];
  const styledChars = [];
  for (let i = 0; i < chars.length;) {
    if (text.slice(i, i + highlightWord.length) === highlightWord) {
      for (let j = 0; j < highlightWord.length; j++) {
        styledChars.push({ char: highlightWord[j], colored: true });
      }
      i += highlightWord.length;
    } else {
      styledChars.push({ char: chars[i], colored: false });
      i++;
    }
  }

  useEffect(() => {
    if (typingDone) return;

    const typingInterval = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= styledChars.length) {
          clearInterval(typingInterval);
          setTypingDone(true);
        }
        return next;
      });
    }, delay);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [delay, styledChars.length, typingDone]);

  useEffect(() => {
    if (typingDone) {
      if (onDone) onDone();
      const timeout = setTimeout(() => {
        setCursorVisibleAfterDone(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [typingDone, onDone]);

  return (
    <Component>
      {styledChars.slice(0, index).map((item, idx) =>
        item.colored ? (
          <span key={idx} style={{ color: "#ffd200" }}>{item.char}</span>
        ) : (
          <span key={idx}>{item.char}</span>
        )
      )}
      {(typingDone ? cursorVisibleAfterDone : true) && (
        <Cursor style={{ visibility: showCursor ? "visible" : "hidden" }}>|</Cursor>
      )}
    </Component>
  );
}

const Cursor = styled.span`
  display: inline-block;
  margin-left: 5px;
  font-weight: 300;
`;

const DefaultText = styled.p`
  white-space: pre-line;
`;

export default TypingTitle;
