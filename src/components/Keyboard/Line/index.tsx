import { DelButton } from "./DelButton";
import { Letter } from "./Letter";
import { OkButton } from "./OkButton";
import styles from "./styles.module.scss";

interface LineProps {
  letters: string[];
}

export function Line({ letters }: LineProps) {
  return (
    <div className={styles.line}>
      {letters.map((letter) => {
        return <Letter key={letter} letter={letter} />;
      })}

      {letters[0] == "Z" && <OkButton />}
      {letters[0] == "A" && <DelButton />}
    </div>
  );
}
