import { RANK } from "../constant/index.js";

class Output {
  printResult = (countsObject, returnOnInvestment) => {
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
    console.log(`총 수익률은 ${returnOnInvestment.toFixed(1)}%입니다.`);
  };
}

export default Output;
