import { useState, useEffect, useRef } from "react";

export function Counter(props) {
  var end = props.end;
  var suffix = props.suffix || "";
  var n = useState(0);
  var setN = n[1];
  n = n[0];
  var ref = useRef(null);
  var ran = useRef(false);
  useEffect(
    function () {
      var el = ref.current;
      if (!el) return;
      var obs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !ran.current) {
          ran.current = true;
          var s = 0,
            step = end / 55;
          var id = setInterval(function () {
            s += step;
            if (s >= end) {
              setN(end);
              clearInterval(id);
            } else setN(Math.floor(s));
          }, 22);
        }
      });
      obs.observe(el);
      return function () {
        obs.disconnect();
      };
    },
    [end],
  );
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}
