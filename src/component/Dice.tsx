import "./Dice.css";
export default function Dice(props: any) {
  const dots = [];

  for (let i = 0; i < props.value; i++) {
    dots.push(<span className='dot'> </span>);
  }

  function convertDiceValue(num: number): string {
    return `face-num-${props.value}`;
  }

  return (
    <div
      onClick={props.holdDice}
      className={
        props.isHeld
          ? `dice ${convertDiceValue(props.value)} hold `
          : `dice ${convertDiceValue(props.value)}`
      }
    >
      {dots}
    </div>
  );
}
