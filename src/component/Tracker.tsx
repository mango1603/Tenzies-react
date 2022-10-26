import React from "react";

export default function Tracker(props: any) {
  const [second, setSecond] = React.useState(0);
  const [minute, setMinute] = React.useState(0);

  let timer: number;

  React.useEffect(() => {
    if (!props.tenzies) {
      timer = setInterval(() => {
        if (second < 59) {
          setSecond((prevSecond) => prevSecond + 1);
        } else {
          setSecond(0);
          setMinute((prevMinute) => prevMinute + 1);
        }
        props.updateFinishTime(minute * 60 + second);
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  React.useEffect(() => {
    if (!props.tenzies) {
      reset();
    }
  }, [props.tenzies]);

  function reset() {
    setSecond(0);
    setMinute(0);
  }

  function formatDigit(num: number): string {
    return num.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }

  return (
    <div className='time-counter'>
      {formatDigit(minute)}:{formatDigit(second)}
    </div>
  );
}
