import { useRef, useState, useEffect } from "react";

export function useReveal(threshold) {
  var ref = useRef(null);
  var vis = useRef(false);
  var forceUpdate = useState(0)[1];
  useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting && !vis.current) {
          vis.current = true;
          forceUpdate(function (n) {
            return n + 1;
          });
          obs.disconnect();
        }
      },
      { threshold: threshold || 0.12 },
    );
    obs.observe(el);
    return function () {
      obs.disconnect();
    };
  }, []);
  return [ref, vis.current];
}
