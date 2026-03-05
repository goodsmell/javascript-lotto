import App from "../src/step1/app.js";
import MockInput from "../src/step1/view/MockInput.js";
import Lotto from "../src/step1/model/Lotto.js";
import {
  LOTTO_ERROR_MESSAGE,
  ERROR_MESSAGE,
} from "../src/step1/constant/message.js";

describe("App 테스트 ", () => {
  test("정상적으로 App이 종료되는가?", async () => {
    const app = new App({
      input: new MockInput(["1000", "1,2,3,4,5,6", "7", "n"]),
    });
    await expect(app.run()).resolves.toBeUndefined();
  });

  test("y 또는 n이 입력되지 않은 경우 에러 메시지가 출력되는가?", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const app = new App({
      input: new MockInput(["1000", "1,2,3,4,5,6", "7", "s", "n"]),
    });
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(ERROR_MESSAGE.NOT_INPUT_RETRY);
    logSpy.mockRestore();
  });
});
