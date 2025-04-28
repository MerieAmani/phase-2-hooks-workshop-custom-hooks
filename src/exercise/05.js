import { useState, useEffect } from "react";

const activityEvents = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
];

export function useIdle(ms, eventTypes = activityEvents) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => setIsIdle(true), ms);

    function resetIdle() {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), ms);
    }

    for (const event of eventTypes) {
      window.addEventListener(event, resetIdle);
    }

    return () => {
      for (const event of eventTypes) {
        window.removeEventListener(event, resetIdle);
      }
      clearTimeout(timeout);
    };
  }, [ms, eventTypes]);

  return isIdle;
}

export default function Idle() {
  const isIdle = useIdle(3000);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>useIdle Demo</h2>
      <h3>
        {isIdle ? (
          <span role="img" aria-label="idle">
            Idle 😴
          </span>
        ) : (
          <span role="img" aria-label="active">
            Active 🤠
          </span>
        )}
      </h3>
    </div>
  );
}
