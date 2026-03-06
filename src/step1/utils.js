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

// 계산 클래스  ---
// export const getCountsRank = (ranks) => {
//   const counts = Object.values(RANK).reduce((acc, rank) => {
//     acc[rank] = 0;
//     return acc;
//   }, {});

//   ranks.forEach((rank) => {
//     if (rank) counts[rank]++;
//   });

//   return counts;
// };

// export const getPrize = (countsObject) => {
//   return Object.entries(countsObject).reduce(
//     (acc, [rank, count]) => acc + RANK_PRIZE[rank] * count,
//     0,
//   );
// };

export const getReturnOnInvestment = (amount, countsObject) => {
  return (getPrize(countsObject) / amount) * 100;
};

// 아웃풋 ---
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
