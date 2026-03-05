import { RANK } from "../src/step1/constant/index.js";
import { getReturnOnInvestment } from "../src/step1/utils.js";

describe("수익률 계산 테스트", () => {
  test("수익률을 정상적으로 계산하고있는가?", () => {
    expect(
      getReturnOnInvestment(5000, {
        [RANK.FIRST]: 2,
        [RANK.SECOND]: 1,
        [RANK.THIRD]: 1,
        [RANK.FOURTH]: 0,
        [RANK.FIFTH]: 1,
      }),
    ).toBe(80630100);
  });
});
