import App, { MockInput } from "./../src/step1-index.js";

describe("구매 금액 입력 테스트", () => {
  test("입력 금액이 숫자가 아니면 예외가 발생한다.", async () => {
    const app = new App({ input: new MockInput("1000a") });
    await expect(app.run()).rejects.toThrow("[ERROR] 숫자를 입력해주세요.");
  });
});
