import { useGame } from "../../../../contexts/game";
import styles from "./styles.module.scss";

interface LetterProps {
  hasAnimation?: boolean;
  lineLetters?: string[];
  letter?: string;
  letterIndex: number;
}

export function Letter({
  lineLetters,
  letter,
  letterIndex,
  hasAnimation,
}: LetterProps) {
  if (!letter) return <span className={styles.lightGray}></span>;
  if (!lineLetters) return <span className={styles.lightGray}>{letter}</span>;

  const { word } = useGame();

  let classNameStyles = styles.lightGray;

  if (letter === word[letterIndex]) {
    classNameStyles = styles.green;
  } else if (word.includes(letter)) {
    const howManyLettersAreThereInWord = word
      .split("")
      .reduce((total, wordLetter) => {
        if (wordLetter === letter) return total + 1;

        return total;
      }, 0);

    const howManyLettersRightInGuess = lineLetters.reduce(
      (total, guessLetter, guessLetterIndex) => {
        if (guessLetter === word[guessLetterIndex] && guessLetter === letter)
          return total + 1;

        return total;
      },
      0
    );

    if (howManyLettersAreThereInWord === howManyLettersRightInGuess) {
      classNameStyles = styles.darkGray;
    } else {
      const correctLetterIndexes = word
        .split("")
        .map((wordLetter, wordLetterIndex) =>
          lineLetters[wordLetterIndex] === letter && wordLetter === letter
            ? wordLetterIndex
            : null
        )
        .filter((worldLetterIndex) => worldLetterIndex !== null);

      const indexesOfThatLetter = lineLetters
        .map((lineLetter, lineLetterIndex) =>
          lineLetter === letter &&
          !correctLetterIndexes.includes(lineLetterIndex)
            ? lineLetterIndex
            : null
        )
        .filter((index) => index !== null);

      const freeSpacesQuantity =
        howManyLettersAreThereInWord - howManyLettersRightInGuess;

      const freeSpacesIndexes = indexesOfThatLetter.filter(
        (_, index) => index < freeSpacesQuantity
      );

      if (freeSpacesIndexes.includes(letterIndex)) {
        classNameStyles = styles.yellow;
      } else {
        classNameStyles = styles.darkGray;
      }
    }
  } else {
    classNameStyles = styles.darkGray;
  }

  return (
    <span
      className={
        hasAnimation ? `${classNameStyles} ${styles.flip}` : classNameStyles
      }
    >
      {letter}
    </span>
  );
}
