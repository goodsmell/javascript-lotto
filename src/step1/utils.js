import { LOTTO, RANK, RANK_PRIZE } from "./constant/index.js";

export const pickLottoNumbers = () => {
  const lottoNumbers = new Set();

  do {
    const randomNumber =
      Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) + LOTTO.MIN_NUMBER;
    lottoNumbers.add(Math.floor(randomNumber));
  } while (lottoNumbers.size < LOTTO.COUNT);

  return [...lottoNumbers.keys()];
};

export const MockPickLottoNumbers = (returnValues) => {
  return returnValues.shift();
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

  return counts;
};

export const getPrize = (countsObject) => {
  return Object.entries(countsObject).reduce(
    (acc, [rank, count]) => acc + RANK_PRIZE[rank] * count,
    0,
  );
};

export const getReturnOnInvestment = (amount, countsObject) => {
  return (getPrize(countsObject) / amount) * 100;
};

export const printResult = (countsObject, getReturnOnInvestment) => {
  console.log("");
  console.log("당첨 통계");
  console.log("--------------------");
  console.log(`3개 일치 (5,000원) - ${countsObject[RANK.FIFTH]}개`);
  console.log(`4개 일치 (50,000원) - ${countsObject[RANK.FOURTH]}개`);
  console.log(`5개 일치 (1,500,000원) - ${countsObject[RANK.THIRD]}개`);
  console.log(
    `5개 일치, 보너스 볼 일치 (30,000,000원) - ${countsObject[RANK.SECOND]}개`,
  );
  console.log(`6개 일치 (2,000,000,000원) - ${countsObject[RANK.FIRST]}개`);
  console.log(`총 수익률은 ${getReturnOnInvestment.toFixed(1)}%입니다.`);
};
