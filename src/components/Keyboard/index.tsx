import { Line } from "./Line";
import styles from "./styles.module.scss";

const keyboardLetters = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export function Keyboard() {
  return (
    <div className={styles.keyboard}>
      {keyboardLetters.map((lineLetters) => {
        return <Line key={lineLetters.length} letters={lineLetters} />;
      })}
    </div>
  );
}
