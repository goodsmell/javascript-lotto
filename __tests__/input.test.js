import App from "../src/step1/app.js";
import MockInput from "../src/step1/view/MockInput.js";

describe("구매 금액 입력 테스트", () => {
  test("입력 금액이 숫자가 아니면 예외가 발생한다.", async () => {
    const app = new App({ input: new MockInput("1000a") });
    await expect(app.run()).rejects.toThrow("[ERROR] 숫자를 입력해주세요.");
  });
  test("입력 금액이 1000원 단위가 아니면 예외가 발생한다", async () => {
    const app = new App({ input: new MockInput("500") });
    await expect(app.run()).rejects.toThrow(
      "[ERROR] 구입 금액은 1000원 단위로 입력해주세요.",
    );
  });
  test("입력 금액이 양의 정수가 아니면 예외가 발생한다", async () => {
    const app = new App({ input: new MockInput("3.14") });
    await expect(app.run()).rejects.toThrow(
      "[ERROR] 구입 금액은 양의 정수로 입력해주세요.",
    );
  });
});
