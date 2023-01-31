import { useGame } from "../../../contexts/game";
import { Letter } from "./Letter";
import styles from "./styles.module.scss";

interface LineProps {
  tried: boolean;
  lineIndex: number;
  letters: string[];
}

export function Line({ tried, letters, lineIndex }: LineProps) {
  const { guess, currentChance } = useGame();

  return (
    <div className={styles.line}>
      {letters.map((letter, index) => {
        if (lineIndex === currentChance) {
          return (
            <Letter
              key={Math.random()}
              letterIndex={index}
              letter={guess[index]}
            />
          );
        }

        return (
          <Letter
            hasAnimation={lineIndex === currentChance - 1 && guess.length === 0}
            key={Math.random()}
            lineLetters={letters}
            letterIndex={index}
            letter={tried ? letter : undefined}
          />
        );
      })}
    </div>
  );
}
