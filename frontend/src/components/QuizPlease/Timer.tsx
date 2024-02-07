import { useCallback, useEffect, useMemo, useState } from "react";

const oneSecond = 1000;
const oneMinute = oneSecond * 60;

interface IProps {
  duration?: number;
}

function Timer({ ...props }: IProps) {
  const [timerActive, setTimerActive] = useState(true);
  let answer = false;

  const startDate = new Date();

  const requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  useEffect(() => {
    tick();
    return () => {
      setTimerActive(false);
    };
  }, []);

  function tick() {
    const face = document.getElementById("lazy");
    const now = new Date(),
      elapsed = now.getTime() - startDate.getTime(),
      parts = [];

    parts[0] = "" + Math.floor((elapsed % oneMinute) / oneSecond);
    parts[1] = "" + Math.floor((elapsed % oneMinute) % oneSecond);

    parts[0] = parts[0].length == 1 ? "0" + parts[0] : parts[0];
    parts[1] =
      parts[1].length == 1
        ? "0" + parts[1]
        : parts[1].toString().substring(0, 2);

    if (face?.innerText) face.innerText = parts.join(":");

    if (timerActive) {
      if (elapsed > oneMinute) {
        window.alert("Время вышло!");
        const timer = document.getElementById("timer");
        timer?.classList.remove("timer");
        //   const eventStop = new Event("stop");
        //   //   setTimeIsUp(() => {});
        //   timer?.addEventListener("stop", (e) => {
        //   });
        //   timer?.remove();
        //   timer?.dispatchEvent(eventStop);
      } else if (answer) {
      } else {
        requestAnimationFrame(tick);
      }
    }
  }

  return (
    <>
    <div className="timer-overlay"></div>
      <div className="timer-group">
        <div className="timer minute" id="timer">
          <div className="hand">
            <span></span>
          </div>
          <div className="hand">
            <span></span>
          </div>
        </div>
        <div className="face">
          <p id="lazy">00:00</p>
        </div>
      </div>
    </>
  );
}

export default Timer;

// export const Timer = ({ deadline = new Date().toString() }) => {
//     const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
//     const [time, setTime] = useState(parsedDeadline - Date.now());

//     useEffect(() => {
//         const interval = setInterval(
//             () => setTime(parsedDeadline - Date.now()),
//             1000,
//         );

//         return () => clearInterval(interval);
//     }, [parsedDeadline]);

//     return (
//         <div className="timer">
//             {Object.entries({
//                 Minutes: (time / MINUTE) % 60,
//                 Seconds: (time / SECOND) % 60,
//             }).map(([label, value]) => (
//                 <div key={label} className="col-4">
//                     <div className="box">
//                         <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
//                         <span className="text">{label}</span>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };
