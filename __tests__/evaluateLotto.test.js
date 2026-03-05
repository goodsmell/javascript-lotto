import Lotto from "../src/step1/model/Lotto.js";
import WinningLotto from "../src/step1/model/WinningLotto.js";
import { evaluateLotto } from "../src/step1/utils.js";

describe("당첨 결과 계산", () => {
  test.each([
    ["6개", [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 7, 1],
    ["5개와 보너스 번호", [1, 2, 3, 4, 5, 8], [1, 2, 3, 4, 5, 7], 8, 2],
    ["5개", [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 7], 8, 3],
    ["4개", [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 7, 8], 9, 4],
    ["3개", [1, 2, 3, 4, 5, 6], [1, 2, 3, 7, 8, 9], 10, 5],
  ])(
    "%s가 일치되는 경우 ",
    (_, lottoNumbers, winningLottoNumbers, bonusNumber, rank) => {
      const result = evaluateLotto(
        new Lotto(lottoNumbers),
        new WinningLotto(winningLottoNumbers, bonusNumber),
      );
      expect(result).toBe(rank);
    },
  );
});
