"use client";

import React, { useEffect, useState, useRef } from "react";

const WORDS = ["Break", "Fix", "Create", "Hack", "Secure", "Analyze", "Develop"];
const TYPE_SPEED = 90;
const DELETE_SPEED = 55;
const PAUSE_AFTER_TYPE = 1400;
const PAUSE_AFTER_DELETE = 300;

export default function TypingEffect() {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "pauseEmpty">("typing");
  const charIdx = useRef(0);

  useEffect(() => {
    const word = WORDS?.[wordIdx % WORDS?.length];

    if (phase === "typing") {
      if (charIdx?.current < word?.length) {
        const t = setTimeout(() => {
          charIdx.current += 1;
          setDisplayed(word?.slice(0, charIdx?.current));
        }, TYPE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), PAUSE_AFTER_TYPE);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pausing") {
      setPhase("deleting");
    }

    if (phase === "deleting") {
      if (charIdx?.current > 0) {
        const t = setTimeout(() => {
          charIdx.current -= 1;
          setDisplayed(word?.slice(0, charIdx?.current));
        }, DELETE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setWordIdx((i) => i + 1);
          setPhase("typing");
        }, PAUSE_AFTER_DELETE);
        return () => clearTimeout(t);
      }
    }
  }, [phase, displayed, wordIdx]);

  return (
    <span className="font-mono text-primary">
      {displayed}
      <span className="cursor-blink text-primary">_</span>
    </span>
  );
}