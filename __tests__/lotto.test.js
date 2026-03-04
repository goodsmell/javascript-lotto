import Lotto from "../src/step1/app.js";
import { LOTTO_ERROR_MESSAGE } from "../src/step1/constant/message.js";

describe("로또 테스트", () => {
  const lotto = new Lotto();

  test.each([
    [[1, 2, 3, 4, 5], "5개"],
    [[1, 2, 3, 4, 5, 45, 6], "7개"],
    [[], "0개"],
  ])("숫자가 6개 인가? (%s)", (numbers) => {
    expect(() => new Lotto(numbers)).toThrow(
      LOTTO_ERROR_MESSAGE.INPUT_NOT_SIX_NUMBERS,
    );
  });
});
