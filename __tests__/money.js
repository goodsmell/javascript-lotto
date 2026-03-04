import Money from "../src/step1/model/Money.js";
import MockInput from "../src/step1/view/MockInput.js";
import { MONEY_ERROR_MESSAGE } from "../src/step1/constant/message.js";

describe("구매 금액 입력 테스트", () => {
  test("입력 금액이 숫자가 아니면 예외가 발생한다.", async () => {
    await expect(() => new Money(NaN)).toThrow(
      MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER,
    );
  });
  test("입력 금액이 양의 정수가 아니면 예외가 발생한다", async () => {
    await expect(() => new Money(3.14)).toThrow(
      MONEY_ERROR_MESSAGE.INPUT_NOT_INTEGER,
    );
  });
  test("입력 금액이 1000원 단위가 아니면 예외가 발생한다", async () => {
    await expect(() => new Money(500)).toThrow(
      MONEY_ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT,
    );
  });
  test.each([
    [5000, 5, "5000"],
    [10000, 10, "1000"],
  ])(
    "구입 금액에 따른 로또 장 수가 올바르게 계산되었는가? (%s)",
    (amount, count) => {
      expect(new Money(amount).getLottoCount()).toBe(count);
    },
  );
});
