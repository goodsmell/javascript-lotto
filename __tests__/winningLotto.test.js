import WinningLotto from "../src/step1/model/WinningLotto.js";
import { LOTTO_ERROR_MESSAGE } from "../src/step1/constant/message.js";

describe("보너스 번호 테스트", () => {
  test("당첨 번호 6개와 중복되는 경우 에러를 발생시키는 가?", () => {
    expect(() => {
      new WinningLotto([1, 2, 3, 4, 5, 6], 6);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
  });

  test("1에서 45 사이의 숫자로 구성되어 있는가?", () => {
    expect(() => {
      new WinningLotto([1, 2, 3, 4, 5, 46]);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
  });
});
