import { useState, useEffect } from "react";

export function FlipWord(props) {
  var words = props.words;

  // ── fixed: each useState called once, value + setter from same call ──
  var idxState = useState(0);
  var idx = idxState[0];
  var setIdx = idxState[1];

  var outState = useState(false);
  var out = outState[0];
  var setOut = outState[1];

  useEffect(function () {
    var t = setInterval(function () {
      setOut(true);
      setTimeout(function () {
        setIdx(function (i) {
          return (i + 1) % words.length;
        });
        setOut(false);
      }, 320);
    }, 2400);
    return function () {
      clearInterval(t);
    };
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        background: "linear-gradient(120deg, #F48C06, #E85D04)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        transition: "opacity .32s, transform .32s",
        opacity: out ? 0 : 1,
        transform: out ? "translateY(-10px)" : "translateY(0)",
      }}
    >
      {words[idx]}
    </span>
  );
}
