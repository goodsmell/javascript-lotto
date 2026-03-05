import { LOTTO } from "./constant/index.js";

export const pickLottoNumbers = () => {
  const lottoNumbers = new Set();

  do {
    const randomNumber =
      Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) + LOTTO.MIN_NUMBER;
    lottoNumbers.add(Math.floor(randomNumber));
  } while (lottoNumbers.size < LOTTO.COUNT);

  return [...lottoNumbers.keys()];
};

export const parseNumbers = (raw) => {
  const numbers = raw.split(",").map(Number);
  return numbers;
};

export const evaluateLotto = (lotto, winningLotto) => {
  const numbersSet = new Set([
    ...lotto.getNumbers(),
    ...winningLotto.getNumbers(),
  ]);

  const matchCount = lotto.getNumbers().length * 2 - numbersSet.size;
  const hasBonus = lotto.getNumbers().includes(winningLotto.getBonus());

  if (matchCount === 6) return 1;
  if (matchCount === 5 && hasBonus) return 2;
  if (matchCount === 5 && !hasBonus) return 3;
  if (matchCount === 4) return 4;
  if (matchCount === 3) return 5;
};
