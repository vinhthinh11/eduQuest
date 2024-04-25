import { useEffect, useState } from 'react';

function Timer() {
  const [time, setTime] = useState(50 * 60);

  useEffect(
    function () {
      const id = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
      return () => clearInterval(id);
    },
    [time]
  );
  return (
    <div className="sticky bg-slate-500 px-3 py-2 text-slate-100 w-fit rounded-md mt-2 mr-3 right-0 opacity-80">
      {Math.floor(time / 60)
        .toString()
        .padStart(2, '0')}
      :{(time % 60).toString().padStart(2, '0')}
    </div>
  );
}

export default Timer;
