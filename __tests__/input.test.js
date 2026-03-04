import App from "../src/step1/app.js";
import MockInput from "../src/step1/view/MockInput.js";
import { MONEY_ERROR_MESSAGE } from "../src/step1/constant/message.js";

describe("구매 금액 입력 테스트", () => {
  test("입력 금액이 숫자가 아니면 예외가 발생한다.", async () => {
    const app = new App({ input: new MockInput(["1000a"]) });
    await expect(app.run()).rejects.toThrow(
      MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER,
    );
  });
  test("입력 금액이 양의 정수가 아니면 예외가 발생한다", async () => {
    const app = new App({ input: new MockInput(["3.14"]) });
    await expect(app.run()).rejects.toThrow(
      MONEY_ERROR_MESSAGE.INPUT_NOT_INTEGER,
    );
  });
  test("입력 금액이 1000원 단위가 아니면 예외가 발생한다", async () => {
    const app = new App({ input: new MockInput(["500"]) });
    await expect(app.run()).rejects.toThrow(
      MONEY_ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT,
    );
  });
});
