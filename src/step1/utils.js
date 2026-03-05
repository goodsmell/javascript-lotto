import { LOTTO, RANK } from "./constant/index.js";

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

  if (matchCount === 6) return RANK.FIRST;
  if (matchCount === 5 && hasBonus) return RANK.SECOND;
  if (matchCount === 5 && !hasBonus) return RANK.THIRD;
  if (matchCount === 4) return RANK.FOURTH;
  if (matchCount === 3) return RANK.FIFTH;
};

export const getCountsRank = (ranks) => {
  const counts = Object.values(RANK).reduce((acc, rank) => {
    acc[rank] = 0;
    return acc;
  }, {});

  ranks.forEach((rank) => {
    if (rank) counts[rank]++;
  });

  console.log(counts);

  return counts;
};
