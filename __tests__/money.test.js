import Money from "../src/step1/model/Money.js";
import { MONEY_ERROR_MESSAGE } from "../src/step1/constant/message.js";

describe("구매 금액 입력 테스트", () => {
  test("입력 금액이 숫자가 아니면 예외가 발생한다.", async () => {
    await expect(() => new Money(NaN)).toThrow(
      MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER,
    );
  });
  test("입력 금액이 정수가 아니면 예외가 발생한다", async () => {
    await expect(() => new Money(3.14)).toThrow(
      MONEY_ERROR_MESSAGE.INPUT_NOT_INTEGER,
    );
  });
  test("입력 금액이 양수가 아니면 예외가 발생한다", async () => {
    await expect(() => new Money(-1000)).toThrow(
      MONEY_ERROR_MESSAGE.INPUT_NEGATIVE,
    );
  });
  test("입력 금액이 1000원 단위가 아니면 예외가 발생한다", async () => {
    await expect(() => new Money(500)).toThrow(
      MONEY_ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT,
    );
  });
});
