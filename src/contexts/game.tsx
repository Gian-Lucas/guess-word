import { createContext, ReactNode, useContext, useState } from "react";
import { words } from "../words";

interface Attempt {
  tried: boolean;
  letters: string[];
}

interface GameContextData {
  winner: boolean;
  guess: string;
  word: string;
  currentChance: number;
  playerChances: number;
  attempts: Attempt[];
  updateGuess: (newGuess: string) => void;
  updateWord: (newWord: string) => void;
  handleGuessWord: () => void;
  reset: () => void;
}

const GameContext = createContext({} as GameContextData);

interface GameContextProviderProps {
  children: ReactNode;
}

export function GameContextProvider({ children }: GameContextProviderProps) {
  const playerChances = 6;

  const [currentChance, setCurrentChance] = useState(0);
  const [winner, setWinner] = useState(false);
  const [guess, setGuess] = useState("");

  const [word, setWord] = useState(() => {
    const newWord = getNewWord();

    return newWord;
  });

  const [attempts, setAttempts] = useState<Attempt[]>(() => {
    const initializedAttempts = initializeAttempts();

    return initializedAttempts;
  });

  function updateGuess(newGuess: string) {
    if (currentChance === playerChances || winner) return;

    setGuess(newGuess.toLowerCase());
  }

  function updateWord(newWord: string) {
    setWord(newWord.toLowerCase());
  }

  function addAttempt(attempt: Attempt) {
    setAttempts((state) => {
      let attemptsUpdated = state;

      attemptsUpdated[currentChance].tried = attempt.tried;
      attemptsUpdated[currentChance].letters = attempt.letters;

      return attemptsUpdated;
    });
  }

  function handleGuessWord() {
    if (guess.length !== word.length || currentChance === playerChances) return;

    addAttempt({
      tried: true,
      letters: guess.split(""),
    });

    setCurrentChance((state) => {
      return (state += 1);
    });

    if (guess === word) {
      setWinner(true);
    }

    setGuess("");
  }

  function initializeAttempts() {
    const attempts = Array(playerChances)
      .fill(0)
      .map(() => {
        return {
          tried: false,
          letters: Array(word.length).fill(""),
        };
      });

    return attempts;
  }

  function getNewWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function reset() {
    setCurrentChance(0);
    setWinner(false);
    setGuess("");

    const newWord = getNewWord();
    setWord(newWord);

    const initializedAttempts = initializeAttempts();
    setAttempts(initializedAttempts);
  }

  return (
    <GameContext.Provider
      value={{
        winner,
        playerChances,
        currentChance,
        guess,
        updateGuess,
        word,
        updateWord,
        attempts,
        handleGuessWord,
        reset,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextData {
  const context = useContext(GameContext);

  return context;
}
