import { getCountsRank } from "../src/step1/utils.js";

describe("로또 등수 계산 집계", () => {
  test("로또 등수 계산 집계가 정상적으로 되는가?", () => {
    expect(
      getCountsRank(["RANK_1", "RANK_2", "RANK_1", "RANK_3", "RANK_5"]),
    ).toEqual({
      RANK_1: 2,
      RANK_2: 1,
      RANK_3: 1,
      RANK_4: 0,
      RANK_5: 1,
    });
  });
});
