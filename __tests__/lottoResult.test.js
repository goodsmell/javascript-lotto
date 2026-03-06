import { RANK } from "../src/step1/constant/index.js";
import LottoResult from "../src/step1/model/LottoResult.js";

describe("수익률 계산 테스트", () => {
  test("수익률을 정상적으로 계산하고있는가?", () => {
    const result = new LottoResult({
      [RANK.FIRST]: 2,
      [RANK.SECOND]: 1,
      [RANK.THIRD]: 1,
      [RANK.FOURTH]: 0,
      [RANK.FIFTH]: 1,
    });
    expect(result.getReturnOnInvestment(5000)).toBe(80630100);
  });
});
