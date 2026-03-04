import Lotto from "../src/step1/model/Lotto.js";
import { LOTTO_ERROR_MESSAGE } from "../src/step1/constant/message.js";

describe("로또 테스트", () => {
  test.each([
    [[1, 2, 3, 4, 5], "5개"],
    [[1, 2, 3, 4, 5, 45, 6], "7개"],
    [[], "0개"],
  ])("숫자가 6개 인가? (%s)", (numbers) => {
    expect(() => {
      new Lotto(numbers);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_NOT_SIX_NUMBERS);
  });

  test("중복되는 숫자가 없는가?", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
  });
});
